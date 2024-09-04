import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { quizzBackend } from '../models/quizz.module';

@Injectable({
  providedIn: 'root'
})
export class QuizzesServiceService {

  constructor(private http:HttpClient) { }
  baseUrl: string = `https://opentdb.com/api.php?`

  getCustomQuizzes(amount:number , category:string , difficulty:string , type:string ):Observable<quizzBackend>{
    const params = new HttpParams()
      .set('amount', amount.toString())
      .set('category', category)
      .set('difficulty', difficulty)
      .set('type', type)

    return this.http.get<quizzBackend>(this.baseUrl, {params})
  }

  getQuizzes():Observable<quizzBackend>{
    return this.http.get<quizzBackend>(`${this.baseUrl}amount=10`) 
  }
}
