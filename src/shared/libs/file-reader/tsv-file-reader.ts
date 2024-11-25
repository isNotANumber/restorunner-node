import { readFileSync } from "node:fs";

import { FileReader } from "./file-reader.interface.js";
import { OfferType, Location, Contacts } from "../../types/index.js";

export class TSVFileReader implements FileReader {
  private rawData = "";

  constructor(private readonly filename: string) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error("File was not read");
    }
  }

  private parseRawDataToOffers(): OfferType[] {
    return this.rawData
      .split("\n")
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): OfferType {
    const [
      id,
      title,
      type,
      price,
      latitude,
      longitude,
      zoom,
      isFavorite,
      isPopular,
      rating,
      description,
      goods,
      images,
      phone,
      email,
      telegram,
    ] = line.split("\t");

    return {
      id,
      title,
      type,
      price,
      location: this.parseLocation(latitude, longitude, zoom),
      isFavorite: Boolean(isFavorite),
      isPopular: Boolean(isPopular),
      rating: parseInt(rating),
      description,
      goods: this.parseGoods(goods),
      images: this.parseImages(images),
      contacts: this.parseContacts(phone, email, telegram),
    };
  }

  private parseLocation(
    latitude: string,
    longitude: string,
    zoom: string
  ): Location {
    return {
      latitude: parseInt(latitude),
      longitude: parseInt(longitude),
      zoom: parseInt(zoom),
    };
  }

  private parseGoods(goodsString: string): string[] {
    return goodsString.split("; ");
  }

  private parseImages(imagesString: string): string[] {
    return imagesString.split("; ");
  }

  private parseContacts(
    phone: string,
    email: string,
    telegram: string
  ): Contacts {
    return { phone, email, telegram };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: "utf8" });
  }

  public toArray(): OfferType[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
