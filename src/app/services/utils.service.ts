import { Injectable } from '@angular/core';
import { ActionSheetController, AlertButton, AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Users } from '../classes/users';
import { GlobalServiceService } from './global-service.service';

@Injectable({
    providedIn: 'root'
  })
  export class UtilsService {
    constructor(
      private alertCtrl: AlertController,
      private modalController: ModalController,
      private loadingController: LoadingController,
      private actionSheetController: ActionSheetController,
      private global:GlobalServiceService,
      private toastController: ToastController
    ) { 
    }

    //TOASTS
    async presentToast(mensaje: string, color: string) {
        const toast = await this.toastController.create({
          message: mensaje,
          color: color,
          duration: 2000,
        });
        toast.present();
      }
      
      ///ALERTS
      async presentSimpleAlert(header: string, subheader: string, message: string, button: string | AlertButton) {
        const alert = await this.alertCtrl.create({
          header: header,
          subHeader: subheader,
          message: message,
          buttons: [button]
        });
    
        await alert.present();
      }
  
      async presentAlertInput(header: string,message: string, type: any, placeholder: string, value: string) {
        const alert = await this.alertCtrl.create({
          header: header,
          subHeader:message,
          inputs: [
            {
              name: 'param',
              type: type,
              placeholder: placeholder,
              value: value
            },
          ],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
                alert.dismiss("");
              }
            }, {
              text: 'Aceptar',
              handler: (data) => {
                console.log('Confirm Ok');
                alert.dismiss(data)
              }
            }
          ]
        });
    
        await alert.present();
        let data;
        await alert.onDidDismiss().then((res) => {
            data = res
        })
        return data
      }
  
      async presentAlertInputs(header: any,message: any, inputs: any) {
        const alert = await this.alertCtrl.create({
          header: header,
          subHeader:message,
          inputs: inputs,
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
                alert.dismiss("");
              }
            }, {
              text: 'Aceptar',
              role: 'ok',
              handler: (data) => {
                console.log('Confirm Ok');
                alert.dismiss(data)
              }
            }
          ]
        });
    
        await alert.present();
        let data;
        await alert.onDidDismiss().then((res) => {
            data = res
        })
        return data
      }
  
      async presentAlertConfirm(header: string, message: string) { 
        const alert = await this.alertCtrl.create({
          header: header,
          message: message,
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            }, {
              text: 'Aceptar',
              role: 'ok',
              handler: () => {
                console.log('Confirm Ok');
              }
            }
          ]
        });
        
        let choice;
        await alert.present();
        await alert.onDidDismiss().then((data) => {
          choice = data
        });
        return choice;
      }
  
      async presentSimpleAlertAutoDismiss(header: string, subheader: string, message: string) {
        const alert = await this.alertCtrl.create({
          header: header,
          subHeader: subheader,
          message: message,
        });
        await alert.present();
        setTimeout(function name() {
          alert.dismiss();
        }, 1000);
      }
  
      async presentAlertEditNombre(user: Users) {
        let resolveFunction: (confirm: any) => void;
        let promise = new Promise<any>(resolve => {
          resolveFunction = resolve;
        });
        const alert = this.alertCtrl.create({
          header: "Editar informacion personal",
          inputs: [
            {
              name: 'nombre',
              type: "text",
              placeholder: "Nombre...",
              value: user.name
            },
            {
              name: 'apellido',
              type: "text",
              placeholder: "Apellido...",
              value: user.lastname
            },
          ],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            }, {
              text: 'Aceptar',
              handler: (data) => resolveFunction(data)
            }
          ]
        });
        (await alert).present();
        return promise;
      }
  
      //MODALS
      async edcModal(component: any, object: any, pedido?: any, objeto2?: any){
        const modal = await this.modalController.create({
          component: component,
          componentProps: {objeto: object, pedido: pedido, objeto2:objeto2}
        });
        await modal.present();
        const { data } = await modal.onDidDismiss();
        return data;
      }
  
      /////LOADER/////
      async showLoaderControllable(message: string){
        const loading = await this.loadingController.create({
          spinner: "lines",
          duration: 120500,
          message: message,
          translucent: true,
          cssClass: 'custom-class custom-loading',
          backdropDismiss: false
        });
        return loading;
      }
  
      //AUX
      formatDateCalendar(date: any) {
        var d = new Date(parseInt(date)),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
          if (month.length < 2) 
            month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;
  
        return [year, month, day].join('-');
      }
  
      getMesAno(date: string) {
        var d = new Date(date), month = (d.getMonth() + 1), year = d.getFullYear();
        return [year, month].join('-');
      }
  
      timestampToDate(timestamp: string) {
        let options: any = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        };
        let date = new Date(Number(timestamp)).toLocaleString('es-AR', options);
        return date;
      }
  
      /*searchUserByName(evt: { srcElement: { value: any; }; }, array: any[]){
        const searchTerm = evt.srcElement.value;
        if (!searchTerm) {
          return;
        }
        if (searchTerm.length<2) {
          return;
        }
  
        array = array.filter((item: Users)  => {
          if (item.name && searchTerm) {
            if (item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
             return true;
            }
            if (item.lastname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
              return true;
             }
            return false;
          }
        });
        return array;
      } */
      
      traductor(mensaje: string){
        let mensajeFinal="";
        switch (mensaje){
    
            case 'signInWithEmailAndPassword failed: First argument "email" must be a valid string.':{
              mensajeFinal="Por favor rellene los campos de Email y contraseña";
              break;
            }
            case "The email address is badly formatted.":{
              mensajeFinal="Por favor ingrese un email Valido";
              break;
            }
            case 'signInWithEmailAndPassword failed: Second argument "password" must be a valid string.':{
              mensajeFinal="Por favor rellene los campos de Email y contraseña";
              break;          
            }
            case "The password is invalid or the user does not have a password.":{
              mensajeFinal="La contraseña es invalida o el usuario no tiene una.";
              break;          
            }
            case "There is no user record corresponding to this identifier. The user may have been deleted.":{
              mensajeFinal="Usuario o contraseña incorrectos.";
              break;          
            }
            case "A network error (such as timeout, interrupted connection or unreachable host) has occurred.":{
              mensajeFinal="Parece que no tienes internet o la conexion no es buena.";
              break;          
            }
    
            //REGISTER
    
            case "The email address is already in use by another account.":{
              mensajeFinal="El email ya esta en uso por otra cuenta";
              break;          
            }        
            case 'createUserWithEmailAndPassword failed: First argument "email" must be a valid string.':{
              mensajeFinal="Rellene todos los campos y luego presione en Registrarme";
              break;          
            }
            case 'createUserWithEmailAndPassword failed: Second argument "password" must be a valid string.':{
              mensajeFinal="Rellene todos los campos y luego presione en Registrarme";
              break;          
            }
            case 'The email address is badly formatted.':{
              mensajeFinal="El email debe contener @";
              break;          
            }  
            case 'The email address is badly formatted.':{
              mensajeFinal='El email debe contener "@" y terminar en ".com"';
              break;          
            }           
            case 'Password should be at least 6 characters':{
              mensajeFinal='La contraseña debe contener al menos 6 caracteres.';
              break;          
            }
            default:{
              mensajeFinal='No se ha podido iniciar la sesion.';
              break;  
            }                       
          }
        return mensajeFinal;
      }
  }
  
