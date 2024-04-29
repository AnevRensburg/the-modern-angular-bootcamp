import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpUrlEncodingCodec } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pw';
    
  length = 0;
  includeLetters = false;
  includeNumbers = false;
  includeSymbols = false;
  password = '';


  onChangeLength=( event: Event)=>{    
    const parsedValue = parseInt((<HTMLInputElement>event.target).value);

    if(!isNaN(parsedValue)){
      this.length = parsedValue;
    }
  }
  
  onChangeUseLetters(){
    this.includeLetters = !this.includeLetters;
  }

  onChangeUseNumbers(){
    this.includeNumbers = !this.includeNumbers;
  }

  onChangeUseSymbols(){
    this.includeSymbols = !this.includeSymbols;
  }
  
  onButtonClick(){
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '1234567890';
    const symbols = '!@#$%^&*()';

    let validChars = '';  // All characters allowed in password

    if (this.includeLetters){  // If true, add letters to allowed characters
      validChars += letters;
    }
    if (this.includeNumbers){  // If true, add numbers to allowed characters
      validChars += numbers;
    }
    if (this.includeSymbols){  // If true, add symbols to allowed characters
      validChars += symbols;
    }

    let generatedPassword = '';

    for(let i = 0; i < this.length; i++){ // Run untill reaching submitted length
      const index = Math.floor(Math.random() * validChars.length);
      generatedPassword += validChars[index];
    }

    this.password = generatedPassword; // Runs when for loop reaches submitted length
  }
}
