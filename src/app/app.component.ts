import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { GlobalServiceService } from './services/global-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  admin: any;
  constructor(
    private UsersService: UsersService,
    private global:GlobalServiceService
  ) {}

  ngOnInit(){
    this.getAdmin();

  }
  
  getAdmin(){
    console.log("app.components.ts: getAdmin => global.uid_value", this.global.uid_value);
    this.global.uid_value.subscribe(uid=>{
      console.log("app.components.ts: getAdmin => uid", uid);
      this.UsersService.getAdmin(uid).subscribe((admin: any)=>{
        this.admin=admin;
      });
    })
  }
}
