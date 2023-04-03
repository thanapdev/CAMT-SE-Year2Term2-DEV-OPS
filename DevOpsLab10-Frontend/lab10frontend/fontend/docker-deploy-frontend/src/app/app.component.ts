import { Component, OnInit } from '@angular/core';
import { GradeService } from './service/grade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  score: string;
  grade: string;
  outputClass: string;
  showOutput: boolean;
  constructor(private gradeService: GradeService) {

  }

  ngOnInit() {
    this.score = '';
    this.grade = '';
    this.changeOutputClass();
    this.showOutput = false;
  }

  getGrade() {
    if (this.isNumeric(this.score)) {
      this.gradeService.getGradeFromScore(+this.score)
        .subscribe(result => {
          this.showOutput = true;
          this.grade = result.data.getGradeFromScore.grade;
          this.changeOutputClass();
        });
    } else {
      this.showOutput = false;
      alert('Please enter number');
    }
  }


  isNumeric(value: any): boolean {
    return !isNaN(value - parseFloat(value));
  }
  changeOutputClass() {
    switch (this.grade) {
      case 'F': this.outputClass = 'btn btn-danger btn-lg col-md-3';
        break;
      case 'D': this.outputClass = 'btn btn-warning btn-lg col-md-3';
        break;
      case 'C': this.outputClass = 'btn btn-info btn-lg col-md-3';
        break;
      case 'B': this.outputClass = 'btn btn-Light btn-lg col-md-3';
        break;
      case 'A': this.outputClass = 'btn btn-success btn-lg col-md-3';
        break;
      default:
        this.outputClass = 'hideGrade';
    }
  }
}
