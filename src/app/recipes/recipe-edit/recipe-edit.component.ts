import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.html',
  styleUrls: ['./recipe-edit.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class RecipeEditComponent implements OnInit {
  id!: string;
  private fb: FormBuilder;

  constructor(
    private route: ActivatedRoute,
    fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.fb = fb;
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this.fb.array([]),
      steps: this.fb.array([]),
    });
  }

  recipeForm: any;

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  get steps() {
    return this.recipeForm.get('steps') as FormArray;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.api.getRecipeById(this.id).subscribe((res: any) => {
      this.recipeForm.patchValue({
        name: res.name,
        description: res.description,
      });
      res.ingredients.forEach((i: string) => this.ingredients.push(this.fb.control(i)));
      res.steps.forEach((s: string) => this.steps.push(this.fb.control(s)));
    });
  }

  onSubmit() {
    if (this.recipeForm.invalid) return;
    this.api.updateRecipe(this.id, this.recipeForm.value).subscribe({
      next: () => {
        alert('Recipe updated successfully!');
        this.router.navigate(['/recipes']);
      },
      error: () => alert('Failed to update recipe'),
    });
  }
}
