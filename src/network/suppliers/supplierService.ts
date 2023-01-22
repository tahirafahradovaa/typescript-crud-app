import { BaseService } from "../base/BaseService";
import { Supplier } from "../../models/suppliers/SupplierService";

export class SupplierService extends BaseService<Supplier> {
  constructor() {
    super("/suppliers");
  }
}
