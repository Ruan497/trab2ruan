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

  hospitalizations: Array<any> = []

  constructor(
    private service: PetsService,
    private service2: HospitalizationService,
    private route: Router,
    private dialogRef: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPets()
  }

  goToCreation() {
    this.route.navigate(['dash1/add-pets'])
  }

  showDetails(pet: any) {
    this.route.navigate([`dash1/hospitalizations/details/${pet.id}`])
  }

  getPets() {
    this.service2.getHospitalizations().subscribe({
      next: res => {
        this.hospitalizations = res.data
        this.hospitalizations.forEach((e, i) => {
          this.hospitalizations[i].pet.image = `${environment.BASE_URL}/storage/${e.pet.image}`
        })
      },
      error: err => {
        console.log('erro')
      }
    })
  }
}
