import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';
import firebase from 'firebase/';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {
  
  signInForm: FormGroup;
  errorMessage: string;

  isAuth: boolean;
  isErr: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {

    this.checkIfUserIsConnected();

    this.initForm();

  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }

  checkIfUserIsConnected(){
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
          setTimeout(
            () => {
              this.router.navigate(['/admin']);
            }, 1000
          );   
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onSubmit() {
    const email = this.signInForm.get('email')?.value;
    const password = this.signInForm.get('password')?.value;
    
    this.authService.signInUser(email, password).then(
      () => {
        setTimeout(
          () => {
            this.router.navigate(['/admin']);
          }, 2000
        );
        
      },
      (error) => {
        this.isErr = true;
        this.errorMessage = error;
        //alert(error);
      }
    );
  }

}
