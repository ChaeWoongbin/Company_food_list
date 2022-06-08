import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http'
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public Service_URL = 'http://localhost:3213'
  

  constructor(private http:HttpClient) { }

  // 추가
  //get
  get<T>(endPoint: string): Observable<T> {
    return this.http.get<T>(`${this.Service_URL}${endPoint}`).pipe(
      catchError(this.handleError))
  }

  //post
  post<T>(endPoint: string, body: any): Observable<T> {
    const config = {headers: new HttpHeaders()
    .append('Content-Type','application/json')
    .append('Access-Control-Allow-Headers','application/json')};

    return this.http.post<T>(`${this.Service_URL}${endPoint}`,body, config).pipe(
      catchError(this.handleError)
    ).pipe(
      retry(3), // HTTP 요청이 실패하면 3번 더 시도합니다.
      catchError(this.handleError) // 재시도한 후에도 발생한 에러를 처리합니다.
    );
  }



  
  // 에러 처리
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Error:', error.error)
    } else {
      console.error(`Backend error ${error.status}, ${error.error}`)
    }
    //alert('에러 발생');
    return throwError('예기치 못한 에러가 발생했습니다. 다시 시도해주세요.')
  }
}
