import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule, MdNativeDateModule} from '@angular/material';
import {DialogModule, ButtonModule, GalleriaModule  } from 'primeng/primeng';
import 'hammerjs'

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule, MdNativeDateModule, DialogModule, ButtonModule, GalleriaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
