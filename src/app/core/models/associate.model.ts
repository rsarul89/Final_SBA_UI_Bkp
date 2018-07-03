import { Associate_Skills } from './associate.skills.model';

export class Associate {
  Associate_Id: Number;
  Name?: String;
  Email?: String;
  Gender?: String;
  Mobile?: String;
  Pic?: String;
  Status_Green?: String;
  Status_Blue?: String;
  Status_Red?: String;
  Level_1?: String;
  Level_2?: String;
  Level_3?: String;
  Remark?: String;
  Strength?: String;
  Weakness?: String;
  Other?: String;
  Associate_Skills?: Array<Associate_Skills>;
  constructor() {
    this.Associate_Skills = new Array<Associate_Skills>();
  }
}
