import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TodoServiceService } from '../services/todo-service/todo-service.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  toDos: any = [];
  constructor(
    private navController : NavController,
    private todoService : TodoServiceService,
    public alertController: AlertController,
    public toastController : ToastController
  ) {}

  ionViewWillEnter(){
    this.getTodos();
  }

  getTodos(){
    this.toDos = this.todoService.getTodos();
  }

  edit(index: number){
    this.navController.navigateForward(['add-edit', index]);
  }

  async confirmDelete(index: number){
    const alert = await this.alertController.create({
      header: 'Delete Todo?',
      subHeader: 'This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler : () => {
            console.log('Cancelled. ToDo not deleted.');
          }
        },{
          text: 'Delete',
          role: 'confirm',
          handler : () => {
            this.todoService.removeTodo(index);
            this.presentDeleted();
            this.toDos = this.todoService.getTodos();
          }
        }
      ],
    });
    await alert.present();
  }

  async presentDeleted(){
    const toast = await this.toastController.create({
      message: 'ToDo deleted sucessfully.',
      duration: 2500,
      position: 'bottom'
    });
    await toast.present();
  }

  addButton(){
    this.navController.navigateForward(['add-edit']);
  }



}
