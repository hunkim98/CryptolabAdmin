export type CategryText =
  | "Improper use of your report"
  | "Trouble during payment process"
  | "Problem with a purchase shown on your statement"
  | "Took or threatened to take negative or legal action"
  | "Struggling to pay mortgage"
  | "Closing an account"
  | "Getting a credit card";

export const returnCategoryFromIndex = (index: number) => {
  if (index === 2) {
    return "Improper use of your report" as CategryText;
  } else if (index === 3) {
    return "Trouble during payment process" as CategryText;
  } else if (index === 4) {
    return "Problem with a purchase shown on your statement" as CategryText;
  } else if (index === 5) {
    return "Took or threatened to take negative or legal action" as CategryText;
  } else if (index === 6) {
    return "Struggling to pay mortgage" as CategryText;
  } else if (index === 7) {
    return "Closing an account" as CategryText;
  } else if (index === 8) {
    return "Getting a credit card" as CategryText;
  } else {
    throw new Error("Invalid index");
  }
};
