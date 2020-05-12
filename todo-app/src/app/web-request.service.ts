import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
  readonly ROOT_URL: string;

  constructor(private http : HttpClient) {
    this.ROOT_URL = 'http://localhost:5554';
   }
  get(uri : string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  } 
  post(uri : string, payload : Object){
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }
  patch(uri : string, payload : Object){
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }
  delete(uri : string){
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }
}
