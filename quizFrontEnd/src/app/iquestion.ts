export interface IQuestion {
  question: string;
  answers: IAnswer[];
}

export interface IAnswer {
  correctAnswer?: string;
  incorrectAnswer?: string;
}
