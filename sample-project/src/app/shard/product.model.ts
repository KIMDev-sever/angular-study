// 상품 통합 모델
export interface ProductModel {
    category_num: number;
    sub_category_num?: number;
    code: string;
    name?: string;
    price?: number;
    count?: number;
    date?: Date;
    images: string[];
    explan?: string;
    sellTrigger: boolean;
}
export interface CategoryModel {
    name: string;
    category_num: number;
    sub_category?: SubCategoryModel[];
}
export interface SubCategoryModel {
    name: string;
    sub_category_num: number;
}
