import { Associate_Skills } from './associate.skills.model';

export class Associate {
  Associate_Id: Number;
  Name?: String;
  Email?: String;
  Gender?: String;
  Mobile?: String;
  Pic?: String;
  Status_Green?: Boolean;
  Status_Blue?: Boolean;
  Status_Red?: Boolean;
  Level_1?: Boolean;
  Level_2?: Boolean;
  Level_3?: Boolean;
  Remark?: String;
  Strength?: String;
  Weakness?: String;
  Other?: String;
  Associate_Skills?: Array<Associate_Skills>;
  constructor() {
    this.Associate_Skills = new Array<Associate_Skills>();
  }
}
