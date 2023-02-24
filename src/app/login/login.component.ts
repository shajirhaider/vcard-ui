import { Component, OnInit, AfterViewInit,  NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';

declare var google: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , AfterViewInit  {
  loginobj = {
    username: "",
    password: ""
  }
  loading = false
  msg = ""
  successMsg = ""
  requiredError = false
  passRegexMsg = ""
  emailRegexMsg = ""

  constructor(private api: ApiService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    const gAccounts = google.accounts;

    gAccounts.id.initialize({
      client_id: environment.gClientID,
      ux_mode: 'popup',
      cancel_on_tap_outside: true,
      callback: ({ credential }) => {
        this.ngZone.run(() => {
          this._loginWithGoogle(credential);
        });
      },
    });

    gAccounts.id.renderButton(document.getElementById('google-button') as HTMLElement, {
      size: 'large',
      theme : "filled_blue",
      type : "standard",
      text: 'signin_with',
      width : 270
    });
  }

  

  passwordRegex(password: any) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (regex.test(password)) {
      this.passRegexMsg = ""
    } else {
      this.passRegexMsg = "Password is invalid"
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


  login() {
    this.msg = this.successMsg = ""
    this.passwordRegex(this.loginobj.password)
    this.emailRegex(this.loginobj.username)
    if (!this.loginobj.username || !this.loginobj.password || this.emailRegexMsg || this.passRegexMsg) {
      this.requiredError = true
      return
    }
    this.requiredError = false
    this.loading = true
    this.api.login(this.loginobj).subscribe(data => {
      this.loading = false
      if (data["success"] == false) {
        this.msg = data["msg"]
      } else {
        sessionStorage.setItem('data', JSON.stringify(data["data"]))
        this.router.navigateByUrl('/vcards')
      }
    });
  }

  _loginWithGoogle(token: string) {
    this.api.signupWithGoogle(token).subscribe(data =>{
      if (data["success"] == false) {
        this.msg = data["msg"]
      } else {
        this.successMsg = data["msg"]
        sessionStorage.setItem('data', JSON.stringify(data["data"]))
        this.router.navigateByUrl('/vcards')
      }
    })
  }

}
