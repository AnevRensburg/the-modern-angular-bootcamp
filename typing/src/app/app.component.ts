import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { faker } from '@faker-js/faker';
import { lorem } from 'faker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'typing';
  randomText = lorem.sentence()
  enteredText = '';

  onInput(event: Event){    
    this.enteredText = ((<HTMLInputElement>event.target).value);
  }

  compare(randomLetter:string, enteredLetter:string){
    if(!enteredLetter){
      return 'pending';
    } 
    return enteredLetter === randomLetter ? 'correct' : 'incorrect';
  }
}


