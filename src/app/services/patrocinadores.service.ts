import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PatrocinadoresService {

  patrocinadores: any[] = [];

  constructor(public afStore: AngularFirestore) { }

  obtenerPatrocinadores() {
    return this.afStore.collection('patrocinadores', ref => ref.orderBy('orden')) 
    .valueChanges().pipe(take(1)).subscribe(data => {
      this.patrocinadores = data;
    })
  }
}
