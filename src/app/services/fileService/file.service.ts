import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { PartitionFile, ProgramFile} from 'src/app/pages/models/progDim.model';
import firebase from 'firebase';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class FileService {

  programFiles : ProgramFile[]=[];
  programFilesSubject = new Subject<ProgramFile[]>();

  fileName:string;
  fileNamesSubject = new Subject<string>();

  partitionFiles : PartitionFile[]=[];
  partitionFilesSubject = new Subject<PartitionFile[]>();

  search : PartitionFile[]=[];
  searchSubject = new Subject<PartitionFile[]>();

  emitfileName() {
    this.fileNamesSubject.next(this.fileName);
  }

  emitProgramFiles() {
    this.programFilesSubject.next(this.programFiles);
  }

  emitPartitionFiles() {
    this.partitionFilesSubject.next(this.partitionFiles);
  }

  emitSearch() {
    this.partitionFilesSubject.next(this.search);
  }

  constructor(private httpClient: HttpClient) {
    this.getProgramFiles();
    this.getPartitionsFiles();
  }
  
  saveProgramFile() {
    firebase.database().ref('/programFiles').set(this.programFiles);
  }

  savePartitionFile() {
    firebase.database().ref('/partitionsFiles').set(this.partitionFiles);
  }

  searchPartition(search:string){ 
    var partitionFound = new Array();
    this.partitionFiles.forEach(
      (partition)=>{
        if(partition.name.replace(/[^a-zA-Z ]/g, "").toLocaleLowerCase().includes(search.replace(" ",""))){
          partitionFound.push(partition)
        }
      }
    )
    return partitionFound;
    
  }
  

  createNewProgramFile(programFile: ProgramFile,partitionFile : PartitionFile, isPartition:boolean){
    if(!isPartition){
      if(this.programFiles.length===0){
        this.programFiles[0]=programFile;
      }else{
        this.programFiles.push(programFile);
      }
      this.saveProgramFile();
      this.emitProgramFiles();
    }
    else{
      if(this.partitionFiles.length===0){
        this.partitionFiles[0]=partitionFile;
      }else{
        this.partitionFiles.push(partitionFile);
      }
      this.savePartitionFile();
      this.emitPartitionFiles();
    }
    
  }

  getProgramFiles() {
    firebase.database().ref('/programFiles')
    .on('value', (data) => {
        this.programFiles = data.val() ? data.val() : [];
        this.emitProgramFiles();
      }
    );

  }

  getPartitionsFiles() {
    firebase.database().ref('/partitionsFiles')
    .on('value', (data) => {
        this.partitionFiles = data.val() ? data.val() : [];
        this.emitPartitionFiles();
      }
    );

  }

  removeProgramFile(file: ProgramFile){
      if(file.url) {
        const storageRef = firebase.storage().refFromURL(file.url);
        storageRef.delete().then(
          () => {
            console.log('file removed!');
          },
          (error) => {
            console.log('Could not remove file! : ' + error);
          }
        );
      }
      const progId = this.programFiles.findIndex(
          (progFile) => {
            if(progFile===file){
                return true;
            }else{
                return false;
            }
          }
      );
      this.programFiles.splice(progId,1);
      this.saveProgramFile();
      this.emitProgramFiles();
      
  }

  removePartitionFile(file:PartitionFile){
    if(file.url) {
      const storageRef = firebase.storage().refFromURL(file.url);
      storageRef.delete().then(
        () => {
          console.log('file removed!');
        },
        (error) => {
          console.log('Could not remove file! : ' + error);
        }
      );
    }
    const partitionId = this.partitionFiles.findIndex(
        (partition) => {
          if(partition===file){
              return true;
          }else{
              return false;
          }
        }
    );
    this.partitionFiles.splice(partitionId,1);
    this.savePartitionFile();
    this.emitPartitionFiles();
  }

  uploadFile(file: File, isPartition: boolean) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        if(isPartition){
          const upload = firebase.storage().ref('files/partitions').child(almostUniqueFileName+file.name).put(file);
          upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
            () => {
              console.log('Chargement…');
            },
            (error) => {
              console.log('Erreur de chargement ! : ' + error);
              reject();
            },
            () => {
              this.fileName = almostUniqueFileName + file.name;
              this.emitfileName();
              resolve(upload.snapshot.ref.getDownloadURL());
            }
          );
        }else{
          const upload = firebase.storage().ref('files/programmes').child(almostUniqueFileName+file.name).put(file);
          upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
            () => {
              console.log('Chargement…');
            },
            (error) => {
              console.log('Erreur de chargement ! : ' + error);
              reject();
            },
            () => {
              this.fileName = almostUniqueFileName + file.name;
              this.emitfileName();
              resolve(upload.snapshot.ref.getDownloadURL());
            }
          );
        }
        
      }
    );
  }
}