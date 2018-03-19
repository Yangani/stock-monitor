import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/observable/of';

//Import Stocks class
import { Stock } from '../class/stock';

//Import api service
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.sass']
})
export class StockListComponent implements OnInit {

  constructor(private _apiService: ApiService,
              private router: Router) {

    setInterval(() => {
      this._apiService.getAllStocks(this._apiService.stocks);
    } , 60000);
  }

  stocksListed = this._apiService.stocks;

  ngOnInit() {
    //Get Walmart stock on Init
    this._apiService.addStock('WMT');
  }

  deleteStock(ticker: string): void {
    this._apiService.deleteStockMethod(ticker);
  }

  showHistory(ticker: string): void {
    this._apiService.selectedStock = ticker;
    this.router.navigate(['/history']);
  }
}
