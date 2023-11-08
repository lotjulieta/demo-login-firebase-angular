import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {
  uid_value = new BehaviorSubject(this.uid);
  //role_value = new BehaviorSubject(this.role);

  constructor(
  ) {}

 
  set uid(value: string) {
    this.uid_value.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('uid', value );
  }
 
  get uid() {
    return localStorage.getItem('uid');
  }


  /*set role(value) {
    this.role_value.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('role', value);
  }
 
  get role() {
    return localStorage.getItem('role');
  }*/


}