import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Storage } from '@capacitor/storage';
import { ToastController } from '@ionic/angular';

import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/users.services';


export const IMAGE_KEY = 'image'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Schedules', url: '/schedules', icon: 'list' },
    { title: 'About', url: '/about-page', icon: 'information-circle' }
  ];
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public users: UserService,
    public toastController: ToastController
  ) {}

  imageUrl

  async ngOnInit() {
    await Storage.get({ key: IMAGE_KEY }).then( async (res) => {
      if (res && res.value){
          this.imageUrl = res.value
          
      } else{
        this.imageUrl = '../../assets/avatar.png'
        await Storage.set({key : IMAGE_KEY, value : this.imageUrl})

      }
  });
  }

  async logout() {
    await this.authService.logout()
    this.router.navigateByUrl('/', { replaceUrl: true })
  }

  async picture() {
    await Camera.requestPermissions()
    await Camera.checkPermissions().then( result => {
      if (result.camera == 'denied') {
        this.presentToast('Please allow camera and storage permissions of this appliction from your phone settings')
      } 
      
      if (result.photos == 'denied'){
        this.presentToast('Please allow camera and storage permissions of this appliction from your phone settings')
      }
    })   

    await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      saveToGallery : true
    }).then(async (image) => {
      if (image.webPath != '' || image.webPath != null || image.webPath != undefined) {
        this.imageUrl = image.webPath;
        await Storage.set({key : IMAGE_KEY, value : image.webPath})
        this.presentToast('Profile image successfull updated and saved to gallery')
      }
  
    })
  
  
    App.addListener('appRestoredResult', (state) =>{
      if (state.success) {
        console.log(state.data);
        this.imageUrl = state.data
      } else {
        console.log(state.error.message);
      }
    })


    console.log(this.imageUrl);

  };





  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }
}
