import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

interface UnsplashResponse{
  urls: {
    regular: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  constructor(private http: HttpClient) {}
  getPhoto(){
    return this.http.get<UnsplashResponse>('https://api.unsplash.com/photos/random', {
      headers: {
        Authorization: 'Client-ID U1-PpvmXaWvdHjU8doT3YSTnWu-2tkhSdJ8QJCLSm-s'
      }
    })
    .pipe(
      map(x => x.urls.regular)
    )
  }
}