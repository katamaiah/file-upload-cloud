import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FileUpload } from '../model/file-upload';
import { StorageService } from '../service/storage.service';
import { AWSStorageService } from '../service/aws-storage.service';

@Component({
  selector: 'app-list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css'],
 
})
export class ListUploadComponent implements OnInit {

  showFile = false;
  fileUploads: Observable<Array<FileUpload>>;

  constructor(private uploadService: StorageService) { }

  ngOnInit() {
  }

  showFiles(enable: boolean) {
    this.showFile = enable;

    if (enable) {
     // this.fileUploads = this.uploadService.getFiles();
    }
  }

}
