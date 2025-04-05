interface ProblemType {
  index: string;
  name: string;
  tags: string[];
  rating: number | null;
}
interface ContestType {
  id: number;
  name: string;
  type: string;
  problems: ProblemType[];
}

interface SubmissionType {
  contestId: number;
  problemIndex: string;
  verdict: boolean;
}
interface UserType {
  handle: string;
  country: string;
  rating: number;
  contribution: number;
  avatar: string;
  submissions: SubmissionType[];
}

interface FilterType {
  contestType: Set<string>;
  tags: Set<string>;
  difficultyUpper: number;
  difficultyLower: number;
  sorting: boolean;
  random: boolean;

  userContestStatus: string;
  userProblemStatus: string;
  recommendation: boolean;
}

export type { ContestType, UserType, ProblemType, SubmissionType, FilterType };
