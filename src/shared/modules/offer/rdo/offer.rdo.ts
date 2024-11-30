import { Expose, Type } from "class-transformer";
import { CategoryRdo } from "../../category/index.js";

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  @Type(() => CategoryRdo)
  public category: CategoryRdo;

  @Expose()
  public price!: string;

  @Expose()
  public latitude: number;

  @Expose()
  public longitude: number;

  @Expose()
  public zoom: number;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public isPopular: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public description: string;

  @Expose()
  public goods: string[];

  @Expose()
  public images: string[];

  @Expose()
  public phone: string;

  @Expose()
  public email: string;

  @Expose()
  public telegram: string;
}
