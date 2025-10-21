import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.html',
  styleUrls: ['./recipe-create.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class RecipeCreateComponent {
  private fb: FormBuilder;

  constructor(fb: FormBuilder, private api: ApiService, private router: Router) {
    this.fb = fb;
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this.fb.array([this.fb.control('')]),
      steps: this.fb.array([this.fb.control('')]),
    });
  }

  recipeForm: any;

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  get steps() {
    return this.recipeForm.get('steps') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.control(''));
  }
  removeIngredient(i: number) {
    this.ingredients.removeAt(i);
  }

  addStep() {
    this.steps.push(this.fb.control(''));
  }
  removeStep(i: number) {
    this.steps.removeAt(i);
  }

  onSubmit() {
    if (this.recipeForm.invalid) return;

    this.api.addRecipe(this.recipeForm.value).subscribe({
      next: () => {
        alert('Recipe added successfully!');
        this.router.navigate(['/recipes']);
      },
      error: () => alert('Failed to add recipe'),
    });
  }
}
