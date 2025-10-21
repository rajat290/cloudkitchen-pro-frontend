export interface InventoryItem {
  _id?: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate?: string;
  costPerUnit?: number;
  createdAt?: string;
}
