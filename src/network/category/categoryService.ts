import { BaseService } from "../base/BaseService";
import { Categories } from "../../models/categories/CategoriesService";

export class CategoriesService extends BaseService<Categories> {
  constructor() {
    super("/categories");
  }
}
