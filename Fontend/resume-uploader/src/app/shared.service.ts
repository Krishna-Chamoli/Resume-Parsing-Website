import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { }
  private api = "http://127.0.0.1:8000/";

  uploadResume(fdata:any){
    return this.http.post(this.api+"parser/", fdata)
  }

  updateResume(data:any){
    return this.http.put(this.api+"parser/", data)
  }

  deleteResume(data:any){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: data,
      },
    };
    return this.http.delete(this.api+"parser/", options)
  }
}
