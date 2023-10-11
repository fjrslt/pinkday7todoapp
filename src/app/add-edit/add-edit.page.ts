import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TodoServiceService } from '../services/todo-service/todo-service.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.page.html',
  styleUrls: ['./add-edit.page.scss'],
})
export class AddEditPage implements OnInit {
  toDo: string = "";
  labelText = "";
  toDoID : any = 0;
  constructor(
    private navController : NavController,
    private todoService : TodoServiceService,
    private toastController : ToastController,
    private route: ActivatedRoute,
  ) { }

  ionViewWillEnter(){
    if(this.route.snapshot.paramMap.get("id")){
      this.labelText = "Edit ToDo";
      this.toDoID = this.route.snapshot.paramMap.get("id");
      this.toDo = this.todoService.getTodoByIndex(this.toDoID);
    }else{
      this.labelText = "Add ToDo";
    }
  }

  ngOnInit() {
  }

  back(){
    this.navController.navigateBack(['home']);
  }

  save(){
    if(this.route.snapshot.paramMap.get("id")){
      this.todoService.editTodo(this.toDoID, this.toDo);
      this.toDo = "";
      this.presentSaved();
      this.back();
    }else{
      this.todoService.addTodo(this.toDo);
      this.toDo = "";
      this.presentSaved();
      this.back();
    }
  }

  async presentSaved(){
    const toast = await this.toastController.create({
      message: 'ToDo saved sucessfully.',
      duration: 2500,
      position: 'bottom'
    });
    await toast.present();
  }
}
