import { Injectable, NgZone } from '@angular/core';
import {
	Auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut
} from '@angular/fire/auth';

import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Users } from '../classes/users';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Admin } from '../classes/admin' ;
import { GlobalServiceService } from './global-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userData: any;
  constructor(
	public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private db: AngularFirestore,
    private auth:AngularFireAuth,
    private global:GlobalServiceService
	) {
		this.ngFireAuth.authState.subscribe((user) => {
			if (user) {
			  this.userData = user;
			  localStorage.setItem('user', JSON.stringify(this.userData));
			  JSON.parse(localStorage.getItem('user') || '{}');
			} else {
			  localStorage.setItem('user', null || '{}');
			  JSON.parse(localStorage.getItem('user') || '{}');
			}
		  });
	 }

  // Login in with email/password
  SignIn(email: any, password: any) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  // Register user with email/password
  RegisterUser(email: any, password: any) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Email verification when new user register
  SendVerificationMail() {
    return this.ngFireAuth.currentUser.then((user: any) => {
      return user.sendEmailVerification().then(() => {
        this.router.navigate(['verify-email']);
      });
    });
  }

  // Recover password
  PasswordRecover(passwordResetEmail: any) {
    return this.ngFireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert(
          'Password reset email has been sent, please check your inbox.'
        );
      })
      .catch((error) => {
        window.alert(error);
      });
    }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.emailVerified !== false ? true : false;
  }

  // Sign-out
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  //GETTERS
  verificarAdmin() {
    return new Promise(resolve=>{
    this.auth.user.subscribe(async res=>{
        console.log("user.service.ts: verificarAdmin => auth.user: res ", res);
        if(!res){
          resolve(false);
        }else{
          console.log("user.service.ts: verificarAdmin => auth.user: res.uid ", res.uid);
          await this.db.collection("admin").doc(res.uid).get().toPromise().then((admin: any) => {
            console.log("user.service.ts: verificarAdmin => admin ", admin);
            if(admin.exists){
              console.log("user.service.ts: verificarAdmin => admin.data ", admin.data());
              let userData:Admin = admin.data();
              if(!userData.approved){
                resolve(false);
              }else{
                console.log("user.service.ts: verificarAdmin => approved: uid ", userData.uid);
                this.global.uid = userData.uid;
                //this.global.role=userData.role;
                resolve(true);
              }
            }else{
              resolve(false);
            }
          });
        }
      }
    )
    });
  }

  getAdminPromise(uid: string){
    return this.db.collection("admin").doc(uid).get();   
  }

  getAdmin(uid: string){
    return this.db.collection("admin").doc(uid).valueChanges();   
  } 
};
