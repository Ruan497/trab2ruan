import { Component, OnInit } from '@angular/core';
import { PetsService } from 'src/app/services/pets.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  contracts: any = []

  constructor(
    private service: PetsService
  ) { }

  ngOnInit(): void {
    this.getContracts()
  }


  showDetails(contract: any){

  }

  getContracts() {
    this.service.getPets().subscribe({
      next: res => {
        console.log(res)
        this.contracts = res.data
      },
      error: err => {
        console.log('erro')
      }
    })
  }
}
