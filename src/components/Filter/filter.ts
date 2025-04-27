import type {
  ContestStatus,
  ContestT,
  FilterT,
  ProblemStatus,
  ProblemT,
} from "../../data/types";

const filterContests = (
  contest: ContestT,
  filter: FilterT,
  contestStatus: ContestStatus | undefined
) => {
  if (filter.contestType.size != 0 && !filter.contestType.has(contest.type)) {
    return false;
  }

  const status = filter.contestStatus;
  if (
    !(
      contestStatus === undefined ||
      status == 1 ||
      (status % 2 == 0 && contestStatus.get(contest.id) == undefined) ||
      (status % 3 == 0 && contestStatus.get(contest.id) == false) ||
      (status % 5 == 0 && contestStatus.get(contest.id) == true)
    )
  ) {
    return false;
  }

  return true;
};

const filterProblems = (
  problem: ProblemT,
  filter: FilterT,
  problemStatus: ProblemStatus | undefined
) => {
  let flag: boolean = true;

  filter.tags.forEach((e) => {
    if (!problem.tags.has(e)) {
      flag = false;
    }
  });

  // @ts-ignore: This comparison appears to be unintentional because the types 'true' and 'false' have no overlap.
  if (flag === false) {
    return false;
  }

  if (
    filter.difficultyLower != -1 &&
    (problem.rating == undefined || problem.rating > filter.difficultyLower)
  ) {
    return false;
  }
  if (
    filter.difficultyUpper != -1 &&
    (problem.rating == undefined || problem.rating < filter.difficultyUpper)
  ) {
    return false;
  }

  const status = filter.problemStatus;
  if (
    !(
      problemStatus === undefined ||
      status == 1 ||
      (status % 2 == 0 && problemStatus.get(problem.id) == undefined) ||
      (status % 3 == 0 && problemStatus.get(problem.id) == false) ||
      (status % 5 == 0 && problemStatus.get(problem.id) == true)
    )
  ) {
    return false;
  }

  return true;
};
export { filterContests, filterProblems };
