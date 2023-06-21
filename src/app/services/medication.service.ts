import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MedicationService {

    url: string;
    apiUrl: string;

    constructor(private http: HttpClient) {
        this.url = environment.BASE_URL;
        this.apiUrl = environment.API_URL;
    }

    getMedication(options?: any): Observable<any> {
        let params = '';
        for (const key in options) {
            params += `${key}=${options[key]}&`;
        }
        return this.http.get(this.apiUrl + `/medications?${params.slice(0, -1)}`).pipe(map((result: any) => { return result; }));
    }
    getMedicationDetail(id: any): Observable<any> {
        return this.http.get(this.apiUrl + `/medications/${id}`).pipe(map((result: any) => { return result; }));
    }

    createMedication(pet: any) {
        return this.http.post(this.apiUrl + '/medications', pet).pipe(map((result: any) => { return result }))
    }

    generateReportA() {
        return this.http.get(this.apiUrl + `/printA`, { responseType: 'blob' }).pipe(map((result: any) => { return result }))
    }
}
