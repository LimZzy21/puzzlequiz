import { Component, OnInit } from '@angular/core';
import { QuizzesServiceService } from '../../service/quizzes.service';
import { HttpClientModule } from '@angular/common/http';
import { quizzBackend } from '../../models/quizz.module';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [QuizzesServiceService]
})
export class HomeComponent implements OnInit {
  constructor(private QuizzesService: QuizzesServiceService, private route: ActivatedRoute) { }

  quizzes: quizzBackend = {
    responce_code: 202,
    results: []
  }
  shuffledAnswers: string[][] = []
  selectedItems: string[] = []

  correctAnswers: number = 0
  currentQuestion: number = 0

  isShowModal: boolean = false

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
    if(this.category || this.difficulty || this.type){
      this.fetchCustomQuestions()
      
    }else{
      this.fetchQuestions()
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
    }
  }

  handleArrays() {

    let combined: string[][] = []
    this.quizzes.results.forEach(el => {
      const question = [...el.incorrect_answers, el.correct_answer,]

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




  showdata() {
    console.log(this.quizzes);
  }


  answerQuizz(ans: string) {
    if (ans == this.quizzes.results[this.currentQuestion].correct_answer) {
      this.correctAnswers++
    }
    this.currentQuestion++
    this.selectedItems = this.shuffledAnswers[this.currentQuestion]

    if (this.currentQuestion == 10) {
      this.currentQuestion = 200
      this.isShowModal = true
    }
    
  }

  fetchNewQuestions() {
 
    if (this.category || this.difficulty || this.type) {
      this.fetchCustomQuestions()
      this.resetPlaySettings()

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
        this.isShowModal = false
  }

}
