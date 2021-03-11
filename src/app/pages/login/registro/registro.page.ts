import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ErroresService } from 'src/app/services/errores.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  imagenUsuario: string = 'assets/img/img1.png';
  cargando = false;
  constructor(private loginService: AuthService,
              private navCtrl: NavController,
              private erroresService: ErroresService,
              private storage: AngularFireStorage) { }

  ngOnInit() {
  }



  registrarse(username: string, email: string, password: string){
    this.erroresService.mostrarCargando();
    this.loginService.RegisterUser(email, password)
    .then((res: any) => {
      // Do something here
      this.loginService.SendVerificationMail();
      this.navCtrl.navigateRoot(['/correo/registro/verificar']);
      this.erroresService.cerrarAlerta();
      return res.user.updateProfile({
        displayName: username,
        photoURL: this.imagenUsuario
      });
      
    }).catch((error) => {
      this.erroresService.mostrarError(error.message);
    });
  }

  async seleccionarImagen() {
      const image = await Camera.getPhoto({
        quality: 100,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt
      });
      this.cargando = true;
      console.log(this.cargando)
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      let metadata = {
        contentType: 'image/jpeg'
      };
      let idFoto: string = this.loginService.obtenerIDAleatorio();

      const task = this.storage.ref(`user/${idFoto}.jpeg`).putString(image.base64String, 'base64', metadata).then((savedPicture) => {
       
        this.storage.ref(`user/${idFoto}.jpeg`).getDownloadURL().subscribe((url) => {
            this.imagenUsuario = url.toString();
            this.cargando = false;
        })
      })
    }

}
