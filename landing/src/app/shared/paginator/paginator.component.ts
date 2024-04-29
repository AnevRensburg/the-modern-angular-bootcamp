import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  @Input() numberOfPages!: number;
  pageOptions!: number[];

  currentPage = 1;

  constructor(){
    this.pageOptions = [
      this.currentPage - 2,
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
      this.currentPage + 2,
    ].filter(pageNumber => pageNumber >= 1 && pageNumber <= this.numberOfPages);
  }
}
