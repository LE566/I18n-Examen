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
  IonList,
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline, arrowBackOutline, checkmarkCircleOutline, alertCircleOutline, cubeOutline } from 'ionicons/icons';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

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
    private router: Router,
    private productService: ProductService,
    private toastController: ToastController,
    private alertController: AlertController
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
      const existingProduct = this.productService.getProductById(this.productId);
      if (existingProduct) {
        this.product = { ...existingProduct };
      } else {
        this.showErrorAlert('El producto no existe en el catálogo.');
        this.router.navigate(['/products']);
      }
    }
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
        this.isEditMode 
          ? 'Producto actualizado con éxito.' 
          : 'Producto guardado con éxito.'
      );
      this.router.navigate(['/products']);
    } catch (error) {
      await this.showErrorAlert('Ocurrió un error al intentar guardar el producto.');
    }
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
      header: 'Error',
      message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
}
