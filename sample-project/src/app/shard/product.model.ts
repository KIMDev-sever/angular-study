// 상품 통합 모델
export interface ProductModel {
    category_num:number;
    id: string;
    name?: string;
    price?: number;
    count?: number;
    date?: Date;
    images:string[];
}
export interface CategoryModel{
    name:string;
    category_num:number;
}