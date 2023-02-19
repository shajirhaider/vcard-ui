import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from './material-modules';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxVcardModule } from "ngx-vcard";
// import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { QRCodeModule } from 'angularx-qrcode';
import { HttpClientModule } from '@angular/common/http';

import { LandingComponent } from './landing/landing.component';
import { InfoGatherComponent } from './info-gather/info-gather.component';
import { VCardComponent } from './v-card/v-card.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    InfoGatherComponent,
    VCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MyMaterialModule,
    ColorPickerModule,
    ImageCropperModule,
    NgxVcardModule,
    // NgxQRCodeModule,
    QRCodeModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
