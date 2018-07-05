import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { JsonParserService } from './json-parser.service';
import { Skill, Associate_Skills } from '../models';
import { map } from 'rxjs/operators/map';

@Injectable()
export class SkillService {

    constructor(
        private apiService: ApiService,
        private http: HttpClient,
        private jsonParserService: JsonParserService
    ) { }

    GetAllSkills(): Observable<Array<Skill>> {
        return this.apiService
            .get('/skill/getSkills')
            .pipe(map(data => {
                return data as Array<Skill>;
            }));
    }

    GetSkill(skill: Skill): Observable<Skill> {
        return this.apiService
            .post('/skill/getSkill', skill)
            .pipe(map(data => {
                return data as Skill;
            }));
    }

    AddSkill(skill: Skill): Observable<Skill> {
        return this.apiService
            .post('/skill/addSkill', skill)
            .pipe(map(data => {
                return data as Skill;
            }));
    }

    UpdateSkill(skill: Skill): Observable<Skill> {
        return this.apiService
            .put('/skill/updateSkill', skill)
            .pipe(map(data => {
                return data as Skill;
            }));
    }

    DeleteSkill(skill: Skill): Observable<Skill> {
        return this.apiService
            .post('/skill/deleteSkill', skill)
            .pipe(map(data => {
                return data as Skill;
            }));
    }
}