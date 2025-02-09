import { Routes } from '@angular/router';
// Import child routes
import { authRoutes } from './auth-routes';
import { customerRoutes } from './customer-routing.module';
import { productRoutes } from './products-routing.module';

// Import Components
import { NotFoundComponent } from '../shared/components/notfound';
import { mainlayoutRoutes } from './mainlayout.routes';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  ...authRoutes,
  ...customerRoutes,
  ...productRoutes,
  ...mainlayoutRoutes,
  { path: '**', component: NotFoundComponent }
];
