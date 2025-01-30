import { computed, inject, Injectable, input, signal } from '@angular/core';
import { IAnswer, IQuestion } from './iquestion';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  baseUrl$ = 'QuizQuestions.JSON';
  httpClient = inject(HttpClient);

  questions = signal<IQuestion[]>([]);
  answers = computed(
    () => this.questions()[this.indexQuestion()].answers[this.indexQuestion()]
  );
  isClicked: boolean = false;

  indexQuestion = signal<number>(0);
  currentQuestion = computed(
    () => this.questions()[this.indexQuestion()] ?? []
  );
  showResults = computed(
    () => this.indexQuestion() === this.questions().length - 1
  );
  isCorrect = signal<boolean>(false);
  selectedAnswered = signal<boolean>(false);
  currentAnswer = signal<IAnswer | string>('');
  correctAnswerCount = signal<number>(0);
  selectedAnswerIndex = signal<number | null>(null); // Tiene traccia della risposta selezionata // Simuliamo la logica della selezione

  showQuestions() {
    return this.httpClient.get<IQuestion[]>(this.baseUrl$).subscribe((data) => {
      data.forEach((question) => {
        question.answers = this.shuffleArray(question.answers);
      });
      this.questions.set(data);

      console.log(this.questions);
    });
  }
  private shuffleArray<T>(array: T[]): T[] {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
  /*   showAnswers() {
    return this.httpClient.get<IAnswer[]>(this.baseUrl$).subscribe((data) => {
      this.answers.set(data);

      console.log(this.answers);
    });
  } */

  restartQuiz() {
    this.indexQuestion.set(0);
    this.correctAnswerCount.set(0); // Resetta il punteggio
  }
  selectAnswer(answerText: IAnswer) {
    const answerTextNow =
      answerText.correctAnswer || answerText.incorrectAnswer;
    if (answerTextNow) {
      this.currentAnswer.set(answerTextNow as IAnswer);
    }

    const currentQuestionNow = this.questions()[this.indexQuestion()];
    const correctAnswerNow = currentQuestionNow.answers.find(
      (x) => x.correctAnswer
    )?.correctAnswer;
    console.log('nido', currentQuestionNow);
    /* console.log('Correct anser niw', typeof correctAnswerNow);
    console.log('answer text', typeof this.currentAnswer()); */
    if (answerTextNow === correctAnswerNow) {
      console.log('SERVICE CorrectAnswer');
      return true;
    } else {
      console.log('SERVICE IncorrectAnswer');
      return false;
    }
  }

  selectAnswerNew(answerText: IAnswer) {
    if (this.selectedAnswered()) {
      return false; // Impedisce di selezionare un'altra risposta dopo la prima
    }
    this.selectedAnswered.set(true); // Blocca altre selezioni
    if (answerText.correctAnswer) {
      this.currentAnswer.set(answerText.correctAnswer);
      this.correctAnswerCount.update((count) => count + 1); // Incrementa il totale corrette
      console.log(this.currentAnswer(), 'questa è la mia risposta');
      return true;
    } else {
      console.log('off');

      return false;
    }
  }
  goToNextQuestion() {
    const currentQuestionIndex = this.showResults()
      ? this.indexQuestion()
      : this.indexQuestion() + 1;
    this.indexQuestion.set(currentQuestionIndex);

    this.selectedAnswered.set(false);
    this.currentAnswer.set('');
  }
}
