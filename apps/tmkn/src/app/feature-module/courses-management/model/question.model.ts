import { MediaContentType } from "../../../shared/enums/media-content-type.enum";

export interface QuizModel {
  id: number;
  title: string;
  description: string;
  titleAr: string;
  descriptionAr: string;
  minimumPassingScores: number;
  duration: number;
  isRandomize: boolean;
  questions: QuestionModel[];
  isShareable: boolean;
  file: string;
  type: MediaContentType;
}
export interface QuestionModel {
  id: number;
  question: string;
  explanation: string;
  explanationAr: string;
  answers: AnswersModel[];
  externalURL: string;
  type: QuestionType;
}

export interface AnswersModel {
  answer: string;
  answerAr: string;
  isCorrect: boolean;
}

export enum QuestionType {
  MultipleChoice = 0,
  MultipleSelection = 1,
  YesOrNoQuestion = 2,
}
