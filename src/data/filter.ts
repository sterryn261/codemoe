import type { ContestType, FilterType, UserType } from "./types";

const filterFunc = (
  filterData: FilterType,
  input: ContestType[],
  uData: UserType | null
): ContestType[] => {
  let data = [...input];

  if (filterData.contestType.size !== 0) {
    data = data.filter((e) => {
      return filterData.contestType.has(e.type);
    });
  }

  if (filterData.tags.size !== 0) {
    for (let i of data) {
      i.problems = i.problems.filter((e) => {
        for (let j of e.tags) {
          if (filterData.tags.has(j)) {
            return true;
          }
        }
        return false;
      });
    }
  }

  if (filterData.difficultyLower > 0) {
    for (let i of data) {
      i.problems = i.problems.filter((e) => {
        return !(e.rating === null) && e.rating >= filterData.difficultyLower;
      });
    }
  }

  if (filterData.difficultyUpper > 0) {
    for (let i of data) {
      i.problems = i.problems.filter((e) => {
        return !(e.rating === null) && e.rating <= filterData.difficultyUpper;
      });
    }
  }

  if (filterData.sorting === true) {
    data = [...data].reverse();
  }
  if (uData !== null && filterData.userProblemStatus !== "none") {
    if (filterData.userProblemStatus === "ok") {
      for (let i of data) {
        i.problems = i.problems.filter((e) => {
          return (
            uData.submissions.has(`${i.id}${e.index}`) &&
            uData.submissions.get(`${i.id}${e.index}`) === true
          );
        });
      }
    }
    if (filterData.userProblemStatus === "tried") {
      for (let i of data) {
        i.problems = i.problems.filter((e) => {
          return (
            uData.submissions.has(`${i.id}${e.index}`) &&
            uData.submissions.get(`${i.id}${e.index}`) === false
          );
        });
      }
    }
    if (filterData.userProblemStatus === "submitted") {
      for (let i of data) {
        i.problems = i.problems.filter((e) => {
          return uData.submissions.has(`${i.id}${e.index}`);
        });
      }
    }
  }

  data = data.filter((e) => {
    return e.problems.length > 0;
  });

  if (filterData.random === true) {
    let random = Math.floor(Math.random() * data.length);
    data = data.slice(random, random + 1);

    for (let i of data) {
      random = Math.floor(Math.random() * i.problems.length);
      i.problems = i.problems.slice(random, random + 1);
    }
  }

  return data;
};

export default filterFunc;
