import { inject, injectable } from "inversify";
import { DocumentType, types } from "@typegoose/typegoose";

import { OfferService } from "./offer-service.interface.js";
import { Component } from "../../types/index.js";
import { Logger } from "../../libs/logger/index.js";
import { OfferEntity } from "./offer.entity.js";
import { CreateOfferDto } from "./dto/create-offer.dto.js";
import { UpdateOfferDto } from "./dto/update-offer.dto.js";
import { DEFAULT_OFFER_COUNT } from "./offer.constant.js";

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find().populate(["categories"]).exec();
  }

  public async findByCategoryId(
    categoryId: string,
    count?: number
  ): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .find({ category: categoryId }, {}, { limit })
      .populate(["userId", "categories"])
      .exec();
  }

  public async updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate(["userId", "categories"])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }
}
