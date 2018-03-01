import { Component, OnInit } from '@angular/core';
import {ApiService} from '../service/api.service';

@Component({
  selector: 'app-stock-history',
  templateUrl: './stock-history.component.html',
  styleUrls: ['./stock-history.component.sass']
})
export class StockHistoryComponent implements OnInit {
  stockData;
  objectKeys = Object.keys;

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    // console.log("Selected Stock: ", this._apiService.selectedStock);
    this.stockHistory(this._apiService.selectedStock);
  }

  stockHistory(ticker: string): void {
    let data = {};

    this._apiService.getStockHistory(ticker)
      .subscribe(res => {
        //Populate date object data;
        data['ticker'] = res["Meta Data"]["2. Symbol"];
        data['history'] = res["Time Series (Daily)"];
      });
    this.stockData = data;
  }


}
