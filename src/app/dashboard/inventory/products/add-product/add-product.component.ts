import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { GlobalConfig, ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  product: any = {}

  constructor(
    private toastrService: ToastrService,
    private prodService: ProductsService,
    private route: Router,
  ) { }

  ngOnInit(): void {
  }

  createProd() {
    const toastrConfig: Partial<GlobalConfig> = {
      positionClass: 'toast-top-left',
      progressBar: true
    }
    this.blockUI.start()
    this.prodService.createProd(this.product).subscribe({
      next: res => {
        this.toastrService.success('Produto cadastrado com sucesso', '', toastrConfig)
        this.route.navigate(['dash1/medicamentos'])
      }, error: err => {
        this.toastrService.error('Falha ao cadastrar produto', '', toastrConfig)
      }
    })
  }

}
