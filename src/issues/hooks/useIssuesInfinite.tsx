import { useInfiniteQuery } from "@tanstack/react-query";
import { getIssues } from "../actions";
import { State } from "../interfaces";

interface Props {
  state: State;
  selectedLabels: string[];
}

export const useIssuesInfinite = ({ state, selectedLabels }: Props) => {
  const issuesQuery = useInfiniteQuery({
    queryKey: ["issues", "infinite", { state, selectedLabels }],
    queryFn: ({ pageParam, queryKey }) => {
      console.log({pageParam})
      const [, , args] = queryKey;
      const { state, selectedLabels } = args as Props;

      return getIssues(state, selectedLabels, pageParam);
    },
    staleTime: 1000 * 60, // 1 min
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length ? pages.length + 1 : undefined,
  });

  return {
    issuesQuery,
  };
};
