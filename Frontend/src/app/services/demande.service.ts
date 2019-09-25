import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Demande } from '../models/demande.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class DemandeService {

    baseURL = "http://127.0.0.1:8000/api/demandes/";
    httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.authService.getToken()
    })
    STATUS = [
        "En attente de la validation du supérieur hierarchique",
        "En attente de la validation sécurité",
        "En attente de la configuration de l'admin",
        "Demande validée, VPN ouvert",
        "Demande expirée, VNP fermé",
        "Refus du supérieur hierarchique",
        "Redus de la sécurité",
    ]
    constructor(private http: HttpClient, private authService: AuthService) {

    }

    sendDemande(demande): Observable<HttpResponse<Demande>> {
        let url = this.baseURL + "create/";
        return this.http.post<Demande>(url, demande, { headers: this.httpHeaders, observe: 'response' });
    }


    getDemandeWithId(id: number): Observable<HttpResponse<Demande>> {
        let url = this.baseURL + id + "/";
        return this.http.get<Demande>(url, { headers: this.httpHeaders, observe: 'response' });
    }


    getDemandeEnAttenteOf(username: string): Observable<HttpResponse<Demande[]>> {
        let url = this.baseURL + "en-attente/" + username + "/";
        return this.http.get<Demande[]>(url, { headers: this.httpHeaders, observe: 'response' }).pipe(
            tap(_ => console.log(`Fetched ${this.getDemandeEnAttenteOf.name} ${username} from ${url}`)),
            catchError(this.handleError)
        )
    }


    getDemandeAccepteesOf(username: string): Observable<HttpResponse<Demande[]>> {
        let url = this.baseURL + "acceptees/" + username + "/";
        return this.http.get<Demande[]>(url, { headers: this.httpHeaders, observe: 'response' }).pipe(
            tap(_ => console.log(`Fetched ${this.getDemandeAccepteesOf.name} ${username} from ${url}`)),
            catchError(this.handleError)
        )
    }


    getDemandeRefuseesOf(username: string): Observable<HttpResponse<Demande[]>> {
        let url = this.baseURL + "refusees/" + username + "/";
        return this.http.get<Demande[]>(url, { headers: this.httpHeaders, observe: 'response' }).pipe(
            tap(_ => console.log(`Fetched ${this.getDemandeRefuseesOf.name} ${username} from ${url}`)),
            catchError(this.handleError)
        )
    }

    getDemandeValideesSecurite(): Observable<HttpResponse<Demande[]>> {
        let url = this.baseURL + "validees/securite/";
        return this.http.get<Demande[]>(url, { headers: this.httpHeaders, observe: 'response' }).pipe(
            tap(_ => console.log(`Fetched ${this.getDemandeValideesSecurite.name} from ${url}`)),
            catchError(this.handleError)
        )
    }


    getDemandeEnAttenteHierarchiqueOf(username: string): Observable<HttpResponse<Demande[]>> {
        let url = this.baseURL + "en-attente/hierarchie/" + username + "/";
        return this.http.get<Demande[]>(url, { headers: this.httpHeaders, observe: 'response' }).pipe(
            tap(_ => console.log(`Fetched ${this.getDemandeEnAttenteHierarchiqueOf.name} ${username} from ${url}`)),
            catchError(this.handleError)
        )
    }


    getDemandeEnAttenteSecuriteOf(): Observable<HttpResponse<Demande[]>> {
        let url = this.baseURL + "en-attente/securite/";
        return this.http.get<Demande[]>(url, { headers: this.httpHeaders, observe: 'response' }).pipe(
            tap(_ => console.log(`Fetched ${this.getDemandeEnAttenteSecuriteOf.name} from ${url}`)),
            catchError(this.handleError)
        )
    }


    getDemandeEnAttenteAdminOf(): Observable<HttpResponse<Demande[]>> {
        let url = this.baseURL + "en-attente/admin/";
        return this.http.get<Demande[]>(url, { headers: this.httpHeaders, observe: 'response' }).pipe(
            tap(_ => console.log(`Fetched ${this.getDemandeEnAttenteAdminOf.name} from ${url}`)),
            catchError(this.handleError)
        )
    }


    acceptDemandeWithId(id: number): Observable<HttpResponse<Demande>> {
        let url = this.baseURL + "validation-hierarchie/" + id + "/";
        return this.http.put<Demande>(url, null, { headers: this.httpHeaders, observe: 'response' }).pipe(
            tap(_ => console.log(`Validated demande with id ${id} at ${this.baseURL + id + "/"}`))
        );
    }


    validateDemandeWithId(id: number): Observable<HttpResponse<Demande>> {
        let url = this.baseURL + "validation-securite/" + id + "/";
        return this.http.put<Demande>(url, null, { headers: this.httpHeaders, observe: 'response' }).pipe(
            tap(_ => console.log(`Validated demande with id ${id} at ${this.baseURL + id + "/"}`))
        );
    }


    configureDemandeWithId(id: number): Observable<HttpResponse<Demande>> {
        let url = this.baseURL + "validation-admin/" + id + "/";
        return this.http.put<Demande>(url, null, { headers: this.httpHeaders, observe: 'response' }).pipe(
            tap(_ => console.log(`Configured demande with id ${id} at ${this.baseURL + id + "/"}`))
        );
    }


    rejectDemandeWithId(id: number): Observable<HttpResponse<Demande>> {
        let url = this.baseURL + "refus-hierarchie/" + id + "/";
        return this.http.put<Demande>(url, null, { headers: this.httpHeaders, observe: 'response' }).pipe(
            tap(_ => console.log(`Rejected demande with id ${id} at ${this.baseURL + id + "/"}`))
        );
    }


    declineDemandeWithId(id: number): Observable<HttpResponse<Demande>> {
        let url = this.baseURL + "refus-securite/" + id + "/";
        return this.http.put<Demande>(url, null, { headers: this.httpHeaders, observe: 'response' }).pipe(
            tap(_ => console.log(`Rejected demande with id ${id} at ${this.baseURL + id + "/"}`))
        );
    }


    expirationDemandeWithId(id: number): Observable<HttpResponse<Demande>> {
        let url = this.baseURL + "expiration-admin/" + id + "/";
        return this.http.put<Demande>(url, null, { observe: 'response' }).pipe(
            tap(_ => console.log(`Expiration demande with id ${id} at ${this.baseURL + id + "/"}`))
        );
    }



    //Error handling

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,Hierarchique
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };
}