import { Associate_Skills } from './associate.skills.model';

export class Skill {
    Skill_Id?: Number;
    Skill_Name?: String;
    Associate_Skills?: Array<Associate_Skills>;
    constructor(){
        this.Associate_Skills = new Array<Associate_Skills>();
    }
}