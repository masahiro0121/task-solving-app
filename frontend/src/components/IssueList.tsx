import type { Issue } from '../types';

type IssueListProps = {
  issues: Issue[];
  onSelect: (id: number) => void;
  onStartEdit: (issue: Issue) => void;
  onDelete: (id: number) => void;
};

export const IssueList = ({
  issues,
  onSelect,
  onStartEdit,
  onDelete,
}: IssueListProps) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5 card-title mb-3">課題一覧</h2>
        {issues.length === 0 ? (
          <p className="text-muted mb-0">課題がありません。</p>
        ) : (
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>ステータス</th>
                <th>概要</th>
                <th className="text-end">操作</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id}>
                  <td>
                    <span className="badge bg-secondary">{issue.status}</span>
                  </td>
                  <td>{issue.summary}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => onSelect(issue.id)}
                    >
                      詳細
                    </button>
                    <button
                      className="btn btn-sm btn-outline-success me-2"
                      onClick={() => onStartEdit(issue)}
                    >
                      編集
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(issue.id)}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
