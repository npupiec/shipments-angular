import { Injectable } from '@angular/core';

// 3rd Party
import { UUID } from 'angular2-uuid';

@Injectable()
export class UuidService {

  public generate(): string {
    return UUID.UUID();
  }
}