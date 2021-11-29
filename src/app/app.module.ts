import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AuthGuardService } from './services/authGuardService/auth-guard.service';
import { AuthService } from './services/authService/auth.service';
import { HomeService } from './services/homeService/home.service';
import { RouterModule, Routes } from '@angular/router';
import { FourOhFourComponent } from './pages/four-oh-four/four-oh-four.component';
import { HeaderComponent } from './pages/header/header.component';
import { SearchComponent } from './pages/search/search.component';
import { MatListModule } from '@angular/material/list';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileService } from './services/fileService/file.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { InfoService } from './services/infoService/infos.service';
import { PartitionsComponent } from './pages/partitions/partitions.component';
import { SongService } from './services/songService/song.service';
import { ProgramComponent } from './pages/program/program.component';
import { ViewSongComponent } from './pages/view-song/view-song.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/viewSong/:title', component: ViewSongComponent },
  { path: 'program/viewSong/:title', component: ViewSongComponent },
  { path: 'program', component: ProgramComponent },
  { path: 'partitionPage', component: PartitionsComponent },
  { path: 'admin', canActivate: [AuthGuardService], component: AdminPageComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: '', component: SigninComponent },
  { path: 'not-found', component: FourOhFourComponent }
  //{ path: '**', redirectTo: 'not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    FourOhFourComponent,
    HeaderComponent,
    SearchComponent,
    AdminPageComponent,
    PartitionsComponent,
    ProgramComponent,
    ViewSongComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatListModule,
    NgbModule,
    PdfViewerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    AuthGuardService,
    AuthService,
    HomeService,
    FileService,
    InfoService,
    SongService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
