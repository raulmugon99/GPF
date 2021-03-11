import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenesPipe } from './imagenes.pipe';
import { TimeagoPipe } from './timeago.pipe';



@NgModule({
  declarations: [ImagenesPipe, TimeagoPipe],
  imports: [
    CommonModule
  ],
  exports: [ImagenesPipe,TimeagoPipe]
})
export class PipesModule { }
