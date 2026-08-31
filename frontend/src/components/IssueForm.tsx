import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

type IssueDraft = {
  summary: string;
  description: string;
  status: string;
};

type Props = {
  onCreate: (payload: { summary: string; description: string }) => void;
  onUpdate: (payload: {
    summary: string;
    description: string;
    status: string;
  }) => void;
  editingIssueId: number | null;
  issueToEdit: IssueDraft | null;
  onCancelEdit: () => void;
};

export const IssueForm = ({
  onCreate,
  onUpdate,
  editingIssueId,
  issueToEdit,
  onCancelEdit,
}: Props) => {
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [editSummary, setEditSummary] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState('TODO');

  useEffect(() => {
    if (!issueToEdit) {
      return;
    }

    setEditSummary(issueToEdit.summary);
    setEditDescription(issueToEdit.description);
    setEditStatus(issueToEdit.status);
  }, [issueToEdit]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate({ summary, description });
    setSummary('');
    setDescription('');
  };

  const handleUpdateSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingIssueId) return;

    onUpdate({
      summary: editSummary,
      description: editDescription,
      status: editStatus,
    });
    onCancelEdit();
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        {editingIssueId ? (
          <div>
            <h2 className="h5 card-title mb-3">
              課題編集 (ID: {editingIssueId})
            </h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-3">
                <label className="form-label">概要</label>
                <input
                  type="text"
                  className="form-control"
                  value={editSummary}
                  onChange={(e) => setEditSummary(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">詳細</label>
                <textarea
                  className="form-control"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">ステータス</label>
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
              <button type="submit" className="btn btn-primary me-2">
                更新
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onCancelEdit}
              >
                キャンセル
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="h5 card-title mb-3">新規課題作成</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">概要</label>
                <input
                  type="text"
                  className="form-control"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">詳細</label>
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
          </div>
        )}
      </div>
    </div>
  );
};
