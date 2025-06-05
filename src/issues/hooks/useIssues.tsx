import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { getIssues } from "../actions";
import { State } from "../interfaces";

interface Props {
  state: State;
  selectedLabels: string[];
}

export const useIssues = ({ state, selectedLabels }: Props) => {
  const [page, setPage] = useState(1);

  const issuesQuery = useQuery({
    queryKey: ["issues", { state, selectedLabels, page }],
    queryFn: () => getIssues(state, selectedLabels, page),
    staleTime: 1000 * 60, // 1 min
  });

  const nextPage = () => {
    if (!issuesQuery.data?.length) return;

    setPage(page + 1);
  };

  const prevPage = () => {
    if (page === 1) return;

    setPage((prev) => prev - 1);
  };

  useEffect(() => {
    setPage(1);
  }, [state]);

  useEffect(() => {
    setPage(1);
  }, [selectedLabels]);

  return {
    issuesQuery,

    // Getters
    page,

    // Actions
    nextPage,
    prevPage,
  };
};
