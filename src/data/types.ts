interface ProblemType {
  id: string;
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
interface UserType {
  handle: string;
  country: string;
  rating: number;
  contribution: number;
  avatar: string;
  submissions: Map<string, boolean>;
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
