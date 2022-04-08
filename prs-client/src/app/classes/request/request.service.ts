import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from './request.class';
import { RequestlineService } from '../requestline/requestline.service';



@Injectable({
  providedIn: 'root'
})
export class RequestService {
  
  baseUrl = "http://localhost:14154/api/requests";
  revUrl = "http://localhost:14154/api/requests/review";
  myUrl = "http://localhoswt:14154/api/requests/mylist";

  constructor(private http: HttpClient) { }

  list(): Observable<Request[]> {
    return this.http.get(`${this.baseUrl}`) as Observable<Request[]>;
  }  
  listRevs(rid: string): Observable<Request[]> {
    return this.http.get(`${this.revUrl}/${rid}`) as Observable<Request[]>;
  }
  mylist(myid: string): Observable<Request[]> {
    return this.http.get(`${this.myUrl}/${myid}`) as Observable<Request[]>;
  }
  get(id: string): Observable<Request> {
    return this.http.get(`${this.baseUrl}/${id}`) as Observable<Request>;
  }
  create(request: Request): Observable<any> {
    return this.http.post(`${this.baseUrl}`, request) as Observable<any>;
  }
  change(request: Request): Observable<any> {
    return this.http.put(`${this.baseUrl}/${request.id}`, request) as Observable<any>;
  }
  remove(request: Request): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${request.id}`) as Observable<any>;
  }

  approve(request: Request): Observable<any> {
    return this.http.put(`${this.baseUrl}/approve/${request.id}`, request) as Observable<any>;
  }

  deny(request: Request): Observable<any> {
    return this.http.put(`${this.baseUrl}/deny/${request.id}`, request) as Observable<any>;
  }

}
