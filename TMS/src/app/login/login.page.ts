import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = ''; 
  password: string = ''; 
  auth: any; 
  user: any; 
  passwordField: string = 'password';

  constructor(private router: Router) {
    this.auth = getAuth();
    
  }
  navib() {
    this.router.navigate(['']);
  }
  ngOnInit() {}

  async login() {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.user = userCredential.user;
      console.log('User logged in:', this.user);
      this.router.navigate(['/my']);
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Failed to sign in. Please check your credentials.');
    }
  }

  togglePassword() {
    this.passwordField = this.passwordField === 'text'? 'password' : 'text';
  }
 
}
