import linSolve from 'robust-linear-solve';
import Equation from './equation';

const solve2x2 = linSolve[2];

class Soe {
  static randomSign() {
    return Math.random() < 0.5 ? -1 : 1;
  }

  static randomIntegerBetween(lower, upper) {
    return Math.round(lower + (Math.random() * (upper - lower)));
  }

  static generateCoefficient() {
    return this.randomIntegerBetween(1, 9) * this.randomSign();
  }

  static generateAnswer() {
    // add 0 to get rid of negative sign from -0
    return (this.randomIntegerBetween(0, 9) * this.randomSign()) + 0;
  }

  static generate() {
    const a1 = this.generateCoefficient();
    const a2 = this.generateCoefficient();
    const b1 = this.generateCoefficient();
    const b2 = this.generateCoefficient();

    const x = this.generateAnswer();
    const y = this.generateAnswer();

    const c1 = (a1 * x) + (b1 * y);
    const c2 = (a2 * x) + (b2 * y);

    const equation1 = new Equation(a1, b1, c1);
    const equation2 = new Equation(a2, b2, c2);
    return [equation1, equation2];
  }

  static solve([e1, e2]) {
    const A = [[e1.a, e1.b], [e2.a, e2.b]];
    const b = [e1.c, e2.c];
    const solution = solve2x2(A, b);
    const quotient = solution[2];
    if (quotient === 0) {
      return false;
    }
    // add 0 to get rid of negative sign from -0
    return {
      x: (solution[0] / quotient) + 0,
      y: (solution[1] / quotient) + 0,
    };
  }
}

export default Soe;
