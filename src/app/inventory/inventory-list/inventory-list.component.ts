import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { InventoryItem } from '../../models/inventory.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inventory-list',
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './inventory-list.html',
  styleUrls: ['./inventory-list.css'],
})
export class InventoryListComponent implements OnInit {
  items: InventoryItem[] = [];
  filteredItems: InventoryItem[] = [];
  loading = true;
  error = '';
  search = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems() {
    this.api.getInventory().subscribe({
      next: (res: any) => {
        this.items = res;
        this.filteredItems = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load inventory.';
        this.loading = false;
      },
    });
  }

  deleteItem(id: string) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.api.deleteInventoryItem(id).subscribe({
        next: () => this.fetchItems(),
        error: () => alert('Error deleting item'),
      });
    }
  }

  isExpired(date: string): boolean {
    return new Date(date) < new Date();
  }

  isNearExpiry(date: string): boolean {
    const today = new Date();
    const expiry = new Date(date);
    const diffDays = (expiry.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return diffDays > 0 && diffDays <= 7;
  }

  filterItems() {
    this.filteredItems = this.items.filter((item) =>
      item.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  editItem(id: string) {
    this.router.navigate(['/inventory/edit', id]);
  }
}
