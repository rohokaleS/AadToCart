import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CartService } from './cart.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [BrowserModule, CommonModule, FormsModule],

  providers: [CartService],
  bootstrap: [],
})
export class AppModule {}
