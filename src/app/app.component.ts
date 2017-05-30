import { Component, Optional } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent {
  private ads       = [];
  private serverURL = 'http://localhost:3000/ads';
  private title     = 'app works!';
  private types     = [
    {viewValue: 'House', value: 'house'},
    {viewValue: 'Flat', value: 'flat'},
    {viewValue: 'Industrial', value: 'industrial'},
    {viewValue: 'Land', value: 'land'}
  ];
  private deals     = [
    {viewValue: 'Sell', value: 'sell'},
    {viewValue: 'For rent', value: 'rent'}
  ];

  selectedDeal:string;
  selectedType:string;
  minPrice:number;
  maxPrice:number;
  minArea:number;
  maxArea:number;
  regex:string;

  display:boolean = false;
  selectedAd      = {images: []};
  selectedAdKeys  = null;

  constructor(private http:Http, public dialog:MdDialog) {
    this.OnParamsChange();
  }

  getAds() {
    let params = {
      deal: this.selectedDeal,
      type: this.selectedType,
      price: {
        '$gt': this.minPrice || 0,
        '$lt': this.maxPrice || 100000000 /** it's hack */
      },
      area: {
        '$gt': this.minArea || 0,
        '$lt': this.maxArea || 100000000 /** it's hack */
      }
    };
    if (this.regex)
      params['description'] = {'$regex': this.regex ? `.*${this.regex}.*` : ''};

    let sort    = {};
    let headers = new Headers({
      params: JSON.stringify(params),
      sort: JSON.stringify(sort)
    });
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.serverURL, options).subscribe(
        res => {
        try {
          var ads = JSON.parse(res['_body']);
          this.ads = this.ads.concat(ads);
        } catch (e) {
          console.error(e)
        }
      },
        err => console.log(err)
    );
  }

  OnParamsChange() {
    this.ads = [];
    this.getAds();
  }

  openDialog(advert) {
    this.selectedAd     = advert;
    this.display        = true;
    let ad              = Object.assign({}, advert);
    delete ad['images'];
    delete ad['code'];
    delete ad['origin'];
    delete ad['_id'];
    delete ad['__v'];
    this.selectedAdKeys = Object.keys(ad);
  }

}
