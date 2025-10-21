import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Recipe } from '../../models/recipe.model';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.html',
  styleUrls: ['./recipe-list.css'],
  imports: [CommonModule, DatePipe],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  loading = true;
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchRecipes();
  }

  fetchRecipes() {
    this.api.getRecipes().subscribe({
      next: (res: any) => {
        this.recipes = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to fetch recipes.';
        this.loading = false;
      },
    });
  }

  deleteRecipe(id: string) {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.api.deleteRecipe(id).subscribe({
        next: () => this.fetchRecipes(),
        error: () => alert('Error deleting recipe'),
      });
    }
  }

  viewRecipe(id: string) {
    this.router.navigate(['/recipes', id]);
  }

  editRecipe(id: string) {
    this.router.navigate(['/recipes/edit', id]);
  }
}
