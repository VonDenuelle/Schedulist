import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class AddScheduleForm {

    private formBuilder: FormBuilder;

    constructor(formBuilder: FormBuilder){
        this.formBuilder = formBuilder;
    }
    
    createForm() : FormGroup {
        return this.formBuilder.group({
            title: ['', [Validators.required]] ,
            description: ['', [Validators.required]]       
        });
    }

}