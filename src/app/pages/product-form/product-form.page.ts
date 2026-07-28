import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonChip,
  IonLabel,
  AlertController,
  ToastController,
  NavController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline, arrowBackOutline, checkmarkCircleOutline, alertCircleOutline, cubeOutline, globeOutline } from 'ionicons/icons';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    IonButtons,
    IonBackButton,
    IonChip,
    IonLabel,
    TranslatePipe
  ]
})
export class ProductFormPage implements OnInit {
  isEditMode: boolean = false;
  productId: string | null = null;

  product: Product = {
    name: '',
    category: '',
    price: 0,
    stock: 0,
    description: '',
    status: 'available'
  };

  categories: string[] = ['Electrónica', 'Accesorios', 'Mobiliario', 'Herramientas', 'Otros'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navController: NavController,
    private productService: ProductService,
    public languageService: LanguageService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    addIcons({
      saveOutline,
      arrowBackOutline,
      checkmarkCircleOutline,
      alertCircleOutline,
      cubeOutline,
      globeOutline
    });
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.isEditMode = true;
      const existingProduct = this.productService.getProductById(this.productId);
      if (existingProduct) {
        this.product = { ...existingProduct };
      } else {
        this.showErrorAlert(this.languageService.translate('PRODUCT_FORM.ERROR_NOT_FOUND'));
        this.navController.navigateBack('/products');
      }
    }
  }

  toggleLanguage() {
    this.languageService.toggleLanguage();
  }

  get currentLanguage(): string {
    return this.languageService.currentLang;
  }

  async onSubmit(form: any) {
    if (form.invalid) {
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
      return;
    }

    try {
      this.productService.saveProduct(this.product);
      await this.showSuccessToast(
        this.languageService.translate(
          this.isEditMode 
            ? 'PRODUCT_FORM.SUCCESS_UPDATE' 
            : 'PRODUCT_FORM.SUCCESS_CREATE'
        )
      );
      this.navController.navigateBack('/products');
    } catch (error) {
      await this.showErrorAlert(this.languageService.translate('PRODUCT_FORM.ERROR_SAVE'));
    }
  }

  onCancel() {
    this.navController.navigateBack('/products');
  }

  private async showSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
  }

  private async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: this.languageService.translate('COMMON.ERROR'),
      message,
      buttons: [this.languageService.translate('COMMON.ACCEPT')]
    });
    await alert.present();
  }

  getCategoryLabel(category: string): string {
    switch (category) {
      case 'Electrónica': return this.languageService.translate('CATEGORIES.ELECTRONICS');
      case 'Accesorios': return this.languageService.translate('CATEGORIES.ACCESSORIES');
      case 'Mobiliario': return this.languageService.translate('CATEGORIES.FURNITURE');
      case 'Herramientas': return this.languageService.translate('CATEGORIES.TOOLS');
      case 'Otros': return this.languageService.translate('CATEGORIES.OTHER');
      default: return category;
    }
  }
}
