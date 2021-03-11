import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/core';
import { ModalController, NavController } from '@ionic/angular';
import { EventosService } from 'src/app/services/eventos.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.page.html',
  styleUrls: ['./crear-producto.page.scss'],
})
export class CrearProductoPage implements OnInit {

  @Input() idEvento: string = '';
  contadorImagenes = 0;

  errores: any = {
    nombre: false,
    precio: false,
    imagen: false
  }
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1.4,
    spaceBetween: 10
  };

  imagen1: string = "";
  subiendoImagen1 =false;
  imagen2: string = "";
  subiendoImagen2 = false;
  imagen3: string = "";
  subiendoImagen3 = false;

  constructor(private eventosService: EventosService,
              private modalCtrl: ModalController,
              private storage: AngularFireStorage,
              private navCtrl: NavController) {
               }
  mostrarSlide = false;
  ionViewDidEnter(): void {
    this.mostrarSlide= true;
  }

  ngOnInit() {
  }
  


  guardarProducto(nombre: string, precio: string, link: string, descripcion: string) {
    if (this.comprobarErrores(nombre, precio)){
      return; 
    }
    if (this.comprobarErrorImagen()){
      return;
    }
    let producto = {
      nombre,
      precio,
      descripcion,
      imagen1: this.imagen1,
      imagen2: this.imagen2,
      imagen3: this.imagen3,
      link
    }
    this.terminar(producto);
  }

  comprobarErrores(nombre: string, precio: string) {
    if ((nombre.length === 0 ) && (precio.length === 0 )) {
      this.errores.nombre= true;
      this.errores.precio= true;
      return true;
    } else if (precio.length === 0 ) {
      this.errores.precio= true;
      this.errores.nombre= false;
      return true;
    } else if (nombre.length === 0 ) {
      this.errores.nombre= true;
      this.errores.precio= false;
      return true;
    } else {
      this.errores.nombre= false;
      this.errores.precio= false;
      return false;
    }
  }
  comprobarErrorImagen() {
    if (this.imagen1.length === 0){
      this.errores.imagen = true;
      return true;
    } else {
      this.errores.imagen = false;
        return false;
      }
    }

  terminar(producto: any) {
      let idProducto = this.eventosService.obtenerIDAleatorio();
      const idUsuarioActual = JSON.parse(localStorage.getItem('user')).uid;
      this.eventosService.crearProductoEvento(idProducto,this.idEvento,producto.nombre, producto.precio, producto.link,producto.descripcion, producto.imagen1, producto.imagen2,producto.imagen3,idUsuarioActual).then(res=>{
        // console.log(res);
      })
    this.modalCtrl.dismiss();
  }
  
  async takePicture(num: string) {
    const image = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt
    });
    if (num ==='1'){
      this.subiendoImagen1 = true;
    }else if (num ==='2'){
      this.subiendoImagen2 = true;
    }else if (num ==='3'){
      this.subiendoImagen3 = true;
    }
    let metadata = {
      contentType: 'image/jpeg'
    };
    
    let idEvento = this.eventosService.obtenerIDAleatorio()
    const task = this.storage.ref(`images/${idEvento}_${this.contadorImagenes}.jpeg`).putString(image.base64String, 'base64', metadata).then((savedPicture) => {
      this.storage.ref(`images/${idEvento}_${this.contadorImagenes}.jpeg`).getDownloadURL().subscribe((url) => {
        console.log(url)
        if (num ==='1'){
          this.imagen1 = url.toString();
          this.subiendoImagen1 = false;
        }else if (num ==='2'){
          this.imagen2 = url.toString();
          this.subiendoImagen2 = false;
        }else if (num ==='3'){
          this.imagen3 = url.toString();
          this.subiendoImagen3 = false;
        }
        this.contadorImagenes++;
      })
    })
  }
  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}
