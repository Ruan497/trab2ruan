import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FdService } from 'src/app/services/fd.service';
import { PetsService } from 'src/app/services/pets.service';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { VacsService } from 'src/app/services/vac.service';


@Component({
  selector: 'app-add-new-pet',
  templateUrl: './add-new-pet.component.html',
  styleUrls: ['./add-new-pet.component.css']
})
export class AddNewPetComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;

  selectedFile = {} as File;
  pet: any = {}
  filePath!: string;
  files = [] as Array<File>;
  id: any
  vacs: Array<any> = []
  petVacs: Array<{ pet_id: number, vac_id: number, applied: string, status: string }> = []

  constructor(
    private petService: PetsService,
    private fDt: FdService,
    private toastrService: ToastrService,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private vacService: VacsService
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((res: any) => {
      this.id = res.id
    })
    if (this.id) {
      this.getPetDetail()
    } else {
      this.pet.species = '1';
      this.pet.rabies = '0';
      this.pet.polyvalent = '0';
      this.pet.crf = '0';
      this.pet.canine_influenza = '0';
      this.pet.felv = '0';
      this.pet.vermifuge = '0';
    }

    this.getVacs()
  }

  getVacs() {
    this.blockUI.start()
    this.vacService.getVacs().subscribe({
      next: res => {
        this.vacs = res.data
        this.organize()
      }
    }).add(() => this.blockUI.stop())
  }

  organize(){
    this.vacs.forEach(e=>{
      let vac = {
        pet_id: this.id,
        vac_id: e.id,
        applied: '',
        status: '0',
        value: e.value
      }
      this.petVacs.push(vac)
    })
  }

  getPetDetail() {
    this.blockUI.start()
    this.petService.getPetDetail(this.id).subscribe({
      next: res => {
        this.pet = res.message
        if (this.pet.tutor) {
          this.pet.tutor_name = this.pet.tutor.name
          this.pet.tutor_document = this.pet.tutor.document
          this.pet.tutor_email = this.pet.tutor.email
          this.pet.tutor_number = this.pet.tutor.number
          this.pet.tutor_address = this.pet.tutor.address
        }
      },
      error: err => {
        console.log('erro')
      }
    }).add(() => { this.blockUI.stop() }
    )
  }

  defVac(i: any) {
    if(this.petVacs[i].status == '0'){
      this.petVacs[i].status = '1'
    } else {
      this.petVacs[i].status = '0'
    }
  }

  cancel() {
    this.route.navigate(['dash1/pets'])
  }

  onSelectFiles(event: any) {
    this.files = event.addedFiles;
    this.selectedFile = event.addedFiles[0];

    this.onPreviewImage();
  }

  createPet() {
    const toastrConfig: Partial<GlobalConfig> = {
      positionClass: 'toast-top-left',
      progressBar: true
    };
    this.blockUI.start()
    this.pet.vacs = this.petVacs
    const formData = this.fDt.create(this.pet);
    if (this.files.length) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    this.petService.createPet(formData).subscribe({
      next: res => {
        this.toastrService.success('Animal cadastrado com sucesso', '', toastrConfig)
      }, error: err => {
        this.toastrService.error('Falha ao cadastrar animal', '', toastrConfig)
      }
    }).add(() => this.blockUI.stop())
  }

  onRemoveFiles(event: any) {
    this.filePath = '';
    this.files.splice(this.files.indexOf(event), 1);
  }

  onPreviewImage() {
    const reader = new FileReader();
    reader.onload = () => this.filePath = reader.result as string;
    reader.readAsDataURL(this.selectedFile);
  }

}
