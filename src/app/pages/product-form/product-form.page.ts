import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  IonCard,
  IonCardContent,
  IonList
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline, arrowBackOutline, checkmarkCircleOutline, alertCircleOutline, cubeOutline } from 'ionicons/icons';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
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
    IonCard,
    IonCardContent,
    IonList
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
    private router: Router
  ) {
    addIcons({
      saveOutline,
      arrowBackOutline,
      checkmarkCircleOutline,
      alertCircleOutline,
      cubeOutline
    });
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.isEditMode = true;
      this.product = {
        id: this.productId,
        name: 'Teclado Mecánico RGB',
        category: 'Accesorios',
        price: 89.50,
        stock: 4,
        description: 'Teclado mecánico con luces RGB personalizables.',
        status: 'low_stock'
      };
    }
  }

  onSubmit(form: any) {
    if (form.invalid) {
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
      return;
    }
    console.log('Formulario enviado:', this.product);
    this.router.navigate(['/products']);
  }
}
