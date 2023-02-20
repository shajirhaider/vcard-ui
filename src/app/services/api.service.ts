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
    let req = data
    req.userID = 'shajir'
    return this.http.post(environment.apiURL+"/api/add", req);
  }

  updateVcardData(data){
    return this.http.post(environment.apiURL+"/api/update", data);
  }

  getVcardList(){
    let body = {
      userID : "shajir"  
    }  
    return this.http.post(environment.apiURL+"/api/getAll", body);
  }

  getSingleCard(id){
    let body = {
      userID : "shajir",
      uuid : id
    }  
    return this.http.post(environment.apiURL+"/api/getSingleCard", body);
  }
  getAllSocialMedia(id){
    let body = {
      uuid : id
    }  
    return this.http.post(environment.apiURL+"/api/getAllSocialMedia", body);
  }  
  getvCard(id){
    let body = {
      qrCodeValue : id
    }  
    return this.http.post(environment.apiURL+"/api/getvCard", body);
  }

  deleteCard(id){
    let body = {
      uuid : id
    }  
    return this.http.post(environment.apiURL+"/api/delete", body);
  }
  
}
