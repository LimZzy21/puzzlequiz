
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
      number: 10,
      category: 'Any Category',
      difficulty: 'Any Difficulty',
      type: 'Any Type'
    });
  }



  params: object = {}

  navigateWithParams() {
    this.router.navigate(['/'],{
      queryParams: this.formRequest.value
    })
    console.log(this.formRequest.value);

  }

}
