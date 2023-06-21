import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetsService } from 'src/app/services/pets.service';
import { MatDialog } from '@angular/material/dialog';
import { HospitalizationComponent } from '../hospitalization/hospitalization.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { environment } from 'src/environments/environment';
import { EditPetVacsComponent } from './edit-pet-vacs/edit-pet-vacs.component';
import { VacsService } from 'src/app/services/vac.service';
import { PetVacService } from 'src/app/services/pet-vac.service';
import { HospitalizationService } from 'src/app/services/hospitalization.service';
import { MedicationService } from 'src/app/services/medication.service';
import { AddMedicationComponent } from '../../hospitalizations/add-medication/add-medication.component';
import { GlobalConfig, ToastrService } from 'ngx-toastr';
import { AddExamComponent } from '../../hospitalizations/add-exam/add-exam.component';
import { ReporPetComponent } from '../../repor-pet/repor-pet.component';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;

  id: any
  pet: any = {}
  timeout: any
  vacs: Array<any> = []
  petVacs: Array<{ pet_id: number, vac_id: number, applied: string, status: string }> = []
  hospitalization: any = {}
  collapseIsOpen = { medData: false, examData: false };
  medications: Array<any> = []
  exams: Array<any> = []
  pet_id: any


  constructor(
    private resolveAssetPath: Renderer2,
    private route: ActivatedRoute,
    private service: PetsService,
    private dialogRef: MatDialog,
    private renderer: Renderer2,
    private router: Router,
    private vacService: VacsService,
    private petvacService: PetVacService,
    private service2: HospitalizationService,
    private medService: MedicationService,
    private toastrService: ToastrService

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.id = res.id
    })
    this.getPetDetail()
    this.getVacs()
    this.getPetVacs()
  }

  getMeds() {
    this.blockUI.start()
    this.medService.getMedication({ pet_id: this.id, hospitalization: 'no', tipo: 'medicacoes' }).subscribe({
      next: res => {
        this.medications = res.data
      }
    }).add(() => {
      this.blockUI.stop()
      this.getExam()
    })
  }

  getExam() {
    this.blockUI.start()
    this.medService.getMedication({ pet_id: this.id, hospitalization: 'no', tipo: 'exams' }).subscribe({
      next: res => {
        this.exams = res.data
      }
    }).add(() => this.blockUI.stop())
  }

  check(id: any) {
    let result = false;

    this.petVacs.forEach(e => {
      if (e.vac_id == id) {
        if (e.status == '1') {
          result = true;
        } else {
          result = false;
        }
      }
    });

    return result;
  }

  getVacs() {
    this.vacService.getVacs().subscribe({
      next: res => {
        this.vacs = res.data
      }
    })
  }

  examData() {
    let data = Object.assign({}, { pet_id: this.id })
    this.dialogRef.open((AddExamComponent), {
      width: '900px',
      data: data,
      disableClose: true
    }).afterClosed().subscribe(res => {
      if (res) { this.ngOnInit() }
    })
  }

  getPetVacs() {
    this.petvacService.getVacs({ pet_id: this.id }).subscribe({
      next: res => {
        this.petVacs = res.data
      }
    })
  }

  editVac() {
    let data = Object.assign({}, { pet_id: this.id })
    this.dialogRef.open((EditPetVacsComponent), {
      width: '600px',
      data: data,
      disableClose: true
    }).afterClosed().subscribe(res => {
      if (res) { this.ngOnInit() }
    })
  }


  uploadDoc() {
    let data = Object.assign({}, { pet_id: this.id })
    const dialog = this.dialogRef.open(HospitalizationComponent, {
      width: '600px',
      data: data
    })
  }

  initHospitalization() {
    this.router.navigate([`dash1/pets/hospitalization/${this.id}`])
  }

  consultas() {
    setTimeout(() => {
      if (this.id == 2) {
        this.repData()
      } else {
        this.repData1()
      }
    }, 1000);
  }

  repData() {
    let data = Object.assign({}, { data_inicio: '15/02/2023', total_gasto: 2340.94, consultas: 4, tempo_consulta: 31, medio_gasto: 585.235 })
    this.dialogRef.open((ReporPetComponent), {
      width: '900px',
      data: data,
      disableClose: true
    }).afterClosed().subscribe(res => {
      if (res) { this.ngOnInit() }
    })
  }

  repData1() {
    let data = Object.assign({}, { data_inicio: '21/06/2023', total_gasto: 710.00, consultas: 1, tempo_consulta: 1, medio_gasto: 710.00 })
    this.dialogRef.open((ReporPetComponent), {
      width: '900px',
      data: data,
      disableClose: true
    }).afterClosed().subscribe(res => {
      if (res) { this.ngOnInit() }
    })
  }

  getPetDetail() {
    this.blockUI.start()
    setTimeout(() => {
      this.service.getPetDetail(this.id).subscribe({
        next: res => {
          this.pet = res.message
          this.pet.image = `${environment.BASE_URL}/storage/${this.pet.image}`
        },
        error: err => {
          console.log('erro')
        }
      }).add(() => {
        this.blockUI.stop()
        this.getMeds()
      })
    }, 1000);
  }

  downloadClipedDoc() {
  }

  openCliped() {
    this.blockUI.start()
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.openClip(), 2000);
  }

  openClip() {
    this.blockUI.stop()
    const filePath = 'assets/images/receituario_veterinario_criativo.png';
    const url = this.fun(filePath);
    window.open(url);
  }

  fun(filePath: string): string {
    const baseHref = this.renderer.selectRootElement('base').href;
    return `${baseHref}${filePath}`;
  }

  closeHospitalization() {
    this.router.navigate([`dash1/pets/hospitalization/${this.id}`])
  }

  medicationData() {
    let data = Object.assign({}, { pet_id: this.id })
    this.dialogRef.open((AddMedicationComponent), {
      width: '900px',
      data: data,
      disableClose: true
    }).afterClosed().subscribe(res => {
      if (res) { this.ngOnInit() }
    })
  }

  init(id: any) {
    const toastrConfig: Partial<GlobalConfig> = {
      positionClass: 'toast-top-left',
      progressBar: true
    };
    this.blockUI.start()
    this.service.alterAppoint({ pet_id: id }).subscribe({
    }).add(() => {
      this.blockUI.stop()
      this.ngOnInit()
      if (this.pet.appoin_status == '0') {
        this.toastrService.success('Consulta iniciada', '', toastrConfig)
      } else {
        this.toastrService.success('Consulta finalizada', '', toastrConfig)
      }
    })
  }

  openCollapse(value: boolean, field: string) {
    if (field == 'med-data') {
      this.collapseIsOpen.medData = value;
    }
    if (field = 'exam-data') {
      this.collapseIsOpen.examData = value
    }
  }

  getHospDetail() {
    this.service2.getHospitalizationDetail(this.id).subscribe({
      next: res => {
        this.hospitalization = res.data
        this.pet_id = res.data.pet_id
        this.hospitalization.pet.image = `${environment.BASE_URL}/storage/${this.hospitalization.pet.image}`
      },
      error: err => {
        console.log('erro')
      }
    }).add(() => { this.getMeds() }
    )
  }
}
