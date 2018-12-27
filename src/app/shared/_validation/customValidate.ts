import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

export function dateValidation(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const date = new Date(control.value)
        const todayDate = new Date();
        return new Date(date) < todayDate ? { 'dateValidation': {value: control.value}} : null;
    };
}