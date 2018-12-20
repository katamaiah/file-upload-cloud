import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import * as S3 from 'aws-sdk/clients/s3';
import { FileUpload } from '../model/file-upload';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { StorageService } from './storage.service';

@Injectable()
export class AWSStorageService {

  private config = require('../../assets/config.json');
  url: String;

  constructor() { }

  private getS3Bucket(): any {
    const bucket = new S3(
      {
        accessKeyId: this.config.awss3configuration.accessKeyId,
        secretAccessKey: this.config.awss3configuration.secretAccessKey,
        region: this.config.awss3configuration.region
      }
    );
    return bucket;
  }
  uploadFile(file) {
    return Observable.create(observer=>{
      var _This = this;
      if (file !== null) {
        const params = {
          Bucket: this.config.awss3configuration.bucket,
          Key: this.config.awss3configuration.folder + file.name,
          Body: file
        };

        this.getS3Bucket().upload(params, function (err, data) {
          console.log("value os err: " + this.err);
          if (err) {
            observer.next({status:false})
            //console.log('There was an error uploading your file: ', err);
            //return;
          }else{
            console.log('Successfully uploaded file.', data);
            observer.next({status:true,url:data.Location})
          }
          observer.complete();
        });
      }
    })
      
    }

  getFiles(): Observable<Array<FileUpload>> {
    const fileUploads = new Array<FileUpload>();

    const params = {
      Bucket: this.config.awss3configuration.bucket,
      Prefix: this.config.awss3configuration.folder
    };

    this.getS3Bucket().listObjects(params, function (err, data) {
      if (err) {
        console.log('There was an error getting your files: ' + err);
        return;
      }

      console.log('Successfully get files.', data);

      const fileDatas = data.Contents;

      fileDatas.forEach(function (file) {
        fileUploads.push(new FileUpload(file.Key, 'https://s3.amazonaws.com/' + params.Bucket + '/' + file.Key));
      });
    });

    return Observable.of(fileUploads);
  }

}

