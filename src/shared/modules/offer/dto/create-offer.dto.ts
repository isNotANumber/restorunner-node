export class CreateOfferDto {
  public title!: string;
  public type!: string;
  public price!: string;
  public latitude: number;
  public longitude: number;
  public zoom: number;
  public isFavorite: boolean;
  public isPopular: boolean;
  public rating: number;
  public description: string;
  public goods: string[];
  public images: string[];
  public phone: string;
  public email: string;
  public telegram: string;
}
