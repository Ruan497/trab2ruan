import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class VacsService {

    url: string;
    apiUrl: string;

    constructor(private http: HttpClient) {
        this.url = environment.BASE_URL;
        this.apiUrl = environment.API_URL;
    }

    getVacs(): Observable<any> {
        return this.http.get(this.apiUrl + '/vaccines').pipe(map((result: any) => { return result; }));
    }

    getVacDetail(id: any): Observable<any> {
        return this.http.get(this.apiUrl + `/vaccines/${id}`).pipe(map((result: any) => { return result; }));
    }

    deleteVac(id: any): Observable<any> {
        return this.http.delete(this.apiUrl + `/vaccines/${id}`).pipe(map((result: any) => { return result; }));
    }

    createVac(pet: any) {
        return this.http.post(this.apiUrl + '/vaccines', pet).pipe(map((result: any) => { return result }))
    }
}
