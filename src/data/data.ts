import { contestTypeChecker } from "./checker";
import type { ContestType, ProblemType, UserType } from "./types";

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
    return error;
  }
};

export const getData = async () => {
  let contestData: ContestType[] = [];
  let problemData: ProblemType[] = [];
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
  let userData: UserType | undefined = undefined;
  let submissionsData: Map<string, number> | undefined = undefined;

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
    ).then(async (data) => {
      submissionsData = new Map<string, number>();

      for (let submissions of data) {
        const verdict: number = submissions.verdict === "OK" ? 0 : 1;
        const id: string = `${submissions.contestId}${submissions.problem.index}`;

        if (!submissionsData.has(id)) {
          submissionsData.set(id, verdict);
        } else if (submissionsData.get(id) === 1 && verdict === 0) {
          submissionsData.set(id, 0);
        }
      }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  return { userData, submissionsData };
};
