import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { PluginListenerHandle, Plugins } from '@capacitor/core';
import { AdOptions, AdSize, AdPosition } from '@capacitor-community/admob';
import { ConfiguracionService } from './configuracion.service';
import { Platform } from '@ionic/angular';
const { AdMob } = Plugins;
=======
import { Platform } from '@ionic/angular';
import { ConfiguracionService } from './configuracion.service';
>>>>>>> 590fda5f6f8fb3a6e31bb7fbd56e6635929b39ec

@Injectable({
  providedIn: 'root'
})
export class AdmobService {

  tipoReward: string = '';
  cantidadAnterior: number;
  idUsuarioActual = JSON.parse(localStorage.getItem('user')).uid;
  cargando = false;
  //REWARD VIDEO CONFIG.
<<<<<<< HEAD
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
=======
  RewardVideoConfig: AdMobFreeRewardVideoConfig = {
  isTesting: true, // KEEP DURING CODING, REMOVE AT PROD.
  autoShow: true//,
  //id: "ID GENERATED AT ADMOB ca-app-pub FOR PROD"
  };
    constructor(
      public platform: Platform,
      private admobFree: AdMobFree,
      private configuracionService: ConfiguracionService
      ) {
      //LOAD ADS AT PLATFORM READY PROMISE.
      platform.ready().then(()=>{
      //REWARD VIDEO
      this.admobFree.rewardVideo.config(this.RewardVideoConfig);
      this.admobFree.rewardVideo.prepare().then(() => {
      console.log('REWARD VIDEO LOADED')
      }).catch(e =>
      console.log('PROBLEM LOADING REWARDVIDEO: ', e)
      );
      });
  
      this.admobFree.on('admob.rewardvideo.events.REWARD').subscribe(()=> {
        console.log("PREMIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
        if (this.tipoReward === 'P'){
          this.configuracionService.SumarPersona(this.idUsuarioActual,this.cantidadAnterior)
        } else if (this.tipoReward === 'R'){
          this.configuracionService.SumarRegalo(this.idUsuarioActual,this.cantidadAnterior)
        }
        this.cargando= false;
      })
      }
      
      ShowRewardVideo(tipo: string, cantidadAnterior: number) {
        this.cargando = true;
      //CHECK AND SHOW REWARDVIDEO
      this.admobFree.rewardVideo.isReady().then(() => {
      //AT .ISREADY SHOW
      this.admobFree.rewardVideo.prepare().then(() => {
        this.cargando= false;
        console.log('BANNER LOADED')
        this.tipoReward = tipo;
        this.cantidadAnterior = cantidadAnterior;
      })
      .catch(e => {
        this.cargando= false;
        console.log('PROBLEM LOADING REWARD VIDEO: ', e)
    }  );
      })
      .catch(e => {
        this.cargando= false;
        console.log('PROBLEM LOADING REWARD VIDEO: ', e)
      }  );
      }
      }
>>>>>>> 590fda5f6f8fb3a6e31bb7fbd56e6635929b39ec
