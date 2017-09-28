import linSolve from 'robust-linear-solve';
import range from 'lodash/range';
import pullAll from 'lodash/pullAll';
import sample from 'lodash/sample';
import Equation from './equation';

const solve2x2 = linSolve[2];

class Soe {
  static randomInteger({ lower, upper, exclude = [] }) {
    return sample(pullAll(range(lower, upper + 1), exclude));
  }

  static generateCoefficient(opts = {}) {
    return this.randomInteger({
      lower: -9,
      upper: 9,
      exclude: [0],
      ...opts,
    });
  }

  static generateAnswer(opts = {}) {
    return this.randomInteger({
      lower: -9,
      upper: 9,
      ...opts,
    });
  }

  static generateElimination() {
    // Elimination is efficient when the coefficients of the Xs or Ys in both equations are the same
    // Sometimes one or both equations have to be multiplied by a number to make the variable cancel
    // possible difficulty options:
    // - simple addition, e.g. 2x + 2y = 10; -2x + 3y = 0;
    // - subtraction: same as above but second equation is 2x - 3y = 0
    // - move stuff around -- put c on the left side
    // - student must multiply one of the equations by 2 or 3
    // - student must multiply both of the equations by 2 or 3
    return this.generateRandom();
  }

  static generateSubstitution() {
    // Substitution is most useful when the problem already contains an isolated
    // variable or if there is at least a variable that has a coefficient of one.
    return this.generateRandom();
  }

  // todo: prevent all coefficients from being the same
  // todo: also prevent this: 2x - 2y = 6; 8x - 8y = 24
  static generateRandom() {
    const a1 = this.generateCoefficient();
    const a2 = this.generateCoefficient();
    const b1 = this.generateCoefficient();
    const b2 = this.generateCoefficient();

    const x = this.generateAnswer();
    const y = this.generateAnswer();

    const c1 = a1 * x + b1 * y;
    const c2 = a2 * x + b2 * y;

    const equation1 = new Equation(a1, b1, c1);
    const equation2 = new Equation(a2, b2, c2);
    return [equation1, equation2];
  }

  static generate() {
    return this.generateType('random');
  }

  static generateType(type = 'random') {
    return ({
      random: this.generateRandom,
      substitution: this.generateSubstitution,
      elimination: this.generateElimination,
    }[type] ||
      (() => {
        throw new Error('soe type not found');
      })
    ).apply(this);
  }

  static solve([e1, e2]) {
    const A = [[e1.a, e1.b], [e2.a, e2.b]];
    const b = [e1.c, e2.c];
    const solution = solve2x2(A, b);
    const quotient = solution[2][0];
    if (quotient === 0) {
      return false;
    }
    // add 0 to get rid of negative sign from -0
    return {
      x: solution[0][0] / quotient + 0,
      y: solution[1][0] / quotient + 0,
    };
  }
}

export default Soe;
