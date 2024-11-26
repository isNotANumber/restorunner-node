import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: "offers",
    timestamps: true,
  },
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop()
  public type!: string;

  @prop()
  public price!: string;

  @prop({ type: () => Number })
  public latitude: number;

  @prop({ type: () => Number })
  public longitude: number;

  @prop({ type: () => Number })
  public zoom: number;

  @prop()
  public isFavorite: boolean;

  @prop()
  public isPopular: boolean;

  @prop({ type: () => Number })
  public rating: number;

  @prop({ trim: true })
  public description: string;

  @prop({ type: () => [String] })
  public goods: string[];

  @prop({ type: () => [String] })
  public images: string[];

  @prop()
  public phone: string;

  @prop()
  public email: string;

  @prop()
  public telegram: string;
}

export const OfferModel = getModelForClass(OfferEntity);
