import { useState, useEffect } from 'react';
import type { Issue } from '../types';
import { issueService } from '../services/issueService';

export const useIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedIssueId, setSelectedIssueId] = useState<number | null>(null);
  const [detailIssue, setDetailIssue] = useState<Issue | null>(null);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);

  const fetchIssues = async () => {
    try {
      const data = await issueService.getAll();
      setIssues(data);
    } catch (error) {
      console.error('一覧取得エラー:', error);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  useEffect(() => {
    if (selectedIssueId === null) return;

    const fetchIssueDetail = async () => {
      try {
        const data = await issueService.getById(selectedIssueId);
        setDetailIssue(data);
      } catch (error) {
        console.error('詳細取得エラー:', error);
      }
    };

    fetchIssueDetail();
  }, [selectedIssueId]);

  const handleSubmit = async (payload: {
    summary: string;
    description: string;
  }) => {
    const newIssue = {
      summary: payload.summary,
      description: payload.description,
      status: 'TODO',
    };

    try {
      await issueService.create(newIssue);
      fetchIssues();
    } catch (error) {
      console.error('作成エラー:', error);
    }
  };

  const handleStartEdit = (issue: Issue) => {
    setEditingIssue(issue);
  };

  const handleCancelEdit = () => {
    setEditingIssue(null);
  };

  const handleUpdate = async (payload: {
    summary: string;
    description: string;
    status: string;
  }) => {
    if (!editingIssue) return;

    const updatedIssue = {
      summary: payload.summary,
      description: payload.description,
      status: payload.status,
    };

    try {
      await issueService.update(editingIssue.id, updatedIssue);
      const updatedId = editingIssue.id;
      handleCancelEdit();
      fetchIssues();

      if (selectedIssueId === updatedId) {
        setSelectedIssueId(null);
      }
    } catch (error) {
      console.error('更新エラー:', error);
      alert('課題の更新に失敗しました');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('本当に削除しますか？')) return;

    try {
      await issueService.delete(id);
      fetchIssues();

      if (selectedIssueId === id) {
        setSelectedIssueId(null);
        setDetailIssue(null);
      }

      if (editingIssue?.id === id) {
        handleCancelEdit();
      }
    } catch (error) {
      console.error('削除エラー:', error);
      alert('課題の削除に失敗しました');
    }
  };

  return {
    issues,
    detailIssue,
    editingIssueId: editingIssue?.id ?? null,
    editingIssue,
    setSelectedIssueId,
    setDetailIssue,
    handleSubmit,
    handleStartEdit,
    handleCancelEdit,
    handleUpdate,
    handleDelete,
  };
};
