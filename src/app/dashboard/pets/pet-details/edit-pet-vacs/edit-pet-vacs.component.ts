import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { GlobalConfig, ToastrService } from 'ngx-toastr';
import { AddMedicationComponent } from 'src/app/dashboard/hospitalizations/add-medication/add-medication.component';
import { PetVacService } from 'src/app/services/pet-vac.service';
import { VacsService } from 'src/app/services/vac.service';

@Component({
  selector: 'app-edit-pet-vacs',
  templateUrl: './edit-pet-vacs.component.html',
  styleUrls: ['./edit-pet-vacs.component.css']
})
export class EditPetVacsComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;

  vacs: Array<any> = []
  petVacs: Array<{ id?: number, pet_id?: number, vac_id?: number, applied?: string, status?: string, value?: number }> = []
  id: any

  pet: any = {}
  constructor(
    public dialogRef: MatDialogRef<AddMedicationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vacService: VacsService,
    private petvacService: PetVacService,
    private toastrService: ToastrService,


  ) { }

  ngOnInit(): void {
    if (this.data.pet_id) {
      this.id = this.data.pet_id
    }
    this.getVacs()
    this.getPetVacs()
  }

  getVacs() {
    this.blockUI.start()
    this.vacService.getVacs().subscribe({
      next: res => {
        this.vacs = res.data
      }
    }).add(() => this.blockUI.stop())
  }

  getPetVacs() {
    this.petvacService.getVacs({ pet_id: this.id }).subscribe({
      next: res => {
        this.petVacs = res.data
      }
    })
  }

  attvac() {
    const toastrConfig: Partial<GlobalConfig> = {
      positionClass: 'toast-top-left',
      progressBar: true
    };
    this.blockUI.start()
    this.pet.vacs = this.petVacs
    this.petvacService.createVac(this.pet).subscribe({
      next: res => {
        this.toastrService.success('Animal cadastrado com sucesso', '', toastrConfig)
        this.closeModal(res)
      },
      error: err=>{
        this.toastrService.warning(err.error.message, '', toastrConfig)
      }
    }).add(() => this.blockUI.stop())
  }

  defVac(i: any) {
    this.petVacs.forEach(e => {
      if (e.vac_id == i) {
        if (e.status == '0') {
          e.status = '1'
        } else {
          e.status = '0'
        }
      }
    })
  }

  check(id: any, value: any) {
    let result = false;
    let hasId = false

    this.petVacs.forEach(e => {
      if (e.vac_id == id) {
        hasId = true
        if (e.status == '1') {
          result = true;
        } else {
          result = false;
        }
      }
    });

    if (hasId == false) {
      let va = {
        pet_id: this.id,
        vac_id: id,
        applied: '',
        status: '0',
        value: value
      }
      this.petVacs.push(va)
    }

    return result;
  }


  closeModal(res?: any) {
    this.dialogRef.close(res);
  }

}
