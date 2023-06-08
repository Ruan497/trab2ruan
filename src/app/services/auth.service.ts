import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    url: string;
    apiUrl: string;

    constructor(private http: HttpClient) {
        this.url = environment.BASE_URL;
        this.apiUrl = environment.API_URL;
    }

    // API
    login(user: any): Observable<any> {
        return this.http.post(this.apiUrl + '/auth/login', user).pipe(map((result: any) => { return result; }));
    }

    recoverPass(user: any): Observable<any> {
        return this.http.post(this.apiUrl + '/forgot-password', user).pipe(map((result: any) => { return result; }));
    }

    updatePass(user: any): Observable<any> {
        return this.http.put(this.apiUrl + `/pessoa/senha/${user.id}`, user).pipe(map((result: any) => { return result; }));
    }

    userLogged() {
        return this.http.post(this.apiUrl + `/auth/me`, '').pipe(map((result: any) => { return result; }));
    }

    logout() {
        return this.http.post(this.apiUrl + `/auth/logout`, '').pipe(map((result: any) => { return result; }));
    }

    resetPassword(user: any) {
        return this.http.post(this.apiUrl + `/reset-password`, user).pipe(map((result: any) => { return result; }));
    }

    firstAccess(user: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/user/first-access/${user.id}`, user);
    }

}
