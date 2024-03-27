import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css',
})
export class QuizzComponent implements OnInit {
  title: string = '';

  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answerSelected: string = '';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;
  results: number = 0;
  resultPhrase: string = '';

  eVilao: boolean = false;

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  buttonPress(value: string) {
    this.answers.push(value);
    console.log(this.answers);
    this.checkResult(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex++;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      this.finished = true;
      if (this.results < 0) {
        this.resultPhrase = quizz_questions.results.A;
        this.eVilao = true;
      } else {
        this.resultPhrase = quizz_questions.results.B;
      }
    }
  }

  async checkResult(answer: string) {
    if (!this.finished) {
      if (answer == 'A') {
        this.results--;
      } else {
        this.results++;
      }
    }
  }
}
