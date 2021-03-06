import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

// import Stock class
import { Stock } from '../class/stock';


@Injectable()
export class ApiService {
  selectedStock: string;

  // Stock data store
  stocks: Stock[] = [];

  constructor(private http: HttpClient) { }

  // Add stock method
  addStock(ticker: string) {
    const newStock: Stock = new Stock();

    // Check for duplicates
    if (this.stocks.find(obj => obj['ticker'] === ticker)) {
      console.log('Duplicate');
      return this;
    }

    this.getStock(ticker)
      .subscribe(
        res => {
          let dateTime: string;

          // Populate date object data;
          newStock.ticker = res['Meta Data']['2. Symbol'];
          dateTime = res['Meta Data']['3. Last Refreshed'];
          newStock.date = dateTime.substr(0, 10);
          newStock.time = dateTime.substr(11);
          newStock.price = res['Time Series (1min)'][dateTime]['4. close'];

          // Add stock to stock list array
          this.stocks.push(newStock);
        },
        error => {
          alert(error.message);
          throw new Error(error.message);
        }
      );
  }

  getAllStocks(stocks) {
    stocks.forEach((stock, index) => {
      this.getStock(stock.ticker)
        .subscribe(
          res => {
            let dateTime: string;

            // Populate date object data;
            stock.ticker = res['Meta Data']['2. Symbol'];
            dateTime = res['Meta Data']['3. Last Refreshed'];
            stock.date = dateTime.substr(0, 10);
            stock.time = dateTime.substr(11);
            stock.price = res['Time Series (1min)'][dateTime]['4. close'];

            // Add stock to stock list array
            this.stocks[index] = stock;
          },
          error => {
            alert(error.message);
            throw new Error(error.message);
          }
        );
    });
  }


  // Fetch stock from Alpha Vantage API
  getStock(ticker: string) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=1min&apikey=8J157YWL897O9P5A`;
    return this.http.get(url);
  }

  getStockHistory(ticker: string) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&apikey=8J157YWL897O9P5A`;
    return this.http.get(url);
  }

  // Delete stock method
  deleteStockMethod(ticker: string): ApiService {
    // Get index of stock to be deleted
    const stockIndex = this.stocks.findIndex(obj => obj['ticker'] === ticker);
    // Delete the stock from dataSource
    this.stocks.splice(stockIndex, 1);

    return this;
  }
}
