import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetsService } from 'src/app/services/pets.service';
import { MatDialog } from '@angular/material/dialog';
import { HospitalizationComponent } from '../hospitalization/hospitalization.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';



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

  constructor(
    private resolveAssetPath: Renderer2,
    private route: ActivatedRoute,
    private service: PetsService,
    private dialogRef: MatDialog,
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.id = res.id
    })
    this.getPetDetail()
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

  uploadDoc() {
    const dialog = this.dialogRef.open(HospitalizationComponent, {
      width: '600px'
    })
  }

  initHospitalization() {
    this.router.navigate([`dash1/pets/hospitalization/${this.id}`])
  }

  getPetDetail() {
    this.service.getPetDetail(this.id).subscribe({
      next: res => {
        this.pet = res.message
      },
      error: err => {
        console.log('erro')
      }
    })
  }
}
