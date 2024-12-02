import { inject, injectable } from "inversify";
import { Request, Response } from "express";

import { OfferService } from "./offer-service.interface.js";
import { ParamOfferId } from "./type/param-offerid.type.js";
import {
  BaseController,
  DocumentExistsMiddleware,
  ValidateObjectIdMiddleware,
  PrivateRouteMiddleware,
  HttpMethod,
} from "../../libs/rest/index.js";
import { Component } from "../../types/index.js";
import { Logger } from "../../libs/logger/index.js";
import { fillDTO } from "../../helpers/index.js";
import { OfferRdo } from "./rdo/offer.rdo.js";
import { UpdateOfferDto } from "./dto/update-offer.dto.js";

@injectable()
export default class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info("Register routes for OfferController");
    this.addRoute({ path: "/", method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: "/favorites",
      method: HttpMethod.Get,
      handler: this.getFavoritesOffers,
      middlewares: [new PrivateRouteMiddleware()],
    });
    this.addRoute({
      path: "/:offerId",
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware("offerId"),
        new DocumentExistsMiddleware(this.offerService, "Offer", "offerId"),
      ],
    });
    this.addRoute({
      path: "/:offerId",
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware("offerId"),
        new DocumentExistsMiddleware(this.offerService, "Offer", "offerId"),
      ],
    });
  }

  public async show(
    { params }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async index(_req: Request, res: Response) {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async getFavoritesOffers(_req: Request, res: Response) {
    const offers = await this.offerService.findFavorites();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async update(
    { body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(
      params.offerId,
      body
    );

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }
}
