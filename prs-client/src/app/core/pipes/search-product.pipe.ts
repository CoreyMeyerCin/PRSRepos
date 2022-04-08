import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/classes/product/product.class';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(products: Product[], searchCriteria: string=''): unknown {
    if(searchCriteria == '') { return products; }
    let substr = searchCriteria.toLowerCase();
    let selectedProducts: Product[] = [];
    for(let product of products) {
      if(product.id.toString().includes(substr)
        || product.partNbr.toLowerCase().includes(substr)
        || product.name.toLowerCase().includes(substr)
        || product.price.toString().includes(substr)
        || product.unit.toLowerCase().includes(substr)
        || product.photoPath.toLowerCase().includes(substr)
        || product.vendorId.toString().includes(substr)
        || product.vendor.name.toLowerCase().includes(substr)
        || product.vendor.code.toLowerCase().includes(substr)
        ) {
        selectedProducts.push(product);
        continue;
      }
    }
    return selectedProducts;
  }

}
