export type ProductType = 'purchase' | 'subscription';
export type FulfillmentType = 'instant' | 'WEBHOOK';
export type ProductStatus = 'draft' | 'active' | 'inactive' | 'pending_review';
export type CreatorType = 'game' | 'user';

export interface Product {
  _id: string;
  gameId: string;
  environment: string;
  type: ProductType;
  creatorType: CreatorType;
  status: ProductStatus;
  name: string;
  description: string;
  price: number;
  metadata: {
    idempotencyKey: string;
    [key: string]: any;
  };
  perUserLimit: number;
  isVisible: boolean;
  isPriceVisible: boolean;
  forSale: boolean;
  createdAt: string;
  updatedAt: string;
  fulfillmentType: FulfillmentType;
  paymentMethods: string[];
  category?: string;
  content?: string;
  userRef?: string;
  imageUrl?: string;
}

export interface Purchase {
  id: string;
  userRef: string;
  productId: string;
  amount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export interface ListProductsRequest {
  /** Category filter */
  category?: string;
}

export interface ListProductsResponse {
  /** List of products */
  products: Product[];
}

export interface CreateProductRequest {
  name: string;
  type: ProductType;
  fulfillmentType: FulfillmentType;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  perUserLimit?: number;
  metadata?: {
    [key: string]: any;
  };
  planId?: string;
}

export type CreateProductResponse = Product;

export interface CreateUGCProductRequest {
  name: string;
  type: ProductType;
  fulfillmentType: FulfillmentType;
  description: string;
  price: number;
  content: string;
  metadata?: {
    [key: string]: any;
  };
}

export type CreateUGCProductResponse = Product;

export interface SubmitProductForReviewRequest {
  userRef: string;
  productId: string;
}

export type SubmitProductForReviewResponse = Product;

export interface ReviewProductRequest {
  userRef: string;
  productId: string;
  decision: string;
}

export type ReviewProductResponse = Product;

export interface ListCreatorProductsRequest {
  userRef: string;
}

export interface ListCreatorProductsResponse {
  /** List of creator products */
  products: Product[];
}

export interface InitiatePurchaseRequest {
  userRef: string;
  productId: string;
  amount: number;
  paymentMethod: string;
}

export interface InitiatePurchaseResponse {
  /** Initiated purchase */
  purchase: Purchase;
}

export interface GetPurchaseDetailsRequest {
  purchaseId: string;
}

export interface GetPurchaseDetailsResponse {
  /** Purchase details */
  purchase: Purchase;
}

export interface UpdateProductSaleStateRequest {
  productId: string;
  forSale: boolean;
}

export type UpdateProductSaleStateResponse = Product;
