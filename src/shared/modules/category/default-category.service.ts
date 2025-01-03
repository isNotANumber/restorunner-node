import { inject, injectable } from "inversify";
import { DocumentType, types } from "@typegoose/typegoose";

import { CategoryService } from "./category-service.interface.js";
import { Component } from "../../types/index.js";
import { Logger } from "../../libs/logger/index.js";
import { CategoryEntity } from "./category.entity.js";
import { CreateCategoryDto } from "./dto/create-category.dto.js";

@injectable()
export class DefaultCategoryService implements CategoryService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CategoryModel)
    private readonly categoryModel: types.ModelType<CategoryEntity>
  ) {}

  public async create(
    dto: CreateCategoryDto
  ): Promise<DocumentType<CategoryEntity>> {
    const result = await this.categoryModel.create(dto);
    this.logger.info(`New category created: ${dto.name}`);
    return result;
  }

  public async findByCategoryName(
    categoryName: string
  ): Promise<DocumentType<CategoryEntity> | null> {
    return this.categoryModel.findOne({ name: categoryName }).exec();
  }

  public async findByCategoryNameOrCreate(
    categoryName: string,
    dto: CreateCategoryDto
  ): Promise<DocumentType<CategoryEntity>> {
    const existedCategory = await this.findByCategoryName(categoryName);

    if (existedCategory) {
      return existedCategory;
    }

    return this.create(dto);
  }

  public async find(): Promise<DocumentType<CategoryEntity>[]> {
    return this.categoryModel
      .aggregate([
        {
          $lookup: {
            from: "offers",
            let: { categoryId: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$$categoryId", "$category"] } } },
              { $project: { _id: 1 } },
            ],
            as: "offers",
          },
        },
        {
          $addFields: {
            id: { $toString: "$_id" },
            offerCount: { $size: "$offers" },
          },
        },
        { $unset: "offers" },
      ])
      .exec();
  }
}
