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
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, trashOutline, searchOutline, cubeOutline, filterOutline, checkmarkCircleOutline, warningOutline, alertCircleOutline } from 'ionicons/icons';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

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
    IonBackButton
  ]
})
export class ProductListPage implements OnInit {
  searchTerm: string = '';
  selectedCategory: string = 'all';
  products: Product[] = [];

  constructor(
    private productService: ProductService,
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
      alertCircleOutline
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
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar "${product.name}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
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
    this.showToast('Producto eliminado del inventario.');
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
      case 'available': return 'Disponible';
      case 'low_stock': return 'Poco Stock';
      case 'out_of_stock': return 'Agotado';
      default: return status;
    }
  }
}
