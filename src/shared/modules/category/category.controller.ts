import { inject, injectable } from "inversify";
import { Request, Response } from "express";

import {
  BaseController,
  HttpMethod,
  RequestQuery,
} from "../../libs/rest/index.js";
import { Logger } from "../../libs/logger/index.js";
import { Component } from "../../types/index.js";
import { CategoryService } from "./category-service.interface.js";
import { fillDTO } from "../../helpers/index.js";
import { CategoryRdo } from "./rdo/category.rdo.js";
import { OfferRdo, OfferService } from "../offer/index.js";
import { ParamCategoryId } from "./type/param-categoryid.type.js";

@injectable()
export class CategoryController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CategoryService)
    private readonly categoryService: CategoryService,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info("Register routes for CategoryController…");

    this.addRoute({ path: "/", method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: "/:categoryId/offers",
      method: HttpMethod.Get,
      handler: this.getOffersFromCategory,
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const categories = await this.categoryService.find();
    const responseData = fillDTO(CategoryRdo, categories);
    this.ok(res, responseData);
  }

  public async getOffersFromCategory(
    { params, query }: Request<ParamCategoryId, unknown, unknown, RequestQuery>,
    res: Response
  ): Promise<void> {
    const offers = await this.offerService.findByCategoryId(
      params.categoryId,
      query.limit
    );
    this.ok(res, fillDTO(OfferRdo, offers));
  }
}
