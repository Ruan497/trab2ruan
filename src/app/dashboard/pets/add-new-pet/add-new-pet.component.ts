import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FdService } from 'src/app/services/fd.service';
import { PetsService } from 'src/app/services/pets.service';


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
    private sb: MatSnackBar
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
    this.blockUI.start()
    const formData = this.fDt.create(this.pet);
    formData.append('image', this.selectedFile, this.selectedFile.name);
    this.petService.createPet(formData).subscribe({
      next: res => {
        this.showSuccessMessage('Pet created successfully');

      }, error: err => {
        console.log(err)
      }
    }).add(() => this.blockUI.stop())
  }

  showSuccessMessage(message: string) {
    const snackBarRef = this.snackBar.open(message, 'Close', {
      duration: 5000, // Adjust the duration as needed (in milliseconds)
    });
  
    // Automatically close the snackbar after a few seconds
    setTimeout(() => {
      snackBarRef.dismiss();
    }, 3000); // Adjust the timeout as needed (in milliseconds)
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
