import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PetDocsService {

    url: string;
    apiUrl: string;

    constructor(private http: HttpClient) {
        this.url = environment.BASE_URL;
        this.apiUrl = environment.API_URL;
    }

    getProds(options?: any): Observable<any> {
        let params = '';
        for (const key in options) {
            params += `${key}=${options[key]}&`;
        }
        return this.http.get(this.apiUrl + `/pet-docs?${params.slice(0, -1)}`).pipe(map((result: any) => { return result; }));
    }

    getProdDetail(id: any): Observable<any> {
        return this.http.get(this.apiUrl + `/pet-docs/${id}`).pipe(map((result: any) => { return result; }));
    }

    delProd(id: any): Observable<any> {
        return this.http.delete(this.apiUrl + `/pet-docs/${id}`).pipe(map((result: any) => { return result; }));
    }

    createProd(pet: any) {
        return this.http.post(this.apiUrl + '/pet-docs', pet).pipe(map((result: any) => { return result }))
    }
}
