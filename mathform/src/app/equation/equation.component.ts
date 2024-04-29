import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { delay, filter, scan } from 'rxjs';
import { CustomValidators } from '../custom-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrl: './equation.component.css'
})
export class EquationComponent {
  secondsPerSolution = 0;

  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl('')
    // The values of the form are put through the addition custom vali
  }, [CustomValidators.addition('a', 'b', 'answer')]);

  // When 'a' is referenced in the template, it will call this getter.
  get a() {
    return this.mathForm.value.a;
  }

  // When 'b' is referenced in the template, it will call this getter.
  get b() {
    return this.mathForm.value.b;
  }  

  ngOnInit() {
    const startTime = new Date();
    let numberSolved = 0;

    this.mathForm.statusChanges.pipe(
      filter(value => value === 'VALID'),
      delay(100), 
      scan((acc) => {
        return {
          numberSolved: acc.numberSolved + 1,
          startTime: acc.startTime
        }
      }, { numberSolved: 0, startTime: new Date()})



    ).subscribe(() => {
      numberSolved++;
      this.secondsPerSolution = (
        new Date().getTime() - startTime.getTime()
      ) / numberSolved / 1000;


      this.mathForm.setValue({
        a: this.randomNumber(),
        b: this.randomNumber(),
        answer: ''
      });
    });

  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
