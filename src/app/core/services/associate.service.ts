import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { Associate, Associate_Skills } from '../models';
import { map } from 'rxjs/operators/map';

@Injectable()
export class AssociateService {

    constructor(
        private apiService: ApiService,
        private http: HttpClient
    ) { }

    GetAllAssociates(): Observable<Array<Associate>> {
        return this.apiService
            .get('/associate/getAssociates')
            .pipe(map(data => {
                return data as Array<Associate>;
            }));
    }

    GetAssociate(associate: Associate): Observable<Associate> {
        return this.apiService
            .post('/associate/getAssociate', associate)
            .pipe(map(data => {
                return data as Associate;
            }));
    }

    AddAssociate(associate: Associate): Observable<Associate> {
        return this.apiService
            .post('/associate/addAssociate', associate)
            .pipe(map(data => {
                return data as Associate;
            }));
    }

    UpdateAssociate(associate: Associate): Observable<Associate> {
        return this.apiService
            .put('/associate/updateAssociate', associate)
            .pipe(map(data => {
                return data as Associate;
            }));
    }

    DeleteAssociate(associate: Associate): Observable<Associate> {
        return this.apiService
            .post('/Associate/deleteAssociate', associate)
            .pipe(map(data => {
                return data as Associate;
            }));
    }
}