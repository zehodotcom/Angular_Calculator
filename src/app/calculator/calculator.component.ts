import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  input = "";
  result = "";
  lastOperator = "";

  numberButton(num: string) {
    if (num === '.') {
      if (this.input === "") {
        this.input += num;
      } else {
        this.lastOperator = this.getLastOperator();
        if (this.lastOperator.indexOf(".") < 0) {
          this.input += num;
        }
      }
    } else if (num === "0") {
      if (this.input === "" || /[+\-*/]$/.test(this.input)) {
        return;
      } else {
        this.input += num;
      }
    } else {
      this.input += num;
    }
    this.calculateAnswer();
  }

  getLastOperator() {
    let position = -1;
    const operators = ["+", "-", "*", "/"];
    for (const operator of operators) {
      if (this.input.lastIndexOf(operator) > position) {
        position = this.input.lastIndexOf(operator);
      }
    }
    return this.input.substr(position + 1);
  }

  operatorButton(operatorbutton: string) {
    if (/[+\-*/]$/.test(this.input)) {
      return;
    }
    this.input += operatorbutton;
    this.calculateAnswer();
  }

  deleteNumber(): void {
    if (this.input !== "") {
      this.input = this.input.slice(0, -1);
    }
  }

  deleteAllNumbers(): void {
    this.input = "";
    this.result = "";
  }

  calculateAnswer(): void {
    let formula = this.input;
    if (/[.]$/.test(formula)) {
      formula = formula.slice(0, -1);
    }
    if (/[+\-*/.]$/.test(formula)) {
      formula = formula.slice(0, -1);
    }
    this.result = eval(formula);
  }

  calculateResult(): void {
    this.calculateAnswer();
    this.input = this.result;
    if (this.input === "0") {
      this.input = "";
    }
  }
}