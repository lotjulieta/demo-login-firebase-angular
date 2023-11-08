import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService} from '../../services/users.service';
import { UtilsService } from 'src/app/services/utils.service';
import { GlobalServiceService } from 'src/app/services/global-service.service';
import { Users } from 'src/app/classes/users';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email="";
  password="";
  constructor(
    private uti: UtilsService,
    public UsersService: UsersService,
    public global: GlobalServiceService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  async logIn() {
    console.log("login.page.ts: logIn => email, pass:", this.email, this.password);
    if(this.email==""){
      this.uti.presentSimpleAlert("Debe ingresar un email", "", "", "Ok");
      return false;
    }
    if(this.password==""){
      this.uti.presentSimpleAlert("Debe ingresar una contraseña", "", "", "Ok");
      return false;
    }
    let loading=this.uti.showLoaderControllable("Iniciando sesión...");
    (await loading).present();
    this.UsersService
      .SignIn(this.email.trim(), this.password.trim())
      .then(answ=>{
        loading.then(async res=>{
          res.dismiss();
          if(answ){
            this.UsersService.getAdminPromise(answ.user.uid).subscribe((data) => {
              if (data.exists) {
                let user: any = data.data();
                if (user.approved) {
                  console.log("login.page.ts: login => OK: ", user);
                  this.uti.presentSimpleAlert("Hola " + " " + user.name + " !", "que bueno tenerte por aquí de nuevo", "", "Gracias !");
                  this.global.uid = user.uid;
                  //this.global.role = user.role;
                  this.router.navigateByUrl("home");
                } else {
                  this.uti.presentSimpleAlert("Usuario no aprobado aún", "", "", "Ok");
                  this.UsersService.SignOut();
                }
              } else {
                this.uti.presentSimpleAlert("Usuario no encontrado", "", "", "Ok");
              }
            });
          }
  
        });   
      }).catch(err=>{
        console.log(err);
        loading.then(res=>{res.dismiss();});
        let mensaje="";
        mensaje=this.uti.traductor(err.message);
        this.uti.presentSimpleAlert(mensaje, "", "", "Aceptar");
      });
  }

  forgot(){
    console.log("login.page.ts: forgot => Entered");
  }
}
