import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ConvertPipe } from "./convert.pipe";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, RouterOutlet, ConvertPipe]
})
export class AppComponent {
  title = 'pipes';
  name: string | undefined;
  date: string | undefined;
  amount: string | undefined;
  miles:number | undefined;
  kilometers:number | undefined;
  
  onNameChange(event: Event){
    this.name = ((<HTMLInputElement>event.target).value);
  }

  onDateChange(event: Event){
    this.date = ((<HTMLInputElement>event.target).value);
  }

  onAmountChange(event: Event){
    this.amount = ((<HTMLInputElement>event.target).value);
  }

  onMilesChange(event: Event){
    this.miles = parseInt((<HTMLInputElement>event.target).value);
  }
}
