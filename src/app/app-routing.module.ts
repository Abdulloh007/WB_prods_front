import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductsComponent } from './update-products/update-products.component';

const routes: Routes = [
  {path: '', component: ProductsComponent},
  {path: 'create-product', component: CreateProductComponent},
  {path: 'update-product/:productId', component: UpdateProductsComponent},
  {path: '**', component: ProductsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
