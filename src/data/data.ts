import { contestTypeChecker } from "./process";
import type { Contest, Problem, ProblemStatus, User } from "./types";

const fetchData = async (url: string) => {
  try {
    await new Promise((e) => setTimeout(e, 2001));
    const data: any = await (await fetch(url)).json();
    if (data.status === "FAILED") {
      throw data.comment;
    }
    return data.result;
  } catch (error) {
    console.log(error);
  }
};

export const getData = async () => {
  let contestData: Contest[] = [];
  let problemData: Problem[] = [];
  await fetchData(`https://codeforces.com/api/contest.list`).then(
    async (data) => {
      for (let contest of data) {
        if (contest.phase !== "FINISHED") {
          continue;
        }
        contestData.push({
          id: contest.id,
          name: contest.name,
          type: contestTypeChecker(contest.name),
        });
      }
    },
    (error) => {
      console.error(error);
    }
  );

  await fetchData(`https://codeforces.com/api/problemset.problems`).then(
    async (data) => {
      for (let problem of data.problems) {
        problemData.push({
          id: `${problem.contestId}${problem.index}`,
          index: problem.index,
          contestId: problem.contestId,
          name: problem.name,
          tags: problem.tags,
          rating: problem.rating,
        });
      }
    },
    (error) => {
      console.error(error);
    }
  );

  return { contestData, problemData };
};

export const getUser = async (user: string) => {
  let userData: User | undefined = undefined;
  let problemStatus: ProblemStatus | undefined = undefined;

  await fetchData(`https://codeforces.com/api/user.info?handles=${user}`).then(
    async (data) => {
      userData = {
        handle: data[0].handle,
        country: data[0].country,
        rating: data[0].rating,
        contribution: data[0].contribution,
        avatar: data[0].avatar,
      };
    },
    (error) => {
      console.error(error);
    }
  );

  if (userData !== undefined) {
    await fetchData(
      `https://codeforces.com/api/user.status?handle=${user}`
    ).then(
      async (data) => {
        problemStatus = new Map<string, boolean>();

        for (let submissions of data) {
          const verdict = submissions.verdict == "OK" ? true : false;
          const id = `${submissions.contestId}${submissions.problem.index}`;

          if (verdict == true) {
            problemStatus.set(id, true);
          }
          if (verdict == false && problemStatus.get(id) != true) {
            problemStatus.set(id, false);
          }
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  return { userData, problemStatus };
};
