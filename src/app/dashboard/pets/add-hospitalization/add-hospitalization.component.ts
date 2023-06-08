import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { HospitalizationService } from 'src/app/services/hospitalization.service';
import { PetsService } from 'src/app/services/pets.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-add-hospitalization',
  templateUrl: './add-hospitalization.component.html',
  styleUrls: ['./add-hospitalization.component.css']
})
export class AddHospitalizationComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;

  id: any
  pet: any = {}
  hospitalization: any = {}

  constructor(
    private route: ActivatedRoute,
    private service: PetsService,
    private service2: HospitalizationService,

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.id = res.id
      this.hospitalization.pet_id = res.id
    })
    this.getPetDetail()
  }

  addHospitalization() {
    this.blockUI.start()
    this.service2.createHospitalization(this.hospitalization).subscribe({
      next: res =>{

      },
      error: err =>{

      }
    }).add(()=>this.blockUI.stop())
  }

  getPetDetail() {
    this.service.getPetDetail(this.id).subscribe({
      next: res => {
        this.pet = res.message
        this.pet.image = `${environment.BASE_URL}/storage/${this.pet.image}`
      },
      error: err => {
        console.log('erro')
      }
    })
  }
}