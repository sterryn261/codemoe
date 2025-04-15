import type { ContestType, UserType } from "./types";

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

const contestTypeChecker = (name: string): string => {
  if (name.indexOf("Kotlin") !== -1) {
    return "Kotlin";
  }
  if (name.indexOf("April Fools") !== -1) {
    return "April Fools";
  }
  if (name.indexOf("Global") !== -1) {
    return "Global";
  }
  if (name.indexOf("Educational") !== -1) {
    return "Educational";
  }
  if (name.indexOf("Div. 1 + Div. 2") !== -1) {
    return "Div. 1 + 2";
  }
  for (let i = 1; i < 5; i++) {
    if (name.indexOf(`Div. ${i}`) !== -1) {
      return `Div. ${i}`;
    }
  }
  return "Other";
};

export const getData = async () => {
  let data: ContestType[] = [];
  await fetchData(`https://codeforces.com/api/contest.list`).then(
    async (contestData) => {
      await fetchData(`https://codeforces.com/api/problemset.problems`).then(
        (problemData) => {
          for (let contest of contestData) {
            if (contest.phase !== "FINISHED") {
              continue;
            }

        let returnContestData: ContestType = {
              id: contest.id,
              name: contest.name,
          type: contestTypeChecker(contest.name),
              problems: [],
            };

            let problems = problemData.problems.filter(
          (e: any) => e.contestId === returnContestData.id
            );

            for (let problem of problems) {
          returnContestData.problems.push({
            id: `${contest.id}${problem.index}`,
                index: problem.index,
                name: problem.name,
                tags: problem.tags,
                rating: problem.rating,
              });
            }
        data.push(returnContestData);
          }
        }
      );
    }
  );
  return data;
};

export const getUser = async (user: string) => {
  let data: UserType | null = null;
  await fetchData(`https://codeforces.com/api/user.info?handles=${user}`).then(
    async (userData) => {
      await fetchData(
        `https://codeforces.com/api/user.status?handle=${user}`
      ).then((userSubmissions) => {
        data = {
            handle: userData[0].handle,
            country: userData[0].country,
            rating: userData[0].rating,
            contribution: userData[0].contribution,
            avatar: userData[0].avatar,
          submissions: new Map(),
        };
          for (let sub of userSubmissions) {
            const verdict: boolean = sub.verdict === "OK" ? true : false;
            const id: string = `${sub.contestId}${sub.problem.index}`;

            if (!data.submissions.has(id)) {
              data.submissions.set(id, verdict);
            } else if (data.submissions.get(id) === false && verdict === true) {
              data.submissions.set(id, true);
        }
          }
      });
    },
    () => {
      data = null;
    }
  );
  return data;
};
