export interface Recipe {
  _id?: string;
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  createdAt?: string;
}
