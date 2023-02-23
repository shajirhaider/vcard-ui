import { Component, OnInit, AfterViewInit,  NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';

declare var google: any;


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, AfterViewInit {

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


  constructor(private api: ApiService, private ngZone: NgZone, private router: Router) { }

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

    gAccounts.id.renderButton(document.getElementById('google-button-signup') as HTMLElement, {
      size: 'large',
      theme : "filled_blue",
      type : "standard",
      text: 'signup_with',
      width : 600

    });
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
