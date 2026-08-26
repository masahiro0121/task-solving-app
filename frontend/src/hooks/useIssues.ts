import { useState, useEffect } from 'react';
import type { Issue } from '../types';
import { issueService } from '../services/issueService';

export const useIssues = () => {
  // ステート定義
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedIssueId, setSelectedIssueId] = useState<number | null>(null);
  const [detailIssue, setDetailIssue] = useState<Issue | null>(null);

  // 新規作成用の入力ステート
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');

  // 編集用のステート
  const [editingIssueId, setEditingIssueId] = useState<number | null>(null);
  const [editSummary, setEditSummary] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState('TODO');

  // API通信・ロジック関数
  const fetchIssues = () => {
    issueService
      .getAll()
      .then((data) => setIssues(data))
      .catch((error) => console.error('一覧取得エラー:', error));
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  useEffect(() => {
    if (selectedIssueId === null) return;
    issueService
      .getById(selectedIssueId)
      .then((data) => setDetailIssue(data))
      .catch((error) => console.error('詳細取得エラー:', error));
  }, [selectedIssueId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newIssue = { summary, description, status: 'TODO' };

    issueService
      .create(newIssue)
      .then(() => {
        setSummary('');
        setDescription('');
        fetchIssues();
      })
      .catch((error) => console.error('作成エラー:', error));
  };

  const startEdit = (issue: Issue) => {
    setEditingIssueId(issue.id);
    setEditSummary(issue.summary);
    setEditDescription(issue.description);
    setEditStatus(issue.status);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIssueId === null) return;

    const updatedIssue = {
      summary: editSummary,
      description: editDescription,
      status: editStatus,
    };

    issueService
      .update(editingIssueId, updatedIssue)
      .then(() => {
        setEditingIssueId(null);
        fetchIssues();
        if (selectedIssueId === editingIssueId) {
          setSelectedIssueId(null);
        }
      })
      .catch((error) => console.error('更新エラー:', error));
  };

  const handleDelete = (id: number) => {
    if (!window.confirm('本当に削除しますか？')) return;

    issueService
      .delete(id)
      .then(() => {
        fetchIssues();
        if (selectedIssueId === id) {
          setSelectedIssueId(null);
          setDetailIssue(null);
        }
        if (editingIssueId === id) {
          setEditingIssueId(null);
        }
      })
      .catch((error) => console.error('削除エラー:', error));
  };

  // JSX（画面）で使う値と関数をオブジェクト形式で一括で返す
  return {
    issues,
    detailIssue,
    summary,
    setSummary,
    description,
    setDescription,
    editingIssueId,
    setEditingIssueId,
    editSummary,
    setEditSummary,
    editDescription,
    setEditDescription,
    editStatus,
    setEditStatus,
    setSelectedIssueId,
    setDetailIssue,
    handleSubmit,
    startEdit,
    handleUpdate,
    handleDelete,
  };
};
