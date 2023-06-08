import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PetsService {

    url: string;
    apiUrl: string;

    constructor(private http: HttpClient) {
        this.url = environment.BASE_URL;
        this.apiUrl = environment.API_URL;
    }

    getPets(): Observable<any> {
        return this.http.get(this.apiUrl + '/pet').pipe(map((result: any) => { return result; }));
    }

    getPetDetail(id: any): Observable<any> {
        return this.http.get(this.apiUrl + `/pet/${id}`).pipe(map((result: any) => { return result; }));
    }

    createPet(pet: any) {
        return this.http.post(this.apiUrl + '/pet', pet).pipe(map((result: any) => { return result }))
    }

    generateReportA() {
        return this.http.get(this.apiUrl + `/pet/printA`, { responseType: 'blob' }).pipe(map((result: any) => { return result }))
    }
}
