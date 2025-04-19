interface ContestType {
  id: number;
  name: string;
  type: string;
}
interface ProblemType {
  id: string;
  index: string;
  contestId: number;
  name: string;
  tags: string[];
  rating?: number;
}
interface UserType {
  handle: string;
  country: string;
  rating: number;
  contribution: number;
  avatar: string;
}
interface FilterType {
  contestType: Set<string>;
  tags: Set<string>;
  difficultyUpper: number;
  difficultyLower: number;
  sorting: boolean;
  random: boolean;

  userProblemStatus: string;
  recommendation: boolean;
}

export type { ContestType, UserType, ProblemType, FilterType };
