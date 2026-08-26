type IssueFormProps = {
  // 新規作成用
  summary: string;
  setSummary: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;

  // 編集用
  editingIssueId: number | null;
  setEditingIssueId: (id: number | null) => void;
  editSummary: string;
  setEditSummary: (val: string) => void;
  editDescription: string;
  setEditDescription: (val: string) => void;
  editStatus: string;
  setEditStatus: (val: string) => void;
  handleUpdate: (e: React.FormEvent) => void;
};

export const IssueForm = ({
  summary,
  setSummary,
  description,
  setDescription,
  handleSubmit,
  editingIssueId,
  setEditingIssueId,
  editSummary,
  setEditSummary,
  editDescription,
  setEditDescription,
  editStatus,
  setEditStatus,
  handleUpdate,
}: IssueFormProps) => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        {/* 編集モード時のフォーム */}
        {editingIssueId !== null ? (
          <div>
            <h2 className="h5 card-title mb-3">
              課題編集 (ID: {editingIssueId})
            </h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label">概要: </label>
                <input
                  type="text"
                  className="form-control"
                  value={editSummary}
                  onChange={(e) => setEditSummary(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">詳細: </label>
                <textarea
                  className="form-control"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">ステータス: </label>
                <select
                  className="form-select"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  <option value="TODO">TODO</option>
                  <option value="DOING">DOING</option>
                  <option value="DONE">DONE</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                更新
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setEditingIssueId(null)}
              >
                キャンセル
              </button>
            </form>
            <hr />
          </div>
        ) : (
          /* 新規作成フォーム */
          <div>
            <h2 className="h5 card-title mb-3">新規課題作成</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">概要: </label>
                <input
                  type="text"
                  className="form-control"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">詳細: </label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                作成
              </button>
            </form>
            <hr />
          </div>
        )}
      </div>
    </div>
  );
};
