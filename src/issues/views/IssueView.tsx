import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FiSkipBack } from "react-icons/fi";

import { IssueComment } from "../components/IssueComment";
import { useIssue } from "../hooks";
import { LoadingSpinner } from "../../shared";

export const IssueView = () => {
  const navigate = useNavigate();
  const params = useParams();

  const issueNumber = Number(params.issueNumber ?? 0);
  const { issueQuery, commentsQuery } = useIssue(issueNumber);

  if (issueQuery.isLoading) {
    return <div>Cargando Issue</div>;
  }

  if (!issueQuery.data) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="mb-5">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="hover:underline text-blue-400 flex items-center"
        >
          <FiSkipBack />
          Regresar
        </button>
      </div>

      <IssueComment issue={issueQuery.data} />

      {commentsQuery.isLoading ? (
        <LoadingSpinner />
      ) : (
        commentsQuery.data?.map((comment) => (
          <IssueComment issue={comment} key={comment.id} />
        ))
      )}
    </div>
  );
};
