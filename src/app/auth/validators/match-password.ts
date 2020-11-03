import { Validator, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class MatchPassword implements Validator {
  validate(group: FormGroup): any {
    const { password, passwordConfirmation } = group.value;
    if (password === passwordConfirmation) {
      return null;
    } else {
      return { passwordNotMatch: true };
    }
  }
}
