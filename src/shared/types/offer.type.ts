import { Contacts } from "./contacts.type.js";
import { Location } from "./location.type.js";

export type Offer = {
  id: string;
  title: string;
  type: string;
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
