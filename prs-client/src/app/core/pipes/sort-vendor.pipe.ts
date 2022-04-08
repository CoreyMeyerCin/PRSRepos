import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortVendor'
})
export class SortVendorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
