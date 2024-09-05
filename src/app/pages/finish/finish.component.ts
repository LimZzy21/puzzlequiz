import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { DecimalPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-finish',
  
  standalone: true,
  imports: [DecimalPipe, NgFor ],
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.css'
})



export class FinishComponent implements OnInit, OnDestroy{


  statistic: stat[] = []

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
    let stat:any = localStorage.getItem('statistic')
    if(stat){
      stat = JSON.parse(stat)
      this.statistic = stat
    }
  }
  
  }
  ngOnDestroy(): void {
    
  }



}



interface stat {
  timeSpend: number,
  correctAnswers: number,
  amount: number
}

interface statList {
  
}