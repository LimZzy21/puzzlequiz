import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizzesServiceService } from '../../service/quizzes.service';
import { HttpClientModule } from '@angular/common/http';
import { quizzBackend } from '../../models/quizz.module';
import {  NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [QuizzesServiceService]
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private QuizzesService: QuizzesServiceService, private route: ActivatedRoute, private router:Router) { }

  quizzes: quizzBackend = {
    responce_code: 202,
    results: []
  }

  timeElapsed: number = 0;
  private intervalId:any ;
  private startTime: number = 0;

  startStopwatch(): void {
    this.startTime = Date.now();
    this.intervalId = setInterval(() => {
      this.timeElapsed = Date.now() - this.startTime;      
    }, 1000); 
  }

  stopStopwatch(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); 
    }
  }

  ngOnDestroy(): void {
    this.finishQuizz()
    this.stopStopwatch(); 
  }

  loading:boolean = false

  isQuizz:boolean = false

  shuffledAnswers: string[][] = []
  selectedItems: string[] = []

  correctAnswers: number = 0
  currentQuestion: number = 0

  statisticArray:object[] = []

  amount: number = 10
  category: string  = ''
  difficulty: string  = ''
  type: string  = ''


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.amount = params['amount'];
      this.category = params['category'];
      this.difficulty = params['difficulty'];
      this.type = params['type'];
    })
    this.getLocalStats()
      this.fetchNewQuestions()

  }

  getLocalStats(){
    if (typeof window !== 'undefined') { 
      let stat:any = localStorage.getItem('statistic')
      if(stat){
        stat = JSON.parse(stat)
        this.statisticArray = stat
      }
      
    }
  }


  fetchQuestions(): void {
    this.QuizzesService.getQuizzes().subscribe({
      next: data => {
        this.quizzes = data
        
       this.isData()
      }
    });
  }

  fetchCustomQuestions():void{
    this.QuizzesService.getCustomQuizzes(this.amount, this.category, this.difficulty, this.type).subscribe({
      next:data=>{
        this.quizzes = data

        this.isData()
      }
    })
  }


  isData(){
    if (this.quizzes.results.length > 0) {
      this.handleArrays();
      this.selectedItems = this.shuffledAnswers[0] || [];
      this.loading = false
    }
  }

  toggleQuizz(){

    if(this.isQuizz){
      this.isQuizz = !this.isQuizz 

      this.currentQuestion = 200
    }else{
      this.isQuizz = !this.isQuizz 
      this.currentQuestion = 0
      this.startStopwatch();
    }

    if(this.currentQuestion == 200 && this.quizzes.results.length >0){
      this.quizzes.results = []
      this.loading = true
      this.fetchNewQuestions()
    }
  }

  finishQuizz(): void {
    if (typeof window !== 'undefined') { 
     const statArray = {
        timeSpend: this.timeElapsed,
        correctAnswers: this.correctAnswers,
        amount: this.amount ? this.amount : 10
      };

      this.statisticArray.unshift(statArray)
      
      const stringyfiedArray = JSON.stringify(this.statisticArray);
      localStorage.setItem('statistic', stringyfiedArray);
    }
  }

  handleArrays() {

    let combined: string[][] = []
    this.quizzes.results.forEach(el => {
      const question = [...el.incorrect_answers, el.correct_answer]

      combined.push(question)
    });

    combined.forEach(el => this.shuffleArray(el))


    this.shuffledAnswers = combined
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  answerQuizz(ans: string) {
    if (ans == this.quizzes.results[this.currentQuestion].correct_answer) {
      this.correctAnswers++
    }
    this.currentQuestion++
    this.selectedItems = this.shuffledAnswers[this.currentQuestion]

    if (this.currentQuestion == 10) {
      this.currentQuestion = 200
        this.router.navigate(['finish'])
    }
    
  }

  fetchNewQuestions() {
 
    if (this.category || this.difficulty || this.type) {
      this.fetchCustomQuestions()
      this.resetPlaySettings()
      this.isQuizz == true

    } else {
      this.fetchQuestions()
      this.resetPlaySettings()
    }

  }

  resetPlaySettings(){
    this.handleArrays()
        this.selectedItems = this.shuffledAnswers[0]
        this.currentQuestion = 0
        this.correctAnswers = 0
  }

}
