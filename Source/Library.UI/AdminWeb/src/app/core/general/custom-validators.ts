import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function noSpaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasSpace = (control.value || '').indexOf(' ') >= 0;
    return !hasSpace ? null : { noSpace: true };
  };
}