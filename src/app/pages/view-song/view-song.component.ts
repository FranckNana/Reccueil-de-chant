import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from 'src/app/services/songService/song.service';
import { Song } from '../models/chant.model';

@Component({
  selector: 'app-view-song',
  templateUrl: './view-song.component.html',
  styleUrls: ['./view-song.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewSongComponent implements OnInit {

  song: Song = new Song('', '', '',[]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private songService : SongService) { }

  ngOnInit(): void {
    const title = this.route.snapshot.params['title'];
    this.song = this.songService.getSingleSong(title);
     
  }

}
