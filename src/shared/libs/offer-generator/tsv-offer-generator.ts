import { OfferGenerator } from "./offer-generator.interface.js";
import { MockServerData } from "../../types/index.js";
import { getRandomItem, getRandomItems } from "../../helpers/index.js";

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.title);
    const type = getRandomItem<string>(this.mockData.type);
    const price = getRandomItem<string>(this.mockData.price);
    const latitude = getRandomItem<number>(this.mockData.latitude);
    const longitude = getRandomItem<number>(this.mockData.longitude);
    const zoom = getRandomItem<number>(this.mockData.zoom);
    const isFavorite = getRandomItem<boolean>(this.mockData.isFavorite);
    const isPopular = getRandomItem<boolean>(this.mockData.isPopular);
    const rating = getRandomItem<number>(this.mockData.rating);
    const description = getRandomItem<string>(this.mockData.description);
    const goods = getRandomItems<string>(this.mockData.goods).join("; ");
    const images = getRandomItems<string>(this.mockData.images).join("; ");
    const phone = getRandomItem<string>(this.mockData.phone);
    const email = getRandomItem<string>(this.mockData.email);
    const telegram = getRandomItem<string>(this.mockData.telegram);

    return [
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
    ].join("\t");
  }
}
