import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { HospitalizationService } from 'src/app/services/hospitalization.service';
import { environment } from 'src/environments/environment';
import { AddMedicationComponent } from '../add-medication/add-medication.component';
import { MedicationService } from 'src/app/services/medication.service';
import { GlobalConfig, ToastrService } from 'ngx-toastr';
import { AddExamComponent } from '../add-exam/add-exam.component';

@Component({
  selector: 'app-hospitalizations-detail',
  templateUrl: './hospitalizations-detail.component.html',
  styleUrls: ['./hospitalizations-detail.component.css']
})
export class HospitalizationsDetailComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;

  id: any
  hospitalization: any = {}
  timeout: any
  collapseIsOpen = { medData: false, examData: false };
  medications: Array<any> = []
  pet_id: any

  constructor(
    private route: ActivatedRoute,
    private service: HospitalizationService,
    private dialogRef: MatDialog,
    private renderer: Renderer2,
    private router: Router,
    private medService: MedicationService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.id = res.id
    })
    this.getPetDetail()
  }

  downloadClipedDoc() {
  }

  getMeds() {
    this.blockUI.start()
    this.medService.getMedication({pet_id: this.pet_id}).subscribe({
      next: res => {
        this.medications = res.data
      }
    }).add(() => this.blockUI.stop())
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
    let data = Object.assign({}, { id: this.id, pet_id: this.pet_id })
    this.dialogRef.open((AddMedicationComponent), {
      width: '900px',
      data: data,
      disableClose: true
    }).afterClosed().subscribe(res => {
      if (res) { this.ngOnInit() }
    })
  }

  examData() {
    let data = Object.assign({}, { id: this.id, pet_id: this.pet_id })
    this.dialogRef.open((AddExamComponent), {
      width: '900px',
      data: data,
      disableClose: true
    }).afterClosed().subscribe(res => {
      if (res) { this.ngOnInit() }
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

  getPetDetail() {
    this.service.getHospitalizationDetail(this.id).subscribe({
      next: res => {
        this.hospitalization = res.data
        this.pet_id = res.data.pet_id
        this.hospitalization.pet.image = `${environment.BASE_URL}/storage/${this.hospitalization.pet.image}`
      },
      error: err => {
        console.log('erro')
      }
    }).add(()=>{ this.getMeds()}
    )
  }
}
