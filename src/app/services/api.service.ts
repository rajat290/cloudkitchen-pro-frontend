import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:5000/api'; // backend base URL

  constructor(private http: HttpClient) {}

 // Helper: Auth header
  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  // ====== AUTH ======
  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  loginUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
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
  getInventory() {
  return this.http.get(`${this.baseUrl}/inventory`);
}

getInventoryById(id: string) {
  return this.http.get(`${this.baseUrl}/inventory/${id}`);
}

addInventoryItem(data: any) {
  return this.http.post(`${this.baseUrl}/inventory`, data);
}

updateInventoryItem(id: string, data: any) {
  return this.http.put(`${this.baseUrl}/inventory/${id}`, data);
}

deleteInventoryItem(id: string) {
  return this.http.delete(`${this.baseUrl}/inventory/${id}`);
}
}
