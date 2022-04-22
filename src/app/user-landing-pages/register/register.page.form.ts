import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";

export class RegisterPageForm {

    private formBuilder: FormBuilder;
    private form : FormGroup;

    constructor(formBuilder: FormBuilder){
        this.formBuilder = formBuilder;
        this.form = this.createForm()
    }
    
    createForm() : FormGroup {
        let form = this.formBuilder.group({
            name: ['', [Validators.required]] ,
            password: ['', [Validators.required, Validators.minLength(6)]],         
            email: ['', [Validators.required, Validators.email]],       
            password_confirmation: [''],       
        });

        form.get('password_confirmation').setValidators(passwordConfirmation(form))
   return form
    }

    getForm() : FormGroup{
        return this.form
    }
}


function passwordConfirmation(form:FormGroup) : ValidatorFn {
    const password = form.get('password')
    const password_confirmation = form.get('password_confirmation')

    const validator = () => {
        return password.value == password_confirmation.value ? null : {isntMatching : true}
    }

    return validator
    
}