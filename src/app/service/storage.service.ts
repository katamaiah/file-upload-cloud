import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { FileUpload } from '../model/file-upload';
import { AzureStorageService } from './azure-storage.service';
import { AWSStorageService } from './aws-storage.service';


@Injectable()
export class StorageService {
    private config= require('../../assets/config.json');
    constructor(private azureblob : AzureStorageService ,private awss3 : AWSStorageService){
            console.log("configured storage",this.config.storageservice);
    }

 uploadFile(file){
    return Observable.create(Observer=>{
        if(this.config.storageservice=='azure'){
            this.azureblob.uploadFile(file).subscribe(response =>{
                if(response.status){
                    Observer.next(response.url)
                }else{
                    Observer.next('');
                }
                Observer.complete();
            })
        }else{
            console.log("AWS implementation ")
           this.awss3.uploadFile(file).subscribe(response =>{
               if(response.status){
                   Observer.next(response.url)
               }else{
                   Observer.next('');
               }
               Observer.complete();
           })
        }
    })

 }


//  getFiles(): Observable<Array<FileUpload>> ;
}
