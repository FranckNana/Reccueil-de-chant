import { Component, OnInit, ViewEncapsulation,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FileService } from 'src/app/services/fileService/file.service';
import { PartitionFile, ProgramFile} from '../models/progDim.model';
import 'rxjs/Rx';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Infos } from '../models/infos.model';
import { SongService } from 'src/app/services/songService/song.service';
import { Song } from '../models/chant.model';
import { InfoService } from 'src/app/services/infoService/infos.service';
import { AuthService } from 'src/app/services/authService/auth.service';
import firebase from 'firebase/';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminPageComponent implements OnInit, OnDestroy {

  programFileToSave: ProgramFile = new ProgramFile("","","");
  partitionFile : PartitionFile = new PartitionFile("","","");

  programFiles: ProgramFile[];
  programFilesSubcription : Subscription;
  partitionFiles: PartitionFile[];
  partitionFilesSubcription : Subscription;
  fileNameSubscription : Subscription;
  infos : Infos[]=[];
  infosSubscription : Subscription;
  songs : Song[]=[];
  songSubscription : Subscription;
  nbSong : number = 0;

  isDate: boolean = false;
  progOrdin:boolean =true;
  isAudio:boolean = false;
  isPartition:boolean = false;
  isInfos:boolean = false;
  progDim:boolean = false;
  fileIsUploading: boolean = false;
  fileUploaded: boolean = false;
  isNbInfos:boolean=false;
  isDuplicate:boolean=false;
  isNewSong : boolean=false;
  isUpdatingSong : boolean=false;

  fileUrl: string;
  dateOfProgram:string="";
  title: string ="";
  content: string ="";

  infToUpdate: Infos = new Infos("","");
  oldInfo : Infos = new Infos("","");
  songUpdated: Song;
  coupletToModify: string[]=[];

  infoForm: FormGroup;
  songForm: FormGroup;

  typeChant : string ="";
  nbFileDim:number = 0;
  nbPartition: number = 0;
  songIDToModify: number = 0;

  SongsFiltered: Song[]=[];
  filterType : String = "";
  isFiltre : boolean = false;

  isAuth: boolean;
  isSong: boolean = false;

  constructor(private fileService:FileService,
              private infoService:InfoService,
              private songService: SongService,
              private router: Router,
              private authService: AuthService,
              private formBuilder: FormBuilder) {}

  ngOnInit(){

    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );

    this.programFilesSubcription = this.fileService.programFilesSubject.subscribe(
      (files:any[])=>{
        this.programFiles = files;
        this.nbFileDim = this.programFiles.length;
      }
    );
    this.fileService.emitProgramFiles();

    this.infosSubscription = this.infoService.infosSubject.subscribe(
      (infos:any[])=>{
        this.infos = infos;
        if(this.infos.length>=3){
          this.isNbInfos=true;
        }
      }
    );
    this.infoService.emitInfos();

    this.partitionFilesSubcription = this.fileService.partitionFilesSubject.subscribe(
      (partitions:any[])=>{
        this.partitionFiles = partitions;
        this.nbPartition = this.partitionFiles.length;
      }
    );
    this.fileService.emitPartitionFiles();

    this.songSubscription = this.songService.songSubject.subscribe(
      (songs:any[]) => {
        this.songs = songs.sort(this.funcOrderByTitle);
        this.nbSong = this.songs.length;
      }
    );
    this.songService.emitSongs();
    
    this.initInfoForm();

    this.initSongForm();

  }

  onSignOut(){
    this.authService.signOutUser();
    this.isAuth = false;
  }


  detectFiles(event:any,isPartition:boolean) {
    this.isDuplicate = false;
    this.onUploadFile(event.target.files[0],isPartition);
  }

  onUploadFile(file: File,isPartition:boolean) {
    this.fileIsUploading = true;
    this.fileService.uploadFile(file).then(
      (url: any) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
    this.fileNameSubscription = this.fileService.fileNamesSubject.subscribe(
      (fileName)=>{
        if(isPartition){
          this.partitionFile.name = fileName;
        }else{
          this.programFileToSave.name = fileName;
        }
      }
    );
    this.fileService.emitfileName();

  }

  onSaveFile(isPartition:boolean){

    for(var i =0;i<this.partitionFiles.length;i++){
      if(this.partitionFile?.name.substring(13)===this.partitionFiles[i]?.name.substring(13)){
        this.isDuplicate = true;
        break;
      }
    }

    if(!this.isDuplicate){
      if(isPartition){
        this.partitionFile.date=new Date().toString();
        this.partitionFile.url = this.fileUrl;
        this.fileService.createNewProgramFile(this.programFileToSave,this.partitionFile,true);
      }else{
        this.programFileToSave.url = this.fileUrl;
        if(this.dateOfProgram.length!=0){
          this.programFileToSave.date = this.dateOfProgram;
        }
        this.fileService.createNewProgramFile(this.programFileToSave,this.partitionFile,false);
      }
    }

  }

  getInfoToUpdate(info:Infos){
    this.infToUpdate = info
    this.oldInfo = info;
  }
  
  onUpdateInfo(){
    this.infoService.updateInfo(this.oldInfo, this.infToUpdate);
    this.router.navigate(['home']);
  }

  initInfoForm() {
    this.infoForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSubmitInfoForm() {
    const formValue = this.infoForm.value;
    const newInfo = new Infos( formValue['title'], formValue['content']);
    this.infoService.createNewInfos(newInfo);
    this.initInfoForm();
  }

  initSongForm(){
    this.songForm = this.formBuilder.group({
      type: ['', Validators.required],
      title: ['', Validators.required],
      refrain: [''],
      couplet: this.formBuilder.array([])
    });
  }

  getCouplet(): FormArray {
    return this.songForm.get('couplet') as FormArray;
  }

  funcOrderByTitle = function(a : Song, b:Song) {
    var nameA = a.title.toUpperCase(); 
    var nameB = b.title.toUpperCase(); 
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  }

  getType(){
    this.SongsFiltered = this.songService.getSongByType(this.filterType);
    if(this.filterType.length > 0){
      this.songs = this.SongsFiltered.sort(this.funcOrderByTitle);;
    }else{
      this.songSubscription = this.songService.songSubject.subscribe(
        (songs:any[]) => {
          this.songs = songs.sort(this.funcOrderByTitle);
          this.nbSong = this.songs.length;
        }
      );
      this.songService.emitSongs();
    }
  }

  onAddCouplet() {
    const newCoupletControl = this.formBuilder.control(null, null);
    this.getCouplet().push(newCoupletControl);
  }

  onSaveSong(){
    const formValue = this.songForm.value;
    const newSong = new Song(formValue['type'], 
                             formValue['title'], 
                             formValue['refrain'],
                             formValue['couplet'] ? formValue['couplet'] : []
                            );
    this.songService.addNewSong(newSong);
    this.initSongForm();
    
  }


  onUpdateSong(song:Song, Id:number){
    this.isUpdatingSong = true;
    this.songUpdated = song;
    this.songIDToModify = Id;
  }

  updateCouplet(val:any,i:number){
    this.coupletToModify[i]=val;
  }

  sendModifySong(){
    for(var i=0;i<this.coupletToModify.length;i++){
      if(this.coupletToModify[i]!=undefined){
        this.songUpdated.couplet[i] = this.coupletToModify[i];
      }
    }
    this.songService.updateSong(this.songUpdated,this.songIDToModify);
    this.isUpdatingSong = false;
  }

  onDeleteSong(song:Song){
    this.songService.removeSong(song);
  }

  onDelete(programFiles: ProgramFile){
    this.fileService.removeProgramFile(programFiles);
  }

  onDeletePartition(partition:PartitionFile){
    this.fileService.removePartitionFile(partition);
  }

  onDeleteInfo(info:Infos){
    this.infoService.removeInfo(info);
  }

  initFalse(){
    this.progOrdin=false;
    this.isAudio=false;
    this.isPartition = false;
    this.isInfos = false;
    this.progDim = false;
  }

  isLink(link:number){
    if(link===1){
      this.initFalse();
      this.progOrdin=true;
    }else if(link===2){
      this.initFalse();
      this.isAudio=true;
    }else if(link===3){
      this.initFalse();
      this.isPartition = true;
    }else if(link===4){
      this.initFalse();
      this.isInfos = true;
    }else if(link===5){
      this.initFalse();
      this.progDim = true;
    }
  }

  ngOnDestroy() {
    if(this.programFilesSubcription){
      this.programFilesSubcription.unsubscribe();
    }
    if(this.fileNameSubscription){
      this.fileNameSubscription.unsubscribe();
    }
    if(this.infosSubscription){
      this.infosSubscription.unsubscribe();
    }
    if(this.partitionFilesSubcription){
      this.partitionFilesSubcription.unsubscribe();
    }if(this.songSubscription){
      this.songSubscription.unsubscribe();
    }
  }

  afficher(){
    this.isSong = true;
  }

  cacher(){
    this.isSong = false;
  }

  add(){
    this.isNewSong = !this.isNewSong;
  }
  cancel(){
    this.isNewSong = false;
  }

  cancelModif(){
    this.isUpdatingSong = false;
  }


}
