interface ContestT {
  id: number;
  name: string;
  type: string;
}
interface ProblemT {
  id: string;
  contestId: number;
  index: string;
  name: string;
  tags: Set<string>;
  rating?: number;
}
interface UserT {
  handle: string;
  country: string;
  rating: number;
  contribution: number;
  avatar: string;
}
interface FilterT {
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

export type {
  ContestT,
  UserT,
  ProblemT,
  FilterT,
  ContestStatus,
  ProblemStatus,
};
