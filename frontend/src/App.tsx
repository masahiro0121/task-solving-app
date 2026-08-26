import './App.css';
import { useIssues } from './hooks/useIssues';
import { IssueForm } from './components/IssueForm';
import { IssueDetail } from './components/IssueDetail';
import { IssueList } from './components/IssueList';

function App() {
  const {
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
  } = useIssues();

  return (
    <div className="container my-5" style={{ maxWidth: '800px' }}>
      <h1 className="mb-4 text-center fw-bold">課題管理アプリ</h1>

      <IssueForm
        summary={summary}
        setSummary={setSummary}
        description={description}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
        editingIssueId={editingIssueId}
        setEditingIssueId={setEditingIssueId}
        editSummary={editSummary}
        setEditSummary={setEditSummary}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        editStatus={editStatus}
        setEditStatus={setEditStatus}
        handleUpdate={handleUpdate}
      />

      <IssueDetail
        detailIssue={detailIssue}
        onClose={() => {
          setDetailIssue(null);
          setSelectedIssueId(null);
        }}
      />

      <IssueList
        issues={issues}
        onSelect={(id) => setSelectedIssueId(id)}
        onStartEdit={startEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
