import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoadingController, MenuController } from '@ionic/angular';
import { alertController } from '@ionic/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup

  
  constructor(
    public menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private loadingController: LoadingController
     ) {

      }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm()
  }



  async signin(){
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.login(this.form.value).subscribe(
      async (res) => {
      
        await loading.dismiss()
        this.router.navigateByUrl('/home', {replaceUrl:true})
      },
      async (res) => {
      
        await loading.dismiss()
        const alert = await alertController.create({
          header: 'Signin Failed',
          message : res.error.message,
          buttons : ['OK']
        })
 
        await alert.present()
      }
    )
  }
ionViewWillEnter() {
    this.menuCtrl.enable(false);  //disable sidemenu
   }
}
