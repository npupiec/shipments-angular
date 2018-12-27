import { Pipe, PipeTransform } from '@angular/core';

import { Package } from '../_models/package.model';

@Pipe({ name: 'phoneFormat' })

export class PhoneFormatPipe implements PipeTransform {
  transform(value: Package[]) {
      
        const phoneFormat = value.slice(0,3) + ' ' + value.slice(3,6) + ' ' + value.slice(6,9);

    return phoneFormat
  }
}