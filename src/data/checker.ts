const contestType = [
  "Kotlin",
  "April Fools",
  "Global",
  "Educational",
  "Div. 1 + Div. 2",
  "Div. 1",
  "Div. 2",
  "Div. 3",
  "Div. 4",
];

const contestTypeChecker = (name: string): string => {
  for (const i of contestType) {
    if (name.indexOf(i) !== -1) {
      return i;
    }
  }
  return "Other";
};
export { contestTypeChecker };
