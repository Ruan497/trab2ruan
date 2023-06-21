import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { VacsService } from 'src/app/services/vac.service';
import { AddMedicationComponent } from '../../hospitalizations/add-medication/add-medication.component';
import { MatDialog } from '@angular/material/dialog';
import { AddVaccinesComponent } from './add-vaccines/add-vaccines.component';
import { DeleteComponent } from '../../common/delete/delete.component';
import { GlobalConfig, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.css']
})
export class VaccinesComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;

  actual: any = {}
  vacs: Array<any> = []
  constructor(
    private vacService: VacsService,
    private dialogRef: MatDialog,
    private toastrService: ToastrService,

  ) { }

  ngOnInit(): void {
    this.getVacs()
  }

  medicationData(p?: any) {
    let data = Object.assign({}, p)
    this.dialogRef.open((AddVaccinesComponent), {
      width: '600px',
      data: data,
      disableClose: true
    }).afterClosed().subscribe(res => {
      if (res) { this.ngOnInit() }
    })
  }

  delete(p?: any) {
    this.actual = p
    let data = Object.assign({}, p)
    this.dialogRef.open((DeleteComponent), {
      width: '600px',
      data: data,
      disableClose: true
    }).afterClosed().subscribe(res => {
      if (res) { this.deleteVac() }
    })
  }

  deleteVac(){
    const toastrConfig: Partial<GlobalConfig> = {
      positionClass: 'toast-top-left',
      progressBar: true
    };
    this.blockUI.start()
    this.vacService.deleteVac(this.actual.id).subscribe({
      next: res =>{
        this.toastrService.success('Vacina excluída com sucesso', '', toastrConfig)

      }
    }).add(()=>{this.blockUI.stop()})
  }

  getVacs() {
    this.blockUI.start()
    this.vacService.getVacs().subscribe({
      next: res => {
        this.vacs = res.data
      }
    }).add(() => { this.blockUI.stop() })
  }
}