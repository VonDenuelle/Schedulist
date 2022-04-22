import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {  LoadingController, MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RegisterPageForm } from './register.page.form';
import { alertController } from '@ionic/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup

  constructor(
    public menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private loadingController: LoadingController
    ) { }

  ngOnInit() {
    this.form = new RegisterPageForm(this.formBuilder).createForm()
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);  //disable sidemenu
   }

   async signup(){
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.register(this.form.value).subscribe(
      async (res) => {
        console.log(res);
        
        await loading.dismiss()
        this.router.navigateByUrl('/home', {replaceUrl:true})
      },
      async (res) => {
        await console.log(res);
      
        await loading.dismiss()
        const alert = await alertController.create({
          header: 'Signup Failed',
          message : res.error.message,
          buttons : ['OK']
        })
 
        await alert.present()
      }
    )
   }
}
