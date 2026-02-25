import { Routes } from '@angular/router';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products'
  },
  {
    path: 'products',
    component: ProductsPageComponent,
    title: 'Online Store | Products'
  },
  {
    path: 'about',
    component: AboutPageComponent,
    title: 'Online Store | About'
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];
