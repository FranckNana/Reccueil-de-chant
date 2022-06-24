import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AuthGuardService } from './services/authGuardService/auth-guard.service';
import { AuthService } from './services/authService/auth.service';
import { RouterModule, Routes } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileService } from './services/fileService/file.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { InfoService } from './services/infoService/infos.service';
import { SongService } from './services/songService/song.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MatCardModule} from '@angular/material/card';

const appRoutes: Routes = [
  { path: 'auth/signin', component: SigninComponent },
  { path: 'admin', canActivate: [AuthGuardService], component: AdminPageComponent },
  { path: '', component: SigninComponent },
  { path: '**', component: SigninComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    AdminPageComponent
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
    }),
    MatCardModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    FileService,
    InfoService,
    SongService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
