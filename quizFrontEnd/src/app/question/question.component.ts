import { Component, inject, OnInit, signal } from '@angular/core';
import { AnswerComponent } from '../answer/answer.component';
import { QuizService } from '../quiz.service';
import { IAnswer, IQuestion } from '../iquestion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question',
  imports: [AnswerComponent, CommonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
})
export class QuestionComponent {
  quizService = inject(QuizService);
  readonly answer = signal<IAnswer[]>([]);
}
