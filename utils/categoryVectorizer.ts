export type CategryText =
  | "Improper use of your report"
  | "Getting a credit card"
  | "Took or threatened to take negative or legal action"
  | "Trouble during payment process"
  | "Problem with a purchase shown on your statement"
  | "Struggling to pay mortgage"
  | "Closing an account";

export const returnCategoryFromIndex = (index: number): CategryText => {
  if (index === 2) {
    return "Improper use of your report";
  } else if (index === 3) {
    return "Getting a credit card";
  } else if (index === 4) {
    return "Took or threatened to take negative or legal action";
  } else if (index === 5) {
    return "Trouble during payment process";
  } else if (index === 6) {
    return "Problem with a purchase shown on your statement";
  } else if (index === 7) {
    return "Struggling to pay mortgage";
  } else if (index === 8) {
    return "Closing an account";
  } else {
    throw new Error("Invalid index");
  }
};
