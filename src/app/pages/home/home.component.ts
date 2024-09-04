import { Component, OnInit } from '@angular/core';
import { QuizzesServiceService } from '../../service/quizzes.service';
import { HttpClientModule } from '@angular/common/http';
import { quizzBackend } from '../../models/quizz.module';
import { NgFor } from '@angular/common';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [QuizzesServiceService]
})
export class HomeComponent implements OnInit {
constructor(private QuizzesService:QuizzesServiceService){}

quizzes:quizzBackend = {
  responce_code:202,
  results:[]
}
shuffledAnswers: string[][] = []
selectedItems:string[] = []

correctAnswers:number = 0
currentQuestion:number = 0


  ngOnInit(): void {
    this.QuizzesService.getQuizzes().subscribe({
      next:data=>{
        this.quizzes = data
        this.handleArrays()
        this.selectedItems = this.shuffledAnswers[0]
      }
    })
    
  }

 

  handleArrays() {
   
    let combined:string[][] = []
     this.quizzes.results.forEach(el => {
        const question = [...el.incorrect_answers, el.correct_answer, ]
        
        combined.push(question)
    });

    combined.forEach(el=>this.shuffleArray(el))
   
    console.log('Перемішаний масив:', combined);
    this.shuffledAnswers = combined
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }



  showdata(){
    console.log(this.quizzes);
    
  }

}
