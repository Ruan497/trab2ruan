import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
  search: string = ''
  activatedRoute = 'pets'
  public isProfileCompleted: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  contain(text: string) {
    if (this.search && text.includes(this.search.toLowerCase())) {
      return true
    } else {
      return false
    }
  }

  setRouteActivated(route: string) {
    this.activatedRoute = route;
  }

  logout() {
    this.blockUI.start();
    this.authService.logout().subscribe({
      next: (result: any) => {

        localStorage.removeItem('@hospitalar_token');
        this.router.navigate(['/']);
      },
    }).add(() => this.blockUI.stop());
  }

  closeMenu(id: any) {
    let element = document.getElementById(`${id}`);

    if (element) {
      element.classList.contains('menu-is-opening') ? element.classList.remove('menu-is-opening') : null;
      element.classList.contains('menu-open') ? element.classList.remove('menu-open') : null;
    }
  }

}
