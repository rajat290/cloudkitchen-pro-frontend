import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3000/api'; // backend base URL

  constructor(private http: HttpClient) {}

  // ====== AUTH ======
  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  loginUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  // ====== DASHBOARD ======
  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard/stats`);
  }

  // ====== RECIPES ======
  getRecipes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipes`);
  }

  addRecipe(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/recipes`, data);
  }

  updateRecipe(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/recipes/${id}`, data);
  }

  deleteRecipe(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/recipes/${id}`);
  }

  getRecipeById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipes/${id}`);
  }

  // ====== INVENTORY ======
  getInventory(): Observable<any> {
    return this.http.get(`${this.baseUrl}/inventory`);
  }

  addInventoryItem(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/inventory`, data);
  }
}
