import { Component, OnInit, Inject } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilsFormDataService } from 'src/app/services/utils-form-data.service';
import { PetDocsService } from 'src/app/services/petdoc.service';
import { GlobalConfig, ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

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
  doc: any = {}
  id: any
  docs: Array<any> = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<HospitalizationComponent>,
    private utilsFDService: UtilsFormDataService,
    private service: PetDocsService,
    private toastrService: ToastrService,


  ) { }

  ngOnInit(): void {
    if (this.data.pet_id) {
      this.id = this.data.pet_id
      this.doc.pet_id = this.data.pet_id
    }
    this.getDocs()
  }

  onSelectFiles(event: any) {
    this.selectedFiles = this.selectedFiles.concat(event.addedFiles);
  }

  upld() {
    const toastrConfig: Partial<GlobalConfig> = {
      positionClass: 'toast-top-left',
      progressBar: true
    };
    const formData = this.utilsFDService.create(this.doc);
    formData.append('arquivo', this.selectedFiles[0], this.selectedFiles[0].name)
    this.blockUI.start()
    this.service.createProd(formData).subscribe({
      next: res => {
        this.toastrService.success('Documentos atualizados com sucesso', '', toastrConfig)
        this.closeModal(res)
      }
    }).add(() => this.blockUI.stop())
  }

  getDocs() {
    this.blockUI.start()
    this.service.getProds({ pet_id: this.id }).subscribe({
      next: res => {
        this.docs = res.data
      }
    }).add(() => this.blockUI.stop())
  }

  view(p: any) {
    this.blockUI.start()
    this.service.getProdDetail(p.id).subscribe({
      next: res => {
        let url = `${environment.BASE_URL}/${res.message}`
        window.open(url);
      }
    }).add(() => this.blockUI.stop())
  }

  delete(p: any) {
    this.blockUI.start()
    this.service.delProd(p.id).subscribe({
      next: res => {

      }
    }).add(() => {
      this.blockUI.stop()
      this.ngOnInit()
    })
  }

  onRemoveFiles(index: any) {
    this.selectedFiles.splice(index, 1);
  }

  closeModal(res?: any) {
    this.dialogRef.close(res);
  }
}
