const impact = {};
const severeImpact = {};

    const displayData = (input) => {
    const impactTotal = input.reportedCases * 10;
    const severeImpactTotal = input.reportedCases * 50;
    let timetoElapse = input.timeToElapse;
    const hospitalbeds = input.totalHospitalBeds;
    const averageDailyIncome = input.region.avgDailyIncomeInUSD;
    const averageDailyIncomePopulation = input.region.avgDailyIncomePopulation;
  
    if (input.periodType === 'months') {
      timetoElapse = input.timeToElapse * 30;
    } else if (input.periodType === 'weeks') {
      timetoElapse = input.timeToElapse * 7;
    }
    const currentlyInfectedImpact = impactTotal * (2 ** Math.trunc(timetoElapse / 3));
    const currentlyInfectedSevere = severeImpactTotal * (2 ** Math.trunc(timetoElapse / 3));
    const severeCasesByRequestedTimeImpact = (15 / 100) * currentlyInfectedImpact;
    const numberofhospitalbeds = Math.trunc(hospitalbeds * (35 / 100));
    const hospitalBedsByRequestedTimeImpact = numberofhospitalbeds
    - (severeCasesByRequestedTimeImpact - 1);
    const casesForICUByRequestedTimeImpact = Math.trunc((5 / 100) * currentlyInfectedImpact);
    const casesForVentilatorsByRequestedTimeImpact = Math.trunc((2 / 100) * currentlyInfectedImpact);
    const severeCasesByRequestedTimeSevere = (15 / 100) * currentlyInfectedSevere;
    const hospitalBedsByRequestedTimeSevere = numberofhospitalbeds
    - (severeCasesByRequestedTimeSevere - 1);
    const casesForICUByRequestedTimeSevere = Math.trunc((5 / 100) * currentlyInfectedSevere);
    const casesForVentilatorsByRequestedTimeSevere = Math.trunc((2 / 100) * currentlyInfectedSevere);
    const dollarsInFlightImpact = Math.trunc((currentlyInfectedImpact
      * averageDailyIncomePopulation * averageDailyIncome) / timetoElapse);
    const dollarsInFlightSevere = Math.trunc((currentlyInfectedSevere
      * averageDailyIncomePopulation * averageDailyIncome) / timetoElapse);
  
    impact.currentlyInfected = impactTotal;
    impact.infectionsByRequestedTime = currentlyInfectedImpact;
    impact.severeCasesByRequestedTime = severeCasesByRequestedTimeImpact;
    impact.hospitalBedsByRequestedTime = hospitalBedsByRequestedTimeImpact;
    impact.casesForICUByRequestedTime = casesForICUByRequestedTimeImpact;
    impact.casesForVentilatorsByRequestedTime = casesForVentilatorsByRequestedTimeImpact;
    impact.dollarsInFlight = dollarsInFlightImpact;
    severeImpact.currentlyInfected = severeImpactTotal;
    severeImpact.infectionsByRequestedTime = currentlyInfectedSevere;
    severeImpact.severeCasesByRequestedTime = severeCasesByRequestedTimeSevere;
    severeImpact.hospitalBedsByRequestedTime = hospitalBedsByRequestedTimeSevere;
    severeImpact.casesForICUByRequestedTime = casesForICUByRequestedTimeSevere;
    severeImpact.casesForVentilatorsByRequestedTime = casesForVentilatorsByRequestedTimeSevere;
    severeImpact.dollarsInFlight = dollarsInFlightSevere;
  };
exports.getEstimations = (req, res, next) => {
    displayData(req.body);
    const result = { impact, severeImpact };
    res.status(200).json(result);
};
