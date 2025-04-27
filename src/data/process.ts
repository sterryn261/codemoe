import type { Problem, ProblemStatus } from "./types";

const contestType = [
  "Kotlin",
  "April Fools",
  "Global",
  "Educational",
  "Div. 1 + Div. 2",
  "Div. 1",
  "Div. 2",
  "Div. 3",
  "Div. 4",
];

const contestTypeChecker = (name: string): string => {
  for (const i of contestType) {
    if (name.indexOf(i) !== -1) {
      return i;
    }
  }
  return "Other";
};

const processContestStatus = (
  problem: Problem[],
  problemStatus: ProblemStatus
) => {
  let contestStatus = new Map<number, boolean>();

  let currentContest = problem[0].contestId;
  let tried = false;
  let fullAcceptance = true;

  problem.forEach((e) => {
    if (currentContest != e.contestId) {
      if (tried == true) {
        contestStatus.set(
          currentContest,
          fullAcceptance == true ? true : false
        );
      }

      currentContest = e.contestId;
      tried = false;
      fullAcceptance = true;
    }
    const status = problemStatus.get(e.id);

    if (status == undefined || status == false) {
      fullAcceptance == false;
    }
    if (status != undefined) {
      tried == true;
    }
  });
  contestStatus.set(currentContest, fullAcceptance == true ? true : false);

  return contestStatus;
};

export { contestTypeChecker, processContestStatus };
