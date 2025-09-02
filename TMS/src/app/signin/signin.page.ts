import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  auth: any;
  passwordField: string = 'password';

  constructor(private router: Router) {
    this.auth = getAuth();
  }

  ngOnInit() {}

  navib() {
    this.router.navigate(['']);
  }

  async signup() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      console.log('User registered:', userCredential.user);
      this.router.navigate(['\my']);
    } catch (error: any) {
      console.error('Error during sign up:', error);
      alert(error.message);
    }
  }
  togglePassword() {
    this.passwordField = this.passwordField=== 'text'? 'password' : 'text';
  }
}
