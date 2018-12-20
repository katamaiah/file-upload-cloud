import { Component, OnInit } from '@angular/core';
import { AWSStorageService } from '../service/aws-storage.service';
import { StorageService } from '../service/storage.service';
import { AzureStorageService } from '../service/azure-storage.service';


@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css'],
   
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList;
  url: String;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.storageService.uploadFile(file).subscribe(response => {
      console.log("URL:",response)
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}
