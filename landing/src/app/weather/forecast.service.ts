import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { 
  Observable, map, mergeMap, 
  switchMap, of, filter, 
  toArray, share, tap,
  catchError, throwError
} from 'rxjs';
import { NotificationsService } from '../notifications/notifications.service';

interface OpenWeatherResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    }
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private url = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService
    ) { }

  getForecast(){
    return this.getCurrentLocation().pipe(
      map(coords => {
        return new HttpParams()
        .set('lat', String(coords.latitude))
        .set('lon', String(coords.longitude))
        .set('units', 'metric')
        .set('appid', '3f6b2961299b5719626f135e8a7e520c')
      }),
      switchMap(params => 
        this.http.get<OpenWeatherResponse>(this.url, { params: params })
      ),
      // Using map instead of 'pluck' operator
      map(x => x.list),
      mergeMap(value => of(...value)),
      filter((value, index) => index % 8 === 0),
      map(value => {
        return {
          dateString: value.dt_txt,
          temp: value.main.temp
        }
      }), 
      toArray(),
      share()
  ).pipe(
    tap(() => {
      this.notificationsService.addSuccess('Got weather forecast')
    }),
    catchError(err => {
      // #1 - Handle the error
      this.notificationsService.addError("Couldn't get weather forecast")

      // #2 - Return a new observable
      return throwError(() => new Error(err));
    })
  )}

  getCurrentLocation(){
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          observer.next(position.coords);
          observer.complete();
        },
        err => observer.error(err)
      );
    }).pipe(
      tap(() => {
        this.notificationsService.addSuccess('Got user location')
      }),
      catchError(err => {
        // #1 - Handle the error
        this.notificationsService.addError("Couldn't get user location")

        // #2 - Return a new observable
        return throwError(() => new Error(err));
      })
    )
  }
}
