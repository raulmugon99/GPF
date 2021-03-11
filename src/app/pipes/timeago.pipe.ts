import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeago'
})
export class TimeagoPipe implements PipeTransform {

  transform(value: string) {
    console.log(value)

    let b = new Date().getTime()
    let a = new Date(value).getTime()

    let resta = b-a;
    let segundos = Math.trunc(Number(resta/1000));
    let minutos = Math.trunc(Number(resta/1000/60));
    let horas = Math.trunc(Number(minutos/60));
    let dias = Math.trunc(Number(horas/24));
    let semanas = Math.trunc(Number(dias/7));
    let meses = Math.trunc(Number(semanas/4.2));
    let anios = Math.trunc(Number(meses/12));
    console.log(segundos)
    console.log(minutos)

   if (anios === 1){
      return 'Hace 1 año.';
    }else if(anios > 1){
      return 'Hace ' + anios + ' años.'
    }

    if (meses === 1){
      return 'Hace 1 mes.';
    }else if(meses > 1){
      return 'Hace ' + meses + ' meses.'
    }
    if (semanas === 1){
      return 'Hace 1 semana.';
    }else if(semanas > 1){
      return 'Hace ' + semanas + ' semanas.'
    }
    if (dias === 1){
      return 'Hace 1 dia.';
    }else if(dias > 1){
      return 'Hace ' + dias + ' dias.'
    } 
       if (horas === 1){
      return 'Hace 1 hora.';
    }else if(horas > 1){
      return 'Hace ' + horas + ' horas.'
    } 
    if (minutos === 1){
      return 'Hace 1 minuto';
    }else if(minutos>1){
      return 'Hace ' + minutos + ' minutos.'
    }
    if (segundos === 1){
      return 'Hace 1 segundo';
    }else if(segundos>1){
      return 'Hace ' + segundos + ' segundos.'
    }

    return "n/d"
  }

}
