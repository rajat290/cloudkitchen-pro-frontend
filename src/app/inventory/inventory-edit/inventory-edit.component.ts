import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './inventory-edit.html',
})
export class InventoryEditComponent implements OnInit {
  id!: string;
  itemForm;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      unit: ['', Validators.required],
      expiryDate: ['', Validators.required],
      costPerUnit: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.api.getInventoryById(this.id).subscribe((res: any) => {
      this.itemForm.patchValue(res);
    });
  }

  onSubmit() {
    if (this.itemForm.invalid) return;

    this.api.updateInventoryItem(this.id, this.itemForm.value).subscribe({
      next: () => {
        alert('Item updated successfully!');
        this.router.navigate(['/inventory']);
      },
      error: () => alert('Failed to update item'),
    });
  }
}
