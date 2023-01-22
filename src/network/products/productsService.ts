import { BaseService } from "../base/BaseService";
import { Product } from "../../models/product/ProductService";

export class ProductService extends BaseService<Product> {
  constructor() {
    super("/products");
  }
}
