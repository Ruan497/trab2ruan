import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetsService } from 'src/app/services/pets.service';

@Component({
  selector: 'app-services-details',
  templateUrl: './services-details.component.html',
  styleUrls: ['./services-details.component.css']
})
export class ServicesDetailsComponent implements OnInit {

  id: any
  contract: any = {}

  constructor(
    private route: ActivatedRoute,
    private service: PetsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.id = res.id
    })
    this.getContractDetail()
  }

  downloadClipedDoc() {
    console.log('teste')
  }

  getContractDetail() {
    this.service.getPetDetail(this.id).subscribe({
      next: res => {
        this.contract = res.data
      },
      error: err => {
        console.log('erro')
      }
    })
  }
}
