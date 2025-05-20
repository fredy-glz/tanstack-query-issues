import { sleep } from "../../helpers";
import { githubApi } from "../../helpers/github.api";
import { GithubLabel } from "../interfaces";

export const getLabels = async (): Promise<GithubLabel[]> => {
  await sleep(1500);

  const { data } = await githubApi.get<GithubLabel[]>("/labels");

  return data;
};
