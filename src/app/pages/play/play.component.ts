
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent {
  formRequest: FormGroup
  constructor(private router: Router, private fb: FormBuilder) {
    this.formRequest = this.fb.group({
      amount: 10,
      category: '',
      difficulty: '',
      type: ''
    });
  }



  params: object = {}

  navigateWithParams() {
    this.router.navigate(['/'],{
      queryParams: this.formRequest.value
    })
  }

}
