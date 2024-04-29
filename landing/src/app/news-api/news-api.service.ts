import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap, map, switchMap } from 'rxjs';

export interface Article{
    title: string;
    url: string;
    // author: string;
    source: {
      name: string;
    }
}

interface NewsApiResponse{
  totalResults: number;
  articles: Article[];
}

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private url = 'https://newsapi.org/v2/top-headlines';
  private pageSize = 10;
  private apiKey = '57f3c26b98fb480999d6e39778601db1';
  private country = 'us';

  private pagesInput: Subject<number>;
  pagesOutput: Observable<Article[]>;
  numberOfPages: Subject<number>;

  constructor(private http: HttpClient) { 
    this.numberOfPages = new Subject();
    this.pagesInput = new Subject();
    this.pagesOutput = this.pagesInput.pipe(
      map((page) => {
        return new HttpParams()
        .set('apiKey', this.apiKey)
        .set('country', this.country)
        .set('pageSize', this.pageSize)
        .set('page', page)
      }), 
      switchMap(params => {
        return this.http.get<NewsApiResponse>(this.url, { params: params })
      }),
      tap((response) => {
        const totalPages = Math.ceil(response.totalResults / this.pageSize)
        this.numberOfPages.next(totalPages);
      }), 
      // Using map instead of 'pluck' operator
      map(x => x.articles)
    );
  }

  getPage(page: number){
    this.pagesInput.next(page);
  }
}
