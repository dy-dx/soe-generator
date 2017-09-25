class Equation {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  format() {
    const a = Math.abs(this.a) === 1 ? '' : Math.abs(this.a);
    const asign = this.a < 0 ? '-' : '';

    const b = Math.abs(this.b) === 1 ? '' : Math.abs(this.b);
    const bsign = this.b < 0 ? '-' : '+';

    return `${asign}${a}x ${bsign} ${b}y = ${this.c}`;
  }
}

export default Equation;
