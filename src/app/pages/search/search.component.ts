import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/fileService/file.service';
import { SongService } from 'src/app/services/songService/song.service';
import { Song } from '../models/chant.model';
import { PartitionFile } from '../models/progDim.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit{

  partitionFound: PartitionFile[] = [];
  songFond: Song[]=[];
  searchString : string;
  nbFile:number = 0;
  nbSong:number = 0;
  isFound:boolean = true;

  constructor(private fileService : FileService,
              private songService : SongService,
              private router: Router) { }

  ngOnInit(): void {
  }

  search(){
    /*this.partitionFound = this.fileService.searchPartition(this.searchString);
    this.nbFile = this.partitionFound.length;*/

    this.songFond = this.songService.searchSong(this.searchString);
    this.nbSong = this.songFond.length
    if(this.nbSong!=0){
      this.isFound = true;
    }else{
      this.isFound = false;
    }

  }

  onViewSong(title: String) {
    this.router.navigate(['/search', 'viewSong', title]);
  }

}
