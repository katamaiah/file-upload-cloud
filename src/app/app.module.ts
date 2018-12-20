import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { AWSStorageService } from './service/aws-storage.service';
import {ListUploadComponent} from './list-uploads/list-upload.component';
import {DetailsUploadComponent} from './details-upload/details-upload.component';
import {AzureStorageService } from './service/azure-storage.service';
import { BlobModule } from 'angular-azure-blob-service';
import { StorageService } from './service/storage.service';


@NgModule({
  declarations: [
    AppComponent,
    FormUploadComponent,
    ListUploadComponent,
    DetailsUploadComponent
  ],
  imports: [
    BrowserModule,
    BlobModule.forRoot()
  ],
  providers: [AWSStorageService,AzureStorageService,StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
