import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagenes'
})
export class ImagenesPipe implements PipeTransform {

  transform(imagen: any ): string {
    if (imagen) {
      if(imagen.photoURL){
        return imagen.photoURL;
      }
    }else{
      return 'assets/img/img1.png';
    }
  }

}
