import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FdService } from 'src/app/services/fd.service';
import { PetsService } from 'src/app/services/pets.service';
import { ToastrService, GlobalConfig } from 'ngx-toastr';


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

  constructor(
    private petService: PetsService,
    private fDt: FdService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.pet.species = '1';
  }

  onSelectFiles(event: any) {
    this.files = event.addedFiles;
    this.selectedFile = event.addedFiles[0];

    this.onPreviewImage();
  }

  createPet() {
    const toastrConfig: Partial<GlobalConfig> = {
      positionClass: 'toast-top-right',
      progressBar: true
    };
    this.blockUI.start()
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
