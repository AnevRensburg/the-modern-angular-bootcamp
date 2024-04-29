import { AbstractControl } from "@angular/forms";

export class CustomValidators {

    static addition(sourceOne: string, sourceTwo: string, target: string){
        return (form: AbstractControl) => {
            const firstNumber = form.value[sourceOne];
            const secondNumber = form.value[sourceTwo];
            const sum = form.value[target];
            if (firstNumber + secondNumber === parseInt(sum)) {
                return null;
            }
            return { addition: true };
        }
    }
}


/*

form.value = {
    a: 1,
    b: 2,
    answer: 3
}

const index = 'a';

form.value[index]

*/