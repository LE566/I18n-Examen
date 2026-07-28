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
import { LanguageService } from '../services/language.service';
import { TranslatePipe } from '../pipes/translate.pipe';

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
    IonLabel,
    TranslatePipe
  ]
})
export class HomePage {
  constructor(public languageService: LanguageService) {
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
    this.languageService.toggleLanguage();
  }

  get currentLanguage(): string {
    return this.languageService.currentLang;
  }
}
