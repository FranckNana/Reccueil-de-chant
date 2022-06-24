import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'song-app';

  constructor(){
    const firebaseConfig = {
      apiKey: "AIzaSyAoFNQmSaM9M01OLyPCXOtkP8NVGw7K7r0",
      authDomain: "song-app-admin.firebaseapp.com",
      projectId: "song-app-admin",
      storageBucket: "song-app-admin.appspot.com",
      messagingSenderId: "437253215814",
      appId: "1:437253215814:web:00cb93477abc873788dc47",
      measurementId: "G-PK0PSXB0VE"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
