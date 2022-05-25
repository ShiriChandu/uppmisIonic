import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastserviceService {

  constructor(private toastController: ToastController) { }

  async presentSuccess(infoMessage: string) {
    const toast = await this.toastController.create({
      message: infoMessage,
      duration: 2000,
      color: 'success'

        });
    toast.present();
  }
    async presentError(infoMessage: string) {
    const toast = await this.toastController.create({
      message: infoMessage,
      duration: 2000,
      color: 'danger'

        });
    toast.present();
  }
}
