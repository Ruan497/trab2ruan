import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddMedicationComponent } from '../hospitalizations/add-medication/add-medication.component';

@Component({
  selector: 'app-repor-pet',
  templateUrl: './repor-pet.component.html',
  styleUrls: ['./repor-pet.component.css']
})
export class ReporPetComponent implements OnInit {


  dt: any = {}
  constructor(public dialogRef: MatDialogRef<AddMedicationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    if(this.data){
      this.dt = this.data
    }
  }

}
