import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Infos } from 'src/app/pages/models/infos.model';

@Injectable()
export class InfoService {

  infos : Infos[]=[];
  infosSubject = new Subject<Infos[]>();

  constructor(private httpClient: HttpClient) {
    this.getInfos();
  }

  emitInfos() {
    this.infosSubject.next(this.infos);
  }
  
  saveInfos() {
    firebase.database().ref('/Infos').set(this.infos);
  }

  updateInfo(oldInf: Infos , infoUpdated: Infos){
    const infoId = this.infos.findIndex(
      (inf) => {
        if(inf===oldInf){
            return true;
        }else{
            return false;
        }
      }
    );
    this.infos[infoId]=infoUpdated;
    this.saveInfos();
    this.emitInfos();
  }

  createNewInfos(info: Infos){
    if(this.infos.length===0){
      this.infos[0]=info;
    }else{
      this.infos.push(info);
    }
    this.saveInfos();
    this.emitInfos();
  }

  getInfos() {
    firebase.database().ref('/Infos')
    .on('value', (data) => {
        this.infos = data.val() ? data.val() : [];
        this.emitInfos();
      }
    );

  }

  removeInfo(info: Infos){
      const infoId = this.infos.findIndex(
          (inf) => {
            if(inf===info){
                return true;
            }else{
                return false;
            }
          }
      );
      this.infos.splice(infoId,1);
      this.saveInfos();
      this.emitInfos();
  }

}