import { Injectable } from '@angular/core';

import { PluginListenerHandle, Plugins } from '@capacitor/core';
import { AdOptions, AdSize, AdPosition } from '@capacitor-community/admob';
import { ConfiguracionService } from './configuracion.service';
import { Platform } from '@ionic/angular';
const { AdMob } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AdmobService {

  tipoReward: string = '';
  cantidadAnterior: number;
  idUsuarioActual = JSON.parse(localStorage.getItem('user')).uid;
  cargando = false;
  //REWARD VIDEO CONFIG.
 options: AdOptions = {
    isTesting: true, // KEEP DURING CODING, REMOVE AT PROD.
    adId: 'ca-app-pub-6581604974415927/5046711261'
  };

    constructor(
      private configuracionService: ConfiguracionService,
      public platform: Platform
      ) {
        platform.ready().then(()=>{
          // Prepare ReWardVideo
          AdMob.prepareRewardVideoAd(this.options);

          // Subscribe ReWardVideo Event Listener
          AdMob.addListener('onRewardedVideoAdLoaded', (info: boolean) => {
            // You can call showRewardVideoAd() here or anytime you want.
            console.log('RewardedVideoAd Loaded');
          });
          AdMob.addListener('onRewardedVideoCompleted', (info: boolean) => {
            // You can call showRewardVideoAd() here or anytime you want.
            console.log("PREMIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
            if (this.tipoReward === 'P'){
              this.configuracionService.SumarPersona(this.idUsuarioActual,this.cantidadAnterior)
            } else if (this.tipoReward === 'R'){
              this.configuracionService.SumarRegalo(this.idUsuarioActual,this.cantidadAnterior)
            }
            AdMob.prepareRewardVideoAd(this.options);
          });
        });
      }

      ShowRewardVideo(tipo: string, cantidadAnterior: number) {
        AdMob.showRewardVideoAd();
        this.tipoReward = tipo;
        this.cantidadAnterior = cantidadAnterior;
        AdMob.prepareRewardVideoAd(this.options);
      }
    }