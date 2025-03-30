const fetchData = async (url: string) => {
  try {
    const data: any = await (await fetch(url)).json();
    if (data.status === "FAILED") {
      throw data.comment;
    }
    return data.result;
  } catch (error) {
    console.log(error);
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
  await fetchData(``).then(
    async (cData) => {
      await fetchData(``).then(
        (pData) => {
          for (let contest of cData) {
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
        },
        (error) => {
          console.error(error);
        }
      );
    },
    (error) => {
      console.error(error);
    }
  );
  return data;
};
