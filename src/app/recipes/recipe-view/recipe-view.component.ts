import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.html',
  styleUrls: ['./recipe-view.css'],
  imports: [CommonModule],
})
export class RecipeViewComponent implements OnInit {
  recipe: any;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.api.getRecipeById(id).subscribe((res: any) => (this.recipe = res));
  }
}
