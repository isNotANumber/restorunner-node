import EventEmitter from "events";

import { FileReader } from "./file-reader.interface.js";
import { Offer, Location, Contacts } from "../../types/index.js";
import { createReadStream } from "fs";

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384;

  constructor(private readonly filename: string) {
    super();
  }

  private parseLineToOffer(line: string): Offer {
    const [
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

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: "utf8",
    });

    let remainingData = "";
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf("\n")) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);

        await new Promise((resolve) => {
          this.emit("line", parsedOffer, resolve);
        });
      }
    }

    this.emit("end", importedRowCount);
  }
}
