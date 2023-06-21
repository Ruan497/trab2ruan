import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  pets: Array<any> = []
  paginaAtual = 1;

  constructor(
    private service: ProductsService,
    private route: Router,
    private dialogRef: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPets()
  }

  goToCreation(){
    this.route.navigate(['dash1/novo-produto'])
  }

  showDetails(pet: any) {
    this.route.navigate([`dash1/pets/details/${pet.id}`])
  }

  getPets() {
    this.service.getProds().subscribe({
      next: res => {
        console.log(res)
        this.pets = res.data
      },
      error: err => {
        console.log('erro')
      }
    })
  }
}
