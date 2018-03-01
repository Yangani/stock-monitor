import { Component, OnInit } from '@angular/core';
import {ApiService} from '../service/api.service';

@Component({
  selector: 'app-stock-history',
  templateUrl: './stock-history.component.html',
  styleUrls: ['./stock-history.component.sass']
})
export class StockHistoryComponent implements OnInit {
  stockData: object = {};
  objectKeys = Object.keys;

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    // console.log("Selected Stock: ", this._apiService.selectedStock);
    this.stockHistory(this._apiService.selectedStock);
  }

  stockHistory(ticker: string): void {

    this._apiService.getStockHistory(ticker)
      .subscribe(res => {
        //Populate date object data;
        this.stockData['ticker'] = res["Meta Data"]["2. Symbol"];
        this.stockData["history"] = res["Time Series (Daily)"];
      });
  }


}
