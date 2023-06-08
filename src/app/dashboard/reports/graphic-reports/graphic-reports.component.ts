import { Component, OnInit, Renderer2 } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-graphic-reports',
  templateUrl: './graphic-reports.component.html',
  styleUrls: ['./graphic-reports.component.css']
})
export class GraphicReportsComponent implements OnInit {

  tipo: any
  timeout: any
  @BlockUI() blockUI!: NgBlockUI;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  defType(event: any) {
    this.tipo = event.target.value
  }

  generateReport() {
    this.blockUI.start()
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.generateRep(), 6000);
  }

  generateRep() {
    this.blockUI.stop()
    if (this.tipo == '2') {
      const filePath = 'assets/images/meta-chart.png';
      const url = this.fun(filePath);
      window.open(url);
    }
    else if (this.tipo == '3') {
      const filePath = 'assets/images/meta-chart2.png';
      const url = this.fun(filePath);
      window.open(url);
    } else if (this.tipo == '5') {
      const filePath = 'assets/images/meta-chart4.png';
      const url = this.fun(filePath);
      window.open(url);
    } else if (this.tipo == '1') {
      const filePath = 'assets/images/arquivo.pdf';
      const url = this.fun(filePath);
      window.open(url);
    } else if (this.tipo == '6') {
      const filePath = 'assets/images/arquivo2.pdf';
      const url = this.fun(filePath);
      window.open(url);
    }
  }

  fun(filePath: string): string {
    const baseHref = this.renderer.selectRootElement('base').href;
    return `${baseHref}${filePath}`;
  }
}
