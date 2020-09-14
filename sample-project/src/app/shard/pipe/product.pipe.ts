import { Pipe, PipeTransform } from '@angular/core';
import { ProductModel, CategoryModel } from '../product.model';

@Pipe({
  name: 'convert_category'
})
export class ProductPipe implements PipeTransform {

  // tslint:disable-next-line:variable-name
  transform(value: number, _category_list: CategoryModel[]): string {
    if (_category_list.length > 0) {
      const category = _category_list.find((data) => {
        return value === data.category_num;
      });

      return category.name;
    }
  }

}
