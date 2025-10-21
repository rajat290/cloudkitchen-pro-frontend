import { Routes } from '@angular/router';
import { Login } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeCreateComponent } from './recipes/recipe-create/recipe-create.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeViewComponent } from './recipes/recipe-view/recipe-view.component';





export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'create-recipe', component: RecipeCreateComponent },
  { path: 'edit-recipe/:id', component: RecipeEditComponent },
  { path: 'recipe/:id', component: RecipeViewComponent },
];
