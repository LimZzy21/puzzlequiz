import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { quizzBackend } from '../models/quizz.module';

@Injectable({
  providedIn: 'root'
})
export class QuizzesServiceService {

  constructor(private http:HttpClient) { }
  url: string = `https://opentdb.com/api.php?amount=10`

  getQuizzes():Observable<quizzBackend>{
    return this.http.get(this.url) as Observable<quizzBackend>
  }
}
