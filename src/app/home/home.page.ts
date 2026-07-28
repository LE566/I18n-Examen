import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonChip,
  IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  cubeOutline,
  globeOutline,
  sparklesOutline,
  listOutline,
  addCircleOutline,
  arrowForwardOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonContent,
    IonIcon,
    IonChip,
    IonLabel
  ]
})
export class HomePage {
  currentLanguage: string = 'ES';

  constructor() {
    addIcons({
      cubeOutline,
      globeOutline,
      sparklesOutline,
      listOutline,
      addCircleOutline,
      arrowForwardOutline
    });
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'ES' ? 'EN' : 'ES';
  }
}
