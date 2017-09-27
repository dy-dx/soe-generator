import { ok, strictEqual, deepStrictEqual } from 'assert';
import Soe from '../src/lib/soe';
import Equation from '../src/lib/equation';

describe('Soe', () => {
  describe('.randomInteger', () => {
    it('returns 1 when the range is 0-1 and 0 is excluded', () => {
      strictEqual(Soe.randomInteger({ lower: 0, upper: 1, exclude: [0] }), 1);
    });
  });

  describe('.generateRandom', () => {
    it('returns a pair of equations', () => {
      const pair = Soe.generateRandom();
      ok(pair && pair.length === 2);
      strictEqual(pair[0].constructor.name, Equation.name);
      strictEqual(pair[1].constructor.name, Equation.name);
    });
  });

  describe('.solve', () => {
    it('solves the dang thing', () => {
      const pair = [
        new Equation(2, 2, 10), // 2x + 2y = 10
        new Equation(-2, 3, 0), // -2x + 3y = 0
      ];
      deepStrictEqual(Soe.solve(pair), { x: 3, y: 2 });
    });

    it('returns false when unsolvable', () => {
      const pair = [
        new Equation(1, 1, 1),
        new Equation(1, 1, 2),
      ];
      deepStrictEqual(Soe.solve(pair), false);
    });

    it('returns false when infinite solutions', () => {
      const pair = [
        new Equation(1, 1, 1),
        new Equation(2, 2, 2),
      ];
      deepStrictEqual(Soe.solve(pair), false);
    });
  });
});
