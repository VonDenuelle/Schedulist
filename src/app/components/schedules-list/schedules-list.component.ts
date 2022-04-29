import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { SchedulesPage } from 'src/app/menu/schedules/schedules.page';
import { AllSchedulesPage } from 'src/app/schedule-pages/all-schedules/all-schedules.page';
import { ScheduleService } from 'src/app/services/schedule.services';
import { ListModalComponent } from '../list-modal/list-modal.component';

@Component({
  selector: 'app-schedules-list',
  templateUrl: './schedules-list.component.html',
  styleUrls: ['./schedules-list.component.scss'],
})
export class SchedulesListComponent implements OnInit {

  @Input() time
  @Input() title
  @Input() id 
  @Input() toggle 
  @Input() index


  taskStatus : any
  constructor(
    public modalController: ModalController, 
    private router : Router,
    private schedule: ScheduleService,
    private loadingController: LoadingController,
    public toastController: ToastController,
    private schedules: SchedulesPage,  // call a function from schedules page, to remove an element without api calls
    private allSchedules: AllSchedulesPage
   ) {  }

  ngOnInit() {
    this.taskStatus = this.toggle == 0 ? true : false
  }

   
  edit(id){
    // add GET Parameter
    this.router.navigateByUrl('schedules/add-schedule?id='+id)
  }

  async delete(id, index){
    const loading = await this.loadingController.create();
    await loading.present();

    this.schedule.deleteSchedule(id)
      .subscribe(
        async (response : any) =>{

          /**
           * call function from schedules page to delete the list immediately
           * without making additional api calls
           * 
           * checks if from all-schedule or schedule page is the deleteFromList 
           * should be called
           *  */ 
           if (this.router.url == '/schedules/all-schedules') {
            console.log('all');
            await this.allSchedules.deleteFromList(index, id)  
            await loading.dismiss();
          } else {
            console.log('sched');
            await this.schedules.deleteFromList(index)  
            await loading.dismiss();
          }
      
          this.presentToast(response.message);
        },
        async (error) => {
          console.log(error);
          
        });

  }

  taskChange(id){
      console.log();   
  }

  
  // toast messages
    async presentToast(message) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000,
      });
      toast.present();
    }

  // present Modal
  async presentModal(title) {
    console.log(title);
    
    const modal = await this.modalController.create({
      component: ListModalComponent,
      cssClass: 'my-custom-class',
      componentProps: { 
        'title': title
      }
    });
    return await modal.present();
  }
}
