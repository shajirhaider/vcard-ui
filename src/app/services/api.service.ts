import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,private router: Router) { }

  getUserData(){
    if(!sessionStorage.getItem('data')){return ""}
    let ssData = sessionStorage.getItem('data')
    return JSON.parse(ssData).uuid
  }
  getUserName(){
    if(!sessionStorage.getItem('data')){return ""}
    let ssData = JSON.parse(sessionStorage.getItem('data'))
    return ssData.firstName + " " + ssData.lastName
  }

  logout(){   
    sessionStorage.clear()
    this.router.navigateByUrl('')
  }

  getvcardData(id) {
    return this.http.get( environment.apiURL+"/api/qr/"+id);
  }

  saveVcardData(data){
    let req = data
    req.userID = this.getUserData()
    return this.http.post(environment.apiURL+"/api/add", req);
  }

  updateVcardData(data){
    return this.http.post(environment.apiURL+"/api/update", data);
  }

  getVcardList(){
    let body = {
      userID : this.getUserData()
    }  
    return this.http.post(environment.apiURL+"/api/getAll", body);
  }

  getSingleCard(id){
    let body = {
      userID :this.getUserData(),
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

  signup(data){
    return this.http.post(environment.apiURL+"/api/signup", data);
  }

  login(data){
    return this.http.post(environment.apiURL+"/api/login", data);
  }

  signupWithGoogle(data){
    return this.http.post(environment.apiURL+"/api/loginWithGoogle", {"token":data});
  }

  
}
