import { DocumentType } from "@typegoose/typegoose";

import { CreateOfferDto } from "./dto/create-offer.dto.js";
import { UpdateOfferDto } from "./dto/update-offer.dto.js";
import { OfferEntity } from "./offer.entity.js";

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(): Promise<DocumentType<OfferEntity>[]>;
  findFavorites(): Promise<DocumentType<OfferEntity>[]>;
  updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null>;
  findByCategoryId(
    categoryId: string,
    count?: number
  ): Promise<DocumentType<OfferEntity>[]>;
  exists(documentId: string): Promise<boolean>;
}
