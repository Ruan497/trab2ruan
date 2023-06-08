import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HospitalizationService } from 'src/app/services/hospitalization.service';
import { PetsService } from 'src/app/services/pets.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-hospitalizations',
  templateUrl: './hospitalizations.component.html',
  styleUrls: ['./hospitalizations.component.css']
})
export class HospitalizationsComponent implements OnInit {

  pets: Array<any> = []

  constructor(
    private service: PetsService,
    private service2: HospitalizationService,
    private route: Router,
    private dialogRef: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPets()
  }

  goToCreation(){
    this.route.navigate(['dash1/add-pets'])
  }

  showDetails(pet: any) {
    this.route.navigate([`dash1/pets/details/${pet.id}`])
  }

  getPets() {
    this.service.getPets().subscribe({
      next: res => {
        console.log(res)
        this.pets = res.data
        this.pets.forEach((e, i) => {
          this.pets[i].image = `${environment.BASE_URL}/storage/${e.image}`
        })
      },
      error: err => {
        console.log('erro')
      }
    })
  }
}
