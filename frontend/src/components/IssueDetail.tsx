import type { Issue } from '../types';

type IssueDetailProps = {
  detailIssue: Issue | null;
  onClose: () => void;
};

export const IssueDetail = ({ detailIssue, onClose }: IssueDetailProps) => {
  if (!detailIssue) return null;

  return (
    <div className="card mb-4 border-info shadow-sm">
      <div className="card-body">
        <h2 className="h5 card-title mb-3">詳細表示 (ID: {detailIssue.id})</h2>
        <p className="card-text">
          <strong>概要:</strong> {detailIssue.summary}
        </p>
        <p className="card-text">
          <strong>ステータス:</strong> {detailIssue.status}
        </p>
        <p className="card-text">
          <strong>詳細:</strong> {detailIssue.description}
        </p>
        <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>
          閉じる
        </button>
      </div>
    </div>
  );
};
