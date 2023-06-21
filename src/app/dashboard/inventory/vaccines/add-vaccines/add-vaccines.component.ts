import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ProductsService } from 'src/app/services/products.service';
import moment from 'moment';
import { MedicationService } from 'src/app/services/medication.service';
import { GlobalConfig, ToastrService } from 'ngx-toastr';
import { PetVacService } from 'src/app/services/pet-vac.service';
import { VacsService } from 'src/app/services/vac.service';

@Component({
  selector: 'app-add-vaccines',
  templateUrl: './add-vaccines.component.html',
  styleUrls: ['./add-vaccines.component.css']
})
export class AddVaccinesComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;


  medication: any = {}
  filterMed!: string | { id: number, name: string, description: string, value: number };
  timeout: any
  medications: Array<any> = []
  isLoadingSearch: boolean = false;
  totalPeriod: any
  actualValue: any = 0.00
  fractionament = '1'
  drops = '0'
  finalPrice = 0.00
  vaccine: any = {}

  constructor(
    public dialogRef: MatDialogRef<AddVaccinesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private prodService: ProductsService,
    private medService: MedicationService,
    private toastrService: ToastrService,
    private vacService: VacsService
  ) { }

  ngOnInit(): void {
    if(this.data.id){
      this.vaccine = this.data
    }
    this.medication.hospitalization_id = this.data.id
    this.medication.pet_id = this.data.pet_id
  }

  viewValue() {
    if (this.medication.start && this.medication.end) {
      this.totalQty()
    }
  }

  createMed() {
    const toastrConfig: Partial<GlobalConfig> = {
      positionClass: 'toast-top-left',
      progressBar: true
    };
    this.blockUI.start()
    this.vacService.createVac(this.vaccine).subscribe({
      next: res => {
        this.toastrService.success('Vacina cadastrada com sucesso', '', toastrConfig)
        this.closeModal(res)
      }
    }).add(this.blockUI.stop())
  }

  getProds(search: any) {
    this.blockUI.start()
    this.prodService.getProds({ search: search }).subscribe({
      next: res => {
        this.medications = res.data
      }
    }).add(() => this.blockUI.stop())
  }

  defDrops() {
    if (this.drops === '1') {
      this.drops = '0'
    } else {
      this.drops = '1'
    }
  }

  calculaNumMeses(add = 1, adicionaAntesCalcular = 0) {
    let result = 0;
    const dataMes = moment(this.medication.start);
    const data2 = moment(this.medication.end);

    dataMes.add(adicionaAntesCalcular, 'month');

    while (dataMes.isBefore(data2)) {
      // Se tem mais de 6 dias no último mes, acrescenta. Ex: 01/01/2020 a 07/02/2020 conta 2
      if (data2.diff(dataMes, 'day') > 5) {
        result++;
      }

      dataMes.add(add, 'month');
    }

    return result;
  }


  async totalQty() {
    if (this.medication.frequency && this.medication.toPetQuantity) {

      const data_inicial = new Date(this.medication.start);
      const data_final = new Date(this.medication.end);
      const diffEmMilissegundos = Math.abs(data_final.getTime() - data_inicial.getTime());
      const qtdeDias = Math.ceil(diffEmMilissegundos / (1000 * 60 * 60 * 24));
      const qtdeEmSemanas = Math.ceil(diffEmMilissegundos / (1000 * 60 * 60 * 24 * 7));

      let price = 0;
      let result = 0;
      const qtde = +this.medication.toPetQuantity;

      /**
       * 4 = Mensal
       */
      if (this.medication.frequency == '4') {
        const add = 1
        const meses = this.calculaNumMeses(add);
        result = (qtde * meses);
      }

      // Diaria
      if (this.medication.frequency == '2') {
        result = qtde * qtdeDias;
      }

      // Semana
      if (this.medication.frequency == '3') {
        result = qtde * Math.ceil(qtdeEmSemanas * qtde)
      }

      // 36/36 h
      if (this.medication.frequency == '6') {
        result = qtde * Math.ceil(qtdeDias * 24 / 36);
      }

      // 48/48 h
      if (this.medication.frequency == '7') {
        result = qtde * Math.ceil(qtdeDias * 24 / 48);
      }

      // 72/72 h
      if (this.medication.frequency == '8') {
        result = qtde * Math.ceil(qtdeDias * 24 / 72);
      }

      // 96/96 h
      if (this.medication.frequency == '9') {
        result = qtde * Math.ceil(qtdeDias * 24 / 96);
      }

      if (this.medication.toPetQuantity && this.medication.itemquantity) {
        if (this.medication.item_unity == 2 && this.drops == '1') {
          let gotasMl = this.medication.toPetQuantity / 20
          gotasMl = gotasMl / this.medication.itemquantity
          result = Math.ceil(result * gotasMl)
        }
      }

      price = this.actualValue / this.medication.itemquantity;
      console.log('valor:', price)
      console.log('res:', result)
      price = price * result

      this.totalPeriod = result.toFixed(0);
      this.medication.qtde_total = this.totalPeriod;
      this.finalPrice = price
      this.medication.total_value = this.finalPrice
    }
  }


  doFilterMeasure() {
    if (!this.filterMed && ((this.filterMed as string).length === 0
      || !Object.keys((this.filterMed as any)).length)) {
      delete this.medication.medication_id;
      return;
    }

    if (typeof this.filterMed === 'object') {
      this.medication.medication_id = this.filterMed.id
      this.actualValue = this.filterMed.value
      return;
    }

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => this.getProds(this.filterMed as string), 1000);
  }

  displayMeasure(med: { id: number, name: string, description: string, value: number }) {
    return med ? med.name : '';
  }

  closeModal(res?: any) {
    this.dialogRef.close(res);
  }
}