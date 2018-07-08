export class DashBoardData {
  registeredUsers?: Number;
  femaleCandidates?: Number;
  maleCandidates?: Number;
  candidateFreshers?: Number;
  candidatesRated?: Number;
  femaleCandidatesRated?: Number;
  maleCandidatesRated?: Number;
  level1candidates?: Number;
  level2candidates?: Number;
  level3candidates?: Number;
  chartData?: Array<ChartData>;
  constructor() {
    this.chartData = new Array<ChartData>();
  }
}

export class ChartData {
  name?: String;
  color?: String;
  percentage?: Number;
}
