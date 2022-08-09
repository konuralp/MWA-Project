export interface Pet {
  _id?: string;
  name: string;
  bio: string;
  category: string;
  breed: string;
  gender: string;
  zip_code: string;
  state: string;
  location?: [number, number];
  latitude?: number;
  longitude?: number;
  age: number;
  size: string;
  behaviors: string;
  images: any[];
  available: boolean;
}
