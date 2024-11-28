import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {}

  updateCart(cart: any[]) {
    this.cartSubject.next(cart);
  }

  getTotal() {
    const cart = this.cartSubject.getValue();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  buyNow() {
    console.log('Buying now!');
  }
}
