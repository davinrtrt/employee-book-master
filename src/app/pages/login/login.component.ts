import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/app.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;
  private loginSubmitAttempt: boolean

  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router: Router) { 
      if(this.authService.isUserLoggedIn()){
        this.router.navigate(['home'])
      }
      this.initializeForm()
    }

  ngOnInit(): void {
  }

  private initializeForm(){
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  isInvalid(fieldName: string){
    return (
      (this.loginForm.get(fieldName).invalid && this.loginForm.get(fieldName).touched) ||
      (this.loginForm.get(fieldName).untouched)
    )
  }

  onLogin(form: FormGroup){
    if(form.valid){
      let user: User = {
        username: form.value.username,
        password: form.value.password
      }

      this.authService.login(user)
      if(!this.authService.isUserLoggedIn()){
        this.invalidLogin = true
      } else {
        this.invalidLogin = false
      }
      console.log(this.invalidLogin)
    }

    this.loginSubmitAttempt = true
  }
}
