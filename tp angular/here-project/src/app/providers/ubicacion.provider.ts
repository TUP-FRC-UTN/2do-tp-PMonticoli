import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { ubicaciones } from "../interfaces/interfaz";



@Injectable({
    providedIn: 'root'
})
export class UbicacionProvider {
    constructor(private http: HttpClient){}


    private handleError(error: HttpErrorResponse){
        if(error.status === 0){
            console.log("algo pasó, error: " + error.message);
        }
        else{
            console.log("Status code: " + error.status);
            console.log(error);
        }
        return throwError(() => new Error(error.error));
    }

    getAll(): Observable<ubicaciones[]> {
        const url =  "https://prog3.nhorenstein.com/api/geolocalizacion/GetMarcadores";
        return this.http.get<ubicaciones[]>(url).pipe(catchError(this.handleError));
    }
}