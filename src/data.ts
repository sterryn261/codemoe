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
    async (cData) => {
      await fetchData(`https://codeforces.com/api/problemset.problems`).then(
        (pData) => {
          for (let contest of cData) {
            if (contest.phase !== "FINISHED") {
              continue;
            }
            const type = contestTypeChecker(contest.name);
            let returnData: ContestType = {
              id: contest.id,
              name: contest.name,
              type: type,
              problems: [],
            };

            let problems = pData.problems.filter(
              (e: any) => e.contestId === returnData.id
            );
            for (let problem of problems) {
              returnData.problems.push({
                index: problem.index,
                name: problem.name,
                tags: problems.tags,
                rating: problem.rating,
              });
            }
            data.push(returnData);
          }
        }
      );
    }
  );
  return data;
};

interface submissionType {
  contestId: number;
  problemIndex: string;
  verdict: boolean;
}
interface userType {
  handle: string;
  country: string;
  rating: number;
  contribution: number;
  avatar: string;
  submissions: submissionType[];
}

export const getUser = async (user: string) => {
  let data: userType | null = null;
  await fetchData(`https://codeforces.com/api/user.info?handles=${user}`).then(
    async (uData) => {
      await fetchData(
        `https://codeforces.com/api/user.status?handle=${user}`
      ).then((uSub) => {
        data = {
          handle: uData[0].handle,
          country: uData[0].country,
          rating: uData[0].rating,
          contribution: uData[0].contribution,
          avatar: uData[0].avatar,
          submissions: [],
        };
        for (let sub of uSub) {
          const verdict = sub.verdict === "OK" ? true : false;

          data.submissions.push({
            contestId: sub.contestId,
            problemIndex: sub.problem.index,
            verdict: verdict,
          });
        }
      });
    },
    () => {
      data = null;
    }
  );
  return data;
};
