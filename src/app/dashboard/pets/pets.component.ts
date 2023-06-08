import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PetsService } from 'src/app/services/pets.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  pets: Array<any> = []

  constructor(
    private service: PetsService,
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
