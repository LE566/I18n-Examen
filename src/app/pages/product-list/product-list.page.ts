import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonFab,
  IonFabButton,
  IonSearchbar,
  IonButtons,
  IonBackButton,
  IonChip,
  IonLabel,
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  createOutline,
  trashOutline,
  searchOutline,
  cubeOutline,
  filterOutline,
  checkmarkCircleOutline,
  warningOutline,
  alertCircleOutline,
  globeOutline
} from 'ionicons/icons';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonFab,
    IonFabButton,
    IonSearchbar,
    IonButtons,
    IonBackButton,
    IonChip,
    IonLabel,
    TranslatePipe
  ]
})
export class ProductListPage implements OnInit {
  searchTerm: string = '';
  selectedCategory: string = 'all';
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    public languageService: LanguageService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({
      addOutline,
      createOutline,
      trashOutline,
      searchOutline,
      cubeOutline,
      filterOutline,
      checkmarkCircleOutline,
      warningOutline,
      alertCircleOutline,
      globeOutline
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  ionViewWillEnter() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getProducts();
  }

  toggleLanguage() {
    this.languageService.toggleLanguage();
  }

  get currentLanguage(): string {
    return this.languageService.currentLang;
  }

  get filteredProducts(): Product[] {
    return this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            product.category.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === 'all' || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  async confirmDelete(product: Product) {
    const alert = await this.alertController.create({
      header: this.languageService.translate('COMMON.CONFIRM_DELETE_TITLE'),
      message: this.languageService.translate('COMMON.CONFIRM_DELETE_MSG', { name: product.name }),
      buttons: [
        {
          text: this.languageService.translate('COMMON.CANCEL'),
          role: 'cancel'
        },
        {
          text: this.languageService.translate('COMMON.DELETE'),
          role: 'destructive',
          handler: () => {
            if (product.id) {
              this.deleteProduct(product.id);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id);
    this.loadProducts();
    this.showToast(this.languageService.translate('COMMON.DELETE_SUCCESS'));
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    });
    await toast.present();
  }

  getStatusBadgeColor(status: string): string {
    switch (status) {
      case 'available': return 'success';
      case 'low_stock': return 'warning';
      case 'out_of_stock': return 'danger';
      default: return 'medium';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'available': return this.languageService.translate('STATUS.AVAILABLE');
      case 'low_stock': return this.languageService.translate('STATUS.LOW_STOCK');
      case 'out_of_stock': return this.languageService.translate('STATUS.OUT_OF_STOCK');
      default: return status;
    }
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
