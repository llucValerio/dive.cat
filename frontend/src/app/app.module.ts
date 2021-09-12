import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {ToolbarModule} from 'primeng/toolbar';
import {SplitButtonModule} from 'primeng/splitbutton';
import { CardModule } from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';
import {CarouselModule} from 'primeng/carousel';
import {GMapModule} from 'primeng/gmap';
import {ChartModule} from 'primeng/chart';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { ImmersionsComponent } from './components/immersions/immersions.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BuddiesPipe } from './pipes/buddies.pipe';
import { ImmersionDetailsComponent } from './components/immersion-details/immersion-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HeaderComponent,
    EquipmentComponent,
    ImmersionsComponent,
    ProfileComponent,
    BuddiesPipe,
    ImmersionDetailsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule, 
    PanelModule,
    ToolbarModule, 
    SplitButtonModule,
    CardModule, 
    InputTextModule, 
    MessagesModule,
    MessageModule,
    CalendarModule,
    DialogModule,
    CarouselModule, 
    GMapModule,
    ChartModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [
    BuddiesPipe
  ]
})
export class AppModule { }
