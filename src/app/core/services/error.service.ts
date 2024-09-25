import {ErrorHandler, Injectable, isDevMode} from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    if (isDevMode()) {
      console.log(error);
      return;
    }
  }
}
