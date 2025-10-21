import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeCreateComponent } from './recipes/recipe-create/recipe-create.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeViewComponent } from './recipes/recipe-view/recipe-view.component';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';
import { InventoryCreateComponent } from './inventory/inventory-create/inventory-create.component';
import { InventoryEditComponent } from './inventory/inventory-edit/inventory-edit.component';
import { NotFound } from './not-found/not-found.component';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Protected routes
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'recipes', component: RecipeListComponent, canActivate: [AuthGuard] },
  { path: 'recipes/create', component: RecipeCreateComponent, canActivate: [AuthGuard] },
  { path: 'recipes/edit/:id', component: RecipeEditComponent, canActivate: [AuthGuard] },
  { path: 'recipes/:id', component: RecipeViewComponent, canActivate: [AuthGuard] },
  { path: 'inventory', component: InventoryListComponent, canActivate: [AuthGuard] },
  { path: 'inventory/create', component: InventoryCreateComponent, canActivate: [AuthGuard] },
  { path: 'inventory/edit/:id', component: InventoryEditComponent, canActivate: [AuthGuard] },

  // Not Found
  { path: '**', component: NotFound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export { routes };
