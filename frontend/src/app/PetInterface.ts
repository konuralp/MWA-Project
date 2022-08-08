export interface Pet {
  _id?: number;
  name: string;
  bio: string;
  category: string;
  gender: string;
  zipcode: string;
  state: string;
  location: [number, number];
  age: number;
  size: string;
  behavior: string;
  images: string[];
  available: boolean;
}
