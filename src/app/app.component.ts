import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class AppComponent implements OnInit {
  products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 150 },
    { id: 3, name: 'Product 3', price: 200 },
    { id: 4, name: 'Product 4', price: 700 },
  ];
  cartItems: any[] = [];
  searchQuery = '';

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartItems = cart;
    });
  }

  filteredProducts() {
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  addToCart(product: any) {
    const existingItem = this.cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.cartService.updateCart(this.cartItems);
  }

  buyNow() {
    this.cartService.buyNow();
  }

  getOriginalTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // Method to calculate the discount amount (10% discount)
  getDiscountAmount(): number {
    return this.getOriginalTotal() * 0.1; // 10% discount
  }

  // Method to calculate the final total after discount
  getFinalTotal(): number {
    return this.getOriginalTotal() - this.getDiscountAmount();
  }

  changeQuantity(index: number, item: any, change: number): void {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 0) {
      item.quantity = newQuantity;
      this.cartService.updateCart(this.cartItems); // Update cart service
    }
  }
}
