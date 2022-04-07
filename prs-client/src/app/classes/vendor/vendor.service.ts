import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendor } from './vendor.class';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  baseUrl:string="http://localhost:14154/api/vendors";

  constructor(private http:HttpClient) { }

list():Observable <Vendor[]>{
  return this.http.get(`${this.baseUrl}`) as Observable<Vendor[]>;
}
get(id:number):Observable<Vendor>{
  return this.http.get(`${this.baseUrl}/${id}`) as Observable<Vendor>
}
create(vendor: Vendor): Observable<Vendor>{
  return this.http.post(`${this.baseUrl}`, vendor) as Observable<Vendor>;
}
change(vendor: Vendor): Observable<any>{
 return this.http.put(`${this.baseUrl}/${vendor.id}`, vendor) as Observable<any>; 
}
remove(id:number): Observable<any>{
  return this.http.delete(`${this.baseUrl}/${id}`) as Observable<any>;
}
}