import { Associate } from './associate.model';
import { Skill } from './skill.model';

export class Associate_Skills {
    Id?: Number;
    Associate_Id?: Number;
    Skill_Id?: Number;
    Rating?: Number;
    Associate?: Associate;
    Skill?: Skill;
    constructor(){
        this.Associate = new Associate();
        this.Skill = new Skill();
    }
}