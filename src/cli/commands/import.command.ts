import { Command } from "./command.interface.js";
import { TSVFileReader } from "../../shared/libs/file-reader/index.js";
import { Offer } from "../../shared/types/index.js";
import { getErrorMessage, getMongoURI } from "../../shared/helpers/index.js";
import {
  DefaultOfferService,
  OfferModel,
  OfferService,
} from "../../shared/modules/offer/index.js";
import {
  DatabaseClient,
  MongoDatabaseClient,
} from "../../shared/libs/database-client/index.js";
import { Logger } from "../../shared/libs/logger/index.js";
import { ConsoleLogger } from "../../shared/libs/logger/console.logger.js";
import { DEFAULT_DB_PORT } from "./command.constant.js";

export class ImportCommand implements Command {
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;

  constructor() {
    this.onImportedOffer = this.onImportedOffer.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return "--import";
  }

  private async onImportedOffer(offer: Offer, resolve: () => void) {
    await this.saveOffer(offer);
    resolve();
  }

  private async saveOffer(offer: Offer) {
    await this.offerService.create({
      title: offer.title,
      type: offer.type,
      price: offer.price,
      latitude: offer.location.latitude,
      longitude: offer.location.longitude,
      zoom: offer.location.zoom,
      isFavorite: offer.isFavorite,
      isPopular: offer.isPopular,
      rating: offer.rating,
      description: offer.description,
      goods: offer.goods,
      images: offer.images,
      phone: offer.contacts.phone,
      email: offer.contacts.email,
      telegram: offer.contacts.telegram,
    });
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    dbname: string
  ): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on("line", this.onImportedOffer);
    fileReader.on("end", this.onCompleteImport);

    try {
      fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
