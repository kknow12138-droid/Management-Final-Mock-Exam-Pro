
export enum QuestionType {
  DEFINITION = 'DEFINITION',
  SHORT_ANSWER = 'SHORT_ANSWER',
  CASE_STUDY = 'CASE_STUDY'
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  content: string;
  suggestedAnswer: string;
  score: number;
}

export interface ExamSession {
  id: string;
  startTime: number;
  questions: Question[]; // 当前生成的题目列表
  answers: Record<string, string>;
  isCompleted: boolean;
  score?: number;
  feedback?: string;
  gradedResults?: GradedQuestion[];
}

export interface GradedQuestion {
  questionId: string;
  score: number;
  feedback: string;
}

export type AppMode = 'LANDING' | 'EXAM' | 'REVIEW' | 'ANALYTICS';
