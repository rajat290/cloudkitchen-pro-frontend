import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory-create',
  imports: [ReactiveFormsModule],
  templateUrl: './inventory-create.html',
})
export class InventoryCreateComponent {
  itemForm;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      unit: ['', Validators.required],
      expiryDate: ['', Validators.required],
      costPerUnit: [0, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.itemForm.invalid) return;

    this.api.addInventoryItem(this.itemForm.value).subscribe({
      next: () => {
        alert('Item added successfully!');
        this.router.navigate(['/inventory']);
      },
      error: () => alert('Failed to add item'),
    });
  }
}
