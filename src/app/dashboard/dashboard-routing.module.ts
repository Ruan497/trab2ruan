import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PetsComponent } from './pets/pets.component';
import { AddNewPetComponent } from './pets/add-new-pet/add-new-pet.component';
import { PetDetailsComponent } from './pets/pet-details/pet-details.component';
import { GraphicReportsComponent } from './reports/graphic-reports/graphic-reports.component';
import { AddHospitalizationComponent } from './pets/add-hospitalization/add-hospitalization.component';
import { HospitalizationsComponent } from './hospitalizations/hospitalizations.component';
import { HospitalizationsDetailComponent } from './hospitalizations/hospitalizations-detail/hospitalizations-detail.component';
import { ProductsComponent } from './inventory/products/products.component';
import { AddProductComponent } from './inventory/products/add-product/add-product.component';
import { VaccinesComponent } from './inventory/vaccines/vaccines.component';

const routes: Routes = [
    {
        path: 'dash1', component: DashboardComponent,
        children: [
            {
                path: 'pets', component: PetsComponent
            },
            {
                path: 'hospitalizations', component: HospitalizationsComponent
            },
            {
                path: 'add-pets', component: AddNewPetComponent
            },
            {
                path: 'add-pets/:id', component: AddNewPetComponent
            },
            {
                path: 'novo-produto', component: AddProductComponent
            },
            {
                path: 'reports', component: GraphicReportsComponent
            },
            {
                path: 'medicamentos', component: ProductsComponent
            },
            {
                path: 'vacinas', component: VaccinesComponent
            },
            {
                path: 'pets/details/:id', component: PetDetailsComponent
            },
            {
                path: 'hospitalizations/details/:id', component: HospitalizationsDetailComponent
            },
            {
                path: 'pets/hospitalization/:id', component: AddHospitalizationComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
