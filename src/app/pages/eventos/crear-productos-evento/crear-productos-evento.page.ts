import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-crear-productos-evento',
  templateUrl: './crear-productos-evento.page.html',
  styleUrls: ['./crear-productos-evento.page.scss'],
})
export class CrearProductosEventoPage implements OnInit {

  contadorImagenes = 0;
  productosAnadidos: any[] = []
  @Input() idEvento: string;
  errores: any = {
    nombre: false,
    precio: false,
    imagen: false
  }
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2.4,
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
              private storage: AngularFireStorage) { }

  ngOnInit() {
  }
  mostrarSlide = false;
  ionViewDidEnter(): void {
    this.mostrarSlide= true;
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
    this.productosAnadidos.push(producto);
    this.limpiarCampos();
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
  

  pagina(link: string) {
    if (link){
      window.open(link, '_blank');
    }
  }

  terminar() {
    this.productosAnadidos.forEach(producto => {
      let idProducto = this.eventosService.obtenerIDAleatorio();
      const idUsuarioActual = JSON.parse(localStorage.getItem('user')).uid;
      this.eventosService.crearProductoEvento(idProducto,this.idEvento,producto.nombre, producto.precio, producto.link,producto.descripcion, producto.imagen1, producto.imagen2,producto.imagen3,idUsuarioActual).then(res=>{
        // console.log(res);
      })
    });
    this.modalCtrl.dismiss();
  }
  
  async takePicture(num: string) {
    const image = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    });
    if (num ==='1'){
      this.subiendoImagen1 = true;
    }else if (num ==='2'){
      this.subiendoImagen2 = true;
    }else if (num ==='3'){
      this.subiendoImagen3 = true;
    }
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    let metadata = {
      contentType: 'image/jpeg'
    };
    console.log(image)
    
    const task = this.storage.ref(`images/${this.idEvento}_${this.contadorImagenes}.jpeg`).putString(image.base64String, 'base64', metadata).then((savedPicture) => {
      console.log(savedPicture)
     
      this.storage.ref(`images/${this.idEvento}_${this.contadorImagenes}.jpeg`).getDownloadURL().subscribe((url) => {
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

  limpiarCampos() {
    this.imagen1 = "";
    this.imagen2="";
    this.imagen3="";
    document.getElementById('inombre').childNodes[0]['value']=""
    document.getElementById('iprecio').childNodes[0]['value']=""
    document.getElementById('ilink').childNodes[0]['value']=""
    document.getElementById('idesc').childNodes[0]['children'][0]['value']=""
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}
