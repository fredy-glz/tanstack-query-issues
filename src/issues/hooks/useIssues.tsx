import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../actions";
import { State } from "../interfaces";

interface Props {
  state: State;
}

export const useIssues = ({ state }: Props) => {
  console.log({ state });
  const issuesQuery = useQuery({
    queryKey: ["issues", state],
    queryFn: () => getIssues(state),
    staleTime: 1000 * 60,
  });

  return {
    issuesQuery,
  };
};
