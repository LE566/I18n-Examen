import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonBadge,
  IonSearchbar,
  IonChip,
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
    IonLabel,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonBadge,
    IonSearchbar,
    IonChip,
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

  async confirmDelete(product: Product) {
    if (!product.id) return;

    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar el producto "${product.name}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.deleteProduct(product.id!);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteProduct(id: string) {
    try {
      this.productService.deleteProduct(id);
      this.loadProducts();

      const toast = await this.toastController.create({
        message: 'Producto eliminado con éxito.',
        duration: 2000,
        color: 'success',
        position: 'bottom'
      });
      await toast.present();
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ocurrió un error al intentar eliminar el producto.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }

  get filteredProducts(): Product[] {
    return this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            product.category.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === 'all' || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
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
