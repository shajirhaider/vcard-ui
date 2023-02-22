import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginobj = {
    username: "",
    password: ""
  }
  loading = false
  msg = ""
  successMsg = ""
  requiredError = false

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }


  login() {
    this.msg = this.successMsg = ""
    if (!this.loginobj.username || !this.loginobj.password) {
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

}
