import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { SchedulesPage } from 'src/app/menu/schedules/schedules.page';
import { AllSchedulesPage } from 'src/app/schedule-pages/all-schedules/all-schedules.page';
import { NotificationsService } from 'src/app/services/notifications.services';
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
  @Input() description
  @Input() vibrate
  @Input() ringtone
  @Input() priority
  @Input() toggle 
  @Input() day

  @Input() id 
  
  @Input() index


  taskStatus : any
  constructor(
    public modalController: ModalController, 
    private router : Router,
    private schedule: ScheduleService,
    private loadingController: LoadingController,
    public toastController: ToastController,
    private schedules: SchedulesPage,  // call a function from schedules page, to remove an element without api calls
    private allSchedules: AllSchedulesPage,
    public notifications : NotificationsService
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
            await this.notifications.setNotificationForToday() // recall notifications 
            await loading.dismiss();
          } else {
            console.log('sched');
            await this.schedules.deleteFromList(index)  
            await this.notifications.setNotificationForToday() // recall notifications 
            await loading.dismiss();
          }
      
          this.presentToast(response.message);
        },
        async (error) => {
          console.log(error);
          
        });

  }

  taskChange(id, event){
    console.log(event.detail.checked);
    console.log(id);
    
    this.schedule.updateToggleStatus(id, event.detail.checked)
      .subscribe(
        async (response : any) =>{
          console.log(response);
          await this.notifications.setNotificationForToday() // recall notifications since toggle has been changed
        },
        async (error) => {
          console.log(error);
        });
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
  async presentModal(title, description, priority, vibrate, ringtone, time, day) {
    console.log(title);
    
    const modal = await this.modalController.create({
      component: ListModalComponent,
      componentProps: { 
        'title': title,
        'description' : description,
        'priority' : priority == 0? true : false,
        'vibrate' : vibrate  == 0 ? true : false,
        'ringtone' : ringtone  == 0 ? true : false,
        'time' : time,
        'day' : day,
      }
    });
    return await modal.present();
  }
}
