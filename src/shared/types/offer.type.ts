import { Contacts } from "./contacts.type.js";
import { Location } from "./location.type.js";
import { Category } from "./category.type.js";

export type Offer = {
  title: string;
  category: Category;
  price: string;
  location: Location;
  isFavorite: boolean;
  isPopular: boolean;
  rating: number;
  description: string;
  goods: string[];
  images: string[];
  contacts: Contacts;
};
