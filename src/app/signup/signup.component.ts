import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }
  loading = false
  msg = ""
  successMsg = ""
  requiredError = false
  passRegexMsg = ""
  emailRegexMsg = ""

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
  signupFn() {
    this.msg = this.successMsg = ""
    if (!this.signup.firstName || !this.signup.lastName || !this.signup.email || !this.signup.password || this.emailRegexMsg || this.passRegexMsg) {
      this.requiredError = true
      return
    }
    this.requiredError = false
    this.loading = true
    this.api.signup(this.signup).subscribe(data => {
      this.loading = false
      if (data["success"] == false) {
        this.msg = data["msg"]
      } else {
        this.successMsg = data["msg"]
      }
    });
  }

}
