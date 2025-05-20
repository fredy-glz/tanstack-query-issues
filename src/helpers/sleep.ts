export const sleep = (miliseconds: number) =>
  new Promise((r) => {
    setTimeout(() => {
      r(true);
    }, miliseconds);
  });
