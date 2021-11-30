import { Component, OnDestroy, OnInit, Sanitizer, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FileService } from 'src/app/services/fileService/file.service';
import { InfoService } from 'src/app/services/infoService/infos.service';
import { Infos } from '../models/infos.model';
import { ProgramFile } from '../models/progDim.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {

  programFiles: ProgramFile[];

  lastProgramFile: ProgramFile = new ProgramFile("","","");
  programFilesSubcription : Subscription;

  infos : Infos[]=[];
  infosSubscription : Subscription;

  isProg:boolean=false;
  isInfos: boolean = false;

  myTrustUrl:SafeUrl;
  test:string;

  constructor(private fileService:FileService,
              private router: Router,
              private infoService:InfoService,
              private sanitizer: DomSanitizer) {}

  ngOnInit(){
      this.programFilesSubcription = this.fileService.programFilesSubject.subscribe(
        (files:any[])=>{
            this.programFiles = files;
            this.lastProgramFile  = this.programFiles[this.programFiles.length-1];
            this.myTrustUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.lastProgramFile?.url);
            this.test = this.lastProgramFile?.url;
            if( this.programFiles.length===0){
              this.isProg=false;
            }else{
              this.isProg=true;
            }
          }
      );
      this.fileService.emitProgramFiles();

      this.infosSubscription = this.infoService.infosSubject.subscribe(
        (infos:any[])=>{
          this.infos = infos;
          if( this.infos.length===0){
            this.isInfos=false;
          }else{
            this.isInfos=true;
          }
        }
      );
      this.infoService.emitInfos();
                
  }          

  ngOnDestroy() {
    if(this.programFilesSubcription){
      this.programFilesSubcription.unsubscribe();
    }
    if(this.infosSubscription){
      this.infosSubscription.unsubscribe();
    }
  }

}
