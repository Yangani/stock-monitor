export class Stock {
  id: number;
  ticker: string;
  price: number;
  date: string;
  time: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
