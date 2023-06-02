import { Category } from "@/models/category";

export interface GetSingleCategoryResDto extends Category {
  ratio: number;
}
