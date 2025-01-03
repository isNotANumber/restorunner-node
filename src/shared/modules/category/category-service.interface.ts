import { DocumentType } from "@typegoose/typegoose";

import { CreateCategoryDto } from "./dto/create-category.dto.js";
import { CategoryEntity } from "./category.entity.js";

export interface CategoryService {
  create(dto: CreateCategoryDto): Promise<DocumentType<CategoryEntity>>;
  findByCategoryName(
    categoryName: string
  ): Promise<DocumentType<CategoryEntity> | null>;
  findByCategoryNameOrCreate(
    categoryName: string,
    dto: CreateCategoryDto
  ): Promise<DocumentType<CategoryEntity>>;
  find(): Promise<DocumentType<CategoryEntity>[]>;
}
