export interface Product {
  id?: number;
  supplierId?: number;
  categoryId?: number;
  quantityPerUnit?: string;
  unitPrice: number;
  unitsInStock?: number;
  unitsOnOrder?: number;
  reorderLevel?: number;
  discontinued?: boolean;
  name: string;
  supplier?: {
    id: number;
    companyName: string;
    contactName: string;
    contactTitle: string;
    address: {
      street: string;
      city: string;
      region: string;
      postalCode: number;
      country: string;
      phone: string;
    };
  };
}
