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
  IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, trashOutline, searchOutline, cubeOutline, filterOutline, checkmarkCircleOutline, warningOutline, alertCircleOutline } from 'ionicons/icons';
import { Product } from '../../models/product.model';

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

  products: Product[] = [
    {
      id: '1',
      name: 'Laptop Pro 15"',
      category: 'Electrónica',
      price: 1299.99,
      stock: 12,
      description: 'Computadora portátil de alto rendimiento con procesador de última generación.',
      status: 'available'
    },
    {
      id: '2',
      name: 'Teclado Mecánico RGB',
      category: 'Accesorios',
      price: 89.50,
      stock: 4,
      description: 'Teclado mecánico con luces RGB personalizables y switches silenciosos.',
      status: 'low_stock'
    },
    {
      id: '3',
      name: 'Monitor UltraWide 34"',
      category: 'Electrónica',
      price: 450.00,
      stock: 0,
      description: 'Monitor curvo alta resolución ideal para productividad y diseño.',
      status: 'out_of_stock'
    },
    {
      id: '4',
      name: 'Silla Ergonómica Pro',
      category: 'Mobiliario',
      price: 249.99,
      stock: 8,
      description: 'Silla ergonómica para oficina con soporte lumbar ajustable.',
      status: 'available'
    }
  ];

  constructor() {
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

  ngOnInit() {}

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
