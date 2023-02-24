import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  user : any
  email = ""
  token = ""
  password = ""
  emailSection = true
  tokenSection = false
  passwordSection = false
  emailRegexMsg = ""
  passRegexMsg = ""
  msg = ""
  successMsg = ""
  requiredError = false
  loading= false
  constructor(private api: ApiService,) { }

  ngOnInit(): void {
  }
  

  passwordRegex(password: any) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (regex.test(password)) {
      this.passRegexMsg = ""
    } else {
      this.passRegexMsg = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
    }
  }

  emailRegex(email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (regex.test(email)) {
      this.emailRegexMsg = ""
    } else {
      this.emailRegexMsg = "Email is invalid";
    }
  }
  isUserExists(){
    this.msg = this.successMsg = ""
    if (this.emailRegexMsg || !this.email) {
      this.requiredError = true
      return
    }
    this.requiredError = false
    this.loading = true
    this.api.isUserExists(this.email).subscribe(data => {
      if (data["success"] == false) {      
        this.loading = false
        this.msg = data["msg"]
      } else {
        this.user = data["data"]
        this.sendForgetPassMail()
      }
    });
  }
  sendForgetPassMail(){
    this.api.sendForgetPassMail(this.email, this.user["uuid"], this.user["firstName"], this.user["lastName"]).subscribe(data => {
      this.loading = false
      if (data["success"] == false) {
        this.msg = data["msg"]
      } else {        
        this.emailSection = false
        this.tokenSection = true
        this.successMsg = "We have sent you token to reset password. Please check your email."
      }
    });
  }
  validateForgetToken(){ 
    this.msg = this.successMsg = ""
    if (!this.token) {
      this.requiredError = true
      return
    }
    this.requiredError = false
    this.loading = true
    this.api.validateForgetToken(this.token,this.user["uuid"]).subscribe(data => {
      if (data["success"] == false) {  
        this.msg = data["msg"]
      } else {
        this.tokenSection = false
        this.passwordSection = true
      }    
      this.loading = false
    });
  }

  
  updatePassword(){
    this.msg = this.successMsg = ""
    if (!this.password || this.passRegexMsg) {
      this.requiredError = true
      return
    }
    this.requiredError = false
    this.loading = true
    this.api.updatePassword(this.password,this.user["uuid"]).subscribe(data => {
      if (data["success"] == false) {    
        this.msg = data["msg"]
      } else {
        this.successMsg = "Password reset successfully"
      }    
      this.loading = false
    });
  }

  
}
