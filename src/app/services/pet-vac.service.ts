import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PetVacService {

    url: string;
    apiUrl: string;

    constructor(private http: HttpClient) {
        this.url = environment.BASE_URL;
        this.apiUrl = environment.API_URL;
    }

    getVacs(options?:any): Observable<any> {
        let params = '';
        for (const key in options) {
            params += `${key}=${options[key]}&`;
        }
        return this.http.get(this.apiUrl + `/pet-vacines?${params.slice(0, -1)}`).pipe(map((result: any) => { return result; }));
    }

    getVacDetail(id: any): Observable<any> {
        return this.http.get(this.apiUrl + `/pet-vacines/${id}`).pipe(map((result: any) => { return result; }));
    }

    createVac(pet: any) {
        return this.http.post(this.apiUrl + '/pet-vacines', pet).pipe(map((result: any) => { return result }))
    }
}
