import { FC } from "react";
import { FiInfo, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { GithubIssue, State } from "../interfaces";
import { getIssue, getIssueComments } from "../actions";

interface Props {
  issue: GithubIssue;
}

export const IssueItem: FC<Props> = ({ issue }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const prefetchData = () => {
    queryClient.prefetchQuery({
      queryKey: ["issues", issue.number],
      queryFn: () => getIssue(issue.number),
      staleTime: 1000 * 60,
    });

    queryClient.prefetchQuery({
      queryKey: ["issues", issue.number, "comments"],
      queryFn: () => getIssueComments(issue.number),
      staleTime: 1000 * 60,
    });
  };

  const presetData = () => {
    queryClient.setQueryData(["issues", issue.number], issue, {
      updatedAt: Date.now() + 1000 * 60,
    });
  };

  const msDiferencia =
    new Date().getTime() - new Date(issue.created_at).getTime();
  const days = Math.floor(msDiferencia / (1000 * 60 * 60 * 24));

  return (
    <div
      // onMouseEnter={prefetchData}
      onMouseEnter={presetData}
      className="animate-fadeIn flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800"
    >
      {issue.state === State.Close ? (
        <FiCheckCircle size={30} color="green" className="min-w-10" />
      ) : (
        <FiInfo size={30} color="red" className="min-w-10" />
      )}

      <div className="flex flex-col flex-grow px-2">
        <a
          onClick={() => navigate(`/issues/issue/${issue.number}`)}
          className="hover:underline"
        >
          {issue.title}
        </a>
        <span className="text-gray-500">
          {/* TODO: days ago */}#{issue.number} opened {days} days ago by{" "}
          <span className="font-bold">{issue.user.login}</span>
        </span>
      </div>

      <img
        src={issue.user.avatar_url}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      />
      <div className="flex flex-col mx-2 items-center">
        <FiMessageSquare size={30} className="min-w-5" color="gray" />
        <span className="px-4 text-gray-400">{issue.comments}</span>
      </div>
    </div>
  );
};
