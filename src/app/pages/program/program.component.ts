import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SongService } from 'src/app/services/songService/song.service';
import { Song } from '../models/chant.model';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProgramComponent implements OnInit {

  listSongByType: Song[]=[];

  constructor(private songService: SongService,
              private router: Router) { }

  ngOnInit(): void {
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
  
  getType(type:String){
    this.listSongByType = this.songService.getSongByType(type).sort(this.funcOrderByTitle);
  }

  onViewSong(title: String) {
    this.router.navigate(['/program', 'viewSong', title]);
  }


}
