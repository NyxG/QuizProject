import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
import { IQuestion } from '../iquestion';
import { HttpClient } from '@angular/common/http';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  imports: [QuestionComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnInit {
  quizService = inject(QuizService);
  constructor() {}
  //questions = signal<IQuestion[]>([]);
  ngOnInit(): void {
    this.showQuestions();
  }
  showQuestions() {
    this.quizService.showQuestions();
  }
}
