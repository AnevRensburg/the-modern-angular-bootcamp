import { FormControl } from "@angular/forms";

export class DateFormControl extends FormControl {
    override setValue(value: string | null, options: any) {

        if (!value) {
            super.setValue('', { ...options, emitModelToViewChange: true });
            return;
        }

        // If value isn't a number or slash, don't let character in
        if (value.match(/[^0-9|\/]/gi)) {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
            return;
        }

        // If value length is greater than 5, don't let another character in
        if (value.length > 5) {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
            return;
        }

        // If value that user wants to enter is equal to 2 and stored value length is equal to 3, let user enter value
        if (value.length === 2 && this.value.length === 3) {
            super.setValue(value, { ...options, emitModelToViewChange: true });
            return;
        }

        // If value length is equal to 2, add a slash
        if (value.length === 2) {
            super.setValue(value + '/', { ...options, emitModelToViewChange: true });
            return;
        }

        // If value length is equal to 2 and the last character is a slash, remove the slash
        super.setValue(value, { ...options, emitModelToViewChange: true });
        
    }
}