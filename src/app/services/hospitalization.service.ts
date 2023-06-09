import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HospitalizationService {

    url: string;
    apiUrl: string;

    constructor(private http: HttpClient) {
        this.url = environment.BASE_URL;
        this.apiUrl = environment.API_URL;
    }

    getHospitalizations(): Observable<any> {
        return this.http.get(this.apiUrl + '/hospitalization').pipe(map((result: any) => { return result; }));
    }

    getHospitalizationDetail(id: any): Observable<any> {
        return this.http.get(this.apiUrl + `/hospitalization/${id}`).pipe(map((result: any) => { return result; }));
    }

    createHospitalization(pet: any) {
        return this.http.post(this.apiUrl + '/hospitalization', pet).pipe(map((result: any) => { return result }))
    }

    generateReportA() {
        return this.http.get(this.apiUrl + `/pet/printA`, { responseType: 'blob' }).pipe(map((result: any) => { return result }))
    }
}
