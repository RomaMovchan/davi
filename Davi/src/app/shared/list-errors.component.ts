import { Component, Input } from '@angular/core';

import { Error } from './classes';

@Component({
  selector: 'list-errors',
  templateUrl: './list-errors.component.html'
})
export class ListErrorsComponent {
  formattedErrors: Array<string> = [];

  @Input()
  set errors(errorList: Error) {
    this.formattedErrors = [];
    if (errorList) {
      for (const field in errorList.detail) {
        this.formattedErrors.push(`${field} : ${errorList.detail[field]}`);
      }
    }
  };

  get errorList() { return this.formattedErrors; }


}
