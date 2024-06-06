import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  wishlistCount = new BehaviorSubject(0)
  cartCount = new BehaviorSubject(0)
  server_url = "https://mean-project-a0u5.onrender.com"

  constructor(private http:HttpClient) {
    if(sessionStorage.getItem("token")){
      this.getwishlistCount()
      this.getCartCount()
    }

   }


  getAllProducts(){
    return this.http.get(`${this.server_url}/all-products`)
  }

  registerApi(user:any){
    return this.http.post(`${this.server_url}/register`,user)
  }

  loginApi(user:any){
    return this.http.post(`${this.server_url}/login`,user)
  }

   //get
   getAProductAPI(id:any){
    return this.http.get(`${this.server_url}/${id}/get-product`)
  }

  appendToken(){
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return{headers}
  }

  //user/add-to-wishlist
  addToWishlistAPI(product:any){
    return this.http.post(`${this.server_url}/user/add-to-wishlist`,product,this.appendToken())
  }

  //get-wishlist
  getWishlistAPI(){
    return this.http.get(`${this.server_url}/get-wishlist`,this.appendToken())
  }

  //count wishlist using next and behaviour subject
  getwishlistCount(){
    this.getWishlistAPI().subscribe((result:any)=>{
      this.wishlistCount.next(result.length)
    })
  }

  //remove wishlist
  removeWishlistAPI(id:any){
    return this.http.delete(`${this.server_url}/remove-wishlist/${id}/item`,this.appendToken())
 
  }
 
  // add to cart api
  addToCartAPI(product:any){
    return this.http.post(`${this.server_url}/user/add-to-cart`,product,this.appendToken())
  }

   //get cart api
   getCartAPI(){
    return this.http.get(`${this.server_url}/get-cart`,this.appendToken())
  }

   //getcart count
  getCartCount(){
    this.getCartAPI().subscribe((result:any)=>{
      this.cartCount.next(result.length)
    })
  }

  //delete cart
  removeCartItemAPI(id:any){
    return this.http.delete(`${this.server_url}/remove-cart/${id}/item`,this.appendToken())
  }

  //increment
  getIncrementCartAPI(id:any){
    return this.http.get(`${this.server_url}/${id}/increment-cart`,this.appendToken())
  }

  //decrement
  getDecrementCartAPI(id:any){
    return this.http.get(`${this.server_url}/${id}/decrement-cart`,this.appendToken())
  }

  //remove all from cart
  emptyCartAPI(){
    return this.http.delete(`${this.server_url}/empty-cart`,this.appendToken())
  }
}
