import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from './request.class';


const baseUrl = "http://localhost:14154/api/requests";
const revUrl = "http://localhost:14154/api/requests/review";
const myUrl = "http://localhoswt:14154/api/requests/mylist"
@Injectable({
  providedIn: 'root'
})
export class RequestService {


  baseUrl:string="http://localhost:14154/api/requests";
  revUrl: any;

  constructor(private http: HttpClient) { }

  list(): Observable<Request[]> {
    return this.http.get(`${this.baseUrl}`) as Observable<Request[]>;
  }  
  listRevs(rid: string): Observable<Request[]> {
    return this.http.get(`${this.revUrl}/${rid}`) as Observable<Request[]>;
  }
  mylist(myid: string): Observable<Request[]> {
    return this.http.get(`${myUrl}/${myid}`) as Observable<Request[]>;
  }
  get(id: string): Observable<Request> {
    return this.http.get(`${baseUrl}/${id}`) as Observable<Request>;
  }
  create(request: Request): Observable<any> {
    return this.http.post(`${this.baseUrl}`, request) as Observable<any>;
  }
  change(request: Request): Observable<any> {
    return this.http.put(`${baseUrl}/${request.id}`, request) as Observable<any>;
  }
  remove(request: Request): Observable<any> {
    return this.http.delete(`${baseUrl}/${request.id}`) as Observable<any>;
  }

  approve(request: Request): Observable<any> {
    return this.http.put(`${baseUrl}/approve/${request.id}`, request) as Observable<any>;
  }

  deny(request: Request): Observable<any> {
    return this.http.put(`${baseUrl}/deny/${request.id}`, request) as Observable<any>;
  }

}
