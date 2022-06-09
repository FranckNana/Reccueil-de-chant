import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Song } from 'src/app/pages/models/chant.model';

@Injectable()
export class SongService {

  songs : Song[]=[];
  songSubject = new Subject<Song[]>();

  song: Song;

  constructor(private httpClient: HttpClient) {
    this.getSongs();
  }

  emitSongs() {
    this.songSubject.next(this.songs);
  }
  
  saveSong() {
    firebase.database().ref('/Songs').set(this.songs);
  }

  updateSong(songUpdated: Song , Id: number){
    this.songs[Id]=songUpdated;
    this.saveSong();
    this.emitSongs();
  }

  addNewSong(song: Song){
    if(this.songs.length===0){
      this.songs[0]=song;
    }else{
      this.songs.push(song);
    }
    this.saveSong();
    this.emitSongs();
  }

  getSongs() {
    firebase.database().ref('/Songs')
    .on('value', (data) => {
        this.songs = data.val() ? data.val() : [];
        this.emitSongs();
      }
    );

  }

  getSongByType(type:String){
    var songByType = new Array();
    this.songs.forEach(
      (song)=>{
        if(song.type.toLocaleLowerCase()===type.toLocaleLowerCase()){
          songByType.push(song)
        }
      }
    )
    return songByType;
  }

  removeSong(songToRm: Song){
      const songId = this.songs.findIndex(
          (song) => {
            if(song===songToRm){
                return true;
            }else{
                return false;
            }
          }
      );
      this.songs.splice(songId,1);
      this.saveSong();
      this.emitSongs();
  }

  searchSong(search:string){ 
    var songFound = new Array();
    this.songs.forEach(
      (song)=>{
        if(song.title.replace(/[^a-zA-Z ]/g, "").toLocaleLowerCase().includes(search.toLocaleLowerCase().replace(" ",""))){
          songFound.push(song)
        }
      }
    )
    return songFound;
    
  }

  getSingleSong(title:String){

    this.song = new Song('', '', '',[]);
    this.songs.forEach(
      (item)=>{
        if(item.title.toLocaleLowerCase()===title.toLocaleLowerCase()){
          this.song = item;
        }
      }
    )
    return this.song;
  }

}