import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-hospitalization',
  templateUrl: './hospitalization.component.html',
  styleUrls: ['./hospitalization.component.css']
})
export class HospitalizationComponent implements OnInit {


  @BlockUI() blockUI!: NgBlockUI;

  isLoadingSearch: boolean = false;
  patientsList: any = [];
  selectedFiles = [] as Array<File>;
  timeout: any;

  constructor(
    public dialogRef: MatDialogRef<HospitalizationComponent>,
  ) { }

  ngOnInit(): void {
  }


  onSelectFiles(event: any) {
    this.selectedFiles = this.selectedFiles.concat(event.addedFiles);
  }

  upld() {
    this.blockUI.start()
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.blockUI.stop(), 1000);
    this.closeModal()
  }

  onRemoveFiles(index: any) {
    this.selectedFiles.splice(index, 1);
  }

  closeModal(res?: any) {
    this.dialogRef.close(res);
  }
}
