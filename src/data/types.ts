interface Contest {
  id: number;
  name: string;
  type: string;
}
interface Problem {
  id: string;
  contestId: number;
  index: string;
  name: string;
  tags: string[];
  rating?: number;
}
interface User {
  handle: string;
  country: string;
  rating: number;
  contribution: number;
  avatar: string;
}
interface Filter {
  contestType: Set<string>;
  tags: Set<string>;
  difficultyUpper: number;
  difficultyLower: number;
  sorting: boolean;
  contestStatus: number;
  problemStatus: number;
}

type ContestStatus = Map<number, boolean>;
type ProblemStatus = Map<string, boolean>;

export type { Contest, User, Problem, Filter, ContestStatus, ProblemStatus };
