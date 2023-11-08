import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public buttonArray = [
    {
      text: 'Camaras',
      url: '/home/camaras',
      icon: 'camera-outline',
      color: 'primary'
    },
    {
      text: 'Transporte',
      url: '/home/transporte',
      icon: 'bus-outline',
      color: 'default'
    },
    {
      text: 'Seguridad',
      url: '/home/seguridad',
      icon: 'shield-checkmark-outline',
      color: 'secondary'
  
    },
    {
      text: 'Co-working',
      url: '/home/coworking',
      icon: 'desktop-outline',
      color: 'tertiary'
    },
    {
      text: 'Expensas',
      url: '/home/expensas',
      icon: 'card-outline',
      color: '#1565C0'
    },
    {
      text: 'Factura',
      url: '/home/factura',
      icon: 'document-text-outline',
      color: 'sombra'
    },
    {
      text: 'Emergencias',
      url: '/home/emergencias',
      icon: 'medkit',
      color: 'danger'
    },
  ];

  constructor() { }

  ngOnInit() {
  }


}
