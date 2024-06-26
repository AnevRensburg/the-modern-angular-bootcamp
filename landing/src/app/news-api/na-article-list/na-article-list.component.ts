import { Component } from '@angular/core';
import { NewsApiService, Article } from '../news-api.service';

@Component({
  selector: 'app-na-article-list',
  templateUrl: './na-article-list.component.html',
  styleUrl: './na-article-list.component.css'
})
export class NaArticleListComponent {
  articles!: Article[]

  constructor(private newsApiService: NewsApiService){
    this.newsApiService.pagesOutput.subscribe(articles => {
      this.articles = articles;
    })

    this.newsApiService.getPage(1);
  }
}
