import { Component, OnInit } from '@angular/core';
// import {Stocks} from '../stock-list/stock-list.component';
import {FormGroup, FormControl, NgForm} from '@angular/forms';

//Import Stock class
import { Stock } from '../class/stock';

//importing API service
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-stock-quote',
  templateUrl: './stock-quote.component.html',
  styleUrls: ['./stock-quote.component.sass']
})
export class StockQuoteComponent implements OnInit {
  private searchForm: FormGroup;

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'stockTicker': new FormControl()
    });
  }

  addStockButton = true;
  showSearchField = false;

  searchStock() {
    this.addStockButton = false;
    this.showSearchField = true;
  }

  addStock(searchForm: NgForm): void {

    let ticker = searchForm.value.stockTicker.toUpperCase();
    this._apiService.addStock(ticker);

    //Reset form
    searchForm.reset();

    this.addStockButton = true;
    this.showSearchField = false;
  }

}
