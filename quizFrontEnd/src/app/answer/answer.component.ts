import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { QuizService } from '../quiz.service';
import { IAnswer } from '../iquestion';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-answer',
  imports: [CommonModule],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.css',
})
export class AnswerComponent {
  quizService = inject(QuizService);
  readonly answerText = input.required<IAnswer>();
  readonly answerIndex = input.required<number>();
  letterMapping = ['A', 'B', 'C', 'D'];
  isCorrect = signal<boolean>(false);
  selectedAnswered = signal<boolean>(false);
  readonly currentQuestionIndex = computed(() =>
    this.quizService.indexQuestion()
  );
  constructor() {
    effect(() => {
      this.quizService.indexQuestion(); // Triggera l'effetto quando cambia la domanda
      this.resetState();
    });
  }
  resetState(): void {
    this.selectedAnswered.set(false);
    this.isCorrect.set(false);
    // Reset isAnswered
  }

  onClick(): void {
    if (this.quizService.selectedAnswered()) {
      return; // Blocca la selezione di altre risposte
    }

    this.selectedAnswered.set(true);

    const answerResult = this.quizService.selectAnswerNew(this.answerText());
    if (answerResult) {
      this.isCorrect.set(true);
      console.log('si');
    } else {
      console.log('no');
    }
  }
}
