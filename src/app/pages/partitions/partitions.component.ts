import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FileService } from 'src/app/services/fileService/file.service';
import { PartitionFile } from '../models/progDim.model';

@Component({
  selector: 'app-partitions',
  templateUrl: './partitions.component.html',
  styleUrls: ['./partitions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PartitionsComponent implements OnInit,OnDestroy {

  partitionFiles: PartitionFile[];
  partitionFilesSubcription : Subscription;
  partitionsUrl: SafeUrl[] = [];
  isPartition:boolean = false;

  constructor(private fileService:FileService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.partitionFilesSubcription = this.fileService.partitionFilesSubject.subscribe(
      (partitions:any[])=>{
        this.partitionFiles = partitions;
        for(var i=0;i<this.partitionFiles.length;i++){
          this.partitionFiles[i].name = this.partitionFiles[i].name.substr(13);
          this.partitionsUrl[i] =  this.sanitizer.bypassSecurityTrustResourceUrl(this.partitionFiles[i]?.url);
          if( this.partitionFiles.length===0){
            this.isPartition=false;
          }else{
            this.isPartition=true;
          }
        }
      }
    );
    this.fileService.emitPartitionFiles();
    
  }

  ngOnDestroy() {
    if(this.partitionFilesSubcription){
      this.partitionFilesSubcription.unsubscribe();
    }
  }

}
