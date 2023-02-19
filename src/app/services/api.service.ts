import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getvcardData(id) {
    return this.http.get( environment.apiURL+"/api/qr/"+id);
  }

  saveVcardData(data){
    return this.http.post(environment.apiURL+"/api/add", data);
  }

}
