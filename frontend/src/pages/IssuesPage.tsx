import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IssueForm } from '../components/IssueForm';
import { IssueDetail } from '../components/IssueDetail';
import { IssueList } from '../components/IssueList';
import { useIssues } from '../hooks/useIssues';

type IssuesPageProps = {
  authority: string | null;
};

export const IssuesPage = ({ authority }: IssuesPageProps) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const {
    issues,
    detailIssue,
    editingIssueId,
    editingIssue,
    setSelectedIssueId,
    setDetailIssue,
    handleSubmit,
    handleStartEdit,
    handleCancelEdit,
    handleUpdate,
    handleDelete,
  } = useIssues();

  useEffect(() => {
    if (!id || id === 'new') {
      setSelectedIssueId(null);
      setDetailIssue(null);
      return;
    }

    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      setSelectedIssueId(null);
      setDetailIssue(null);
      return;
    }

    setSelectedIssueId(numericId);
  }, [id, setSelectedIssueId, setDetailIssue]);

  return (
    <div>
      <h2 className="h4 mb-4 fw-bold">課題管理</h2>

      <IssueForm
        onCreate={({ summary, description }) =>
          handleSubmit({ summary, description })
        }
        onUpdate={({ summary, description, status }) =>
          handleUpdate({ summary, description, status })
        }
        editingIssueId={editingIssueId}
        issueToEdit={editingIssue}
        onCancelEdit={handleCancelEdit}
      />

      <IssueDetail
        detailIssue={detailIssue}
        onClose={() => {
          setDetailIssue(null);
          setSelectedIssueId(null);
          navigate('/issues');
        }}
      />

      <IssueList
        issues={issues}
        authority={authority}
        onSelect={(issueId) => navigate(`/issues/${issueId}`)}
        onStartEdit={handleStartEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};
