import { useEffect, useState } from 'react';
import axios from 'axios';

type Issue = {
  id: number;
  summary: string;
  description: string;
  status: string;
};

function App() {
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

  // 一覧取得関数（再利用できるように切り出し）
  const fetchIssues = () => {
    axios
      .get<Issue[]>('http://localhost:8080/api/issues')
      .then((response) => setIssues(response.data))
      .catch((error) => console.error('一覧取得エラー:', error));
  };

  // 1. 初期表示時のデータ取得
  useEffect(() => {
    fetchIssues();
  }, []);

  // 2. 詳細データ取得
  useEffect(() => {
    if (selectedIssueId === null) return;
    axios
      .get<Issue>(`http://localhost:8080/api/issues/${selectedIssueId}`)
      .then((response) => setDetailIssue(response.data))
      .catch((error) => console.error('詳細取得エラー:', error));
  }, [selectedIssueId]);

  // 3. 新規作成処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // フォームのデフォルト送信（画面リロード）を防止

    const newIssue = {
      summary: summary,
      description: description,
      status: 'TODO', // 初期ステート
    };

    axios
      .post('http://localhost:8080/api/issues', newIssue)
      .then(() => {
        // フォームをクリアして一覧を再取得
        setSummary('');
        setDescription('');
        fetchIssues();
      })
      .catch((error) => console.error('作成エラー:', error));
  };

  // 編集開始ボタンを押した時の処理（フォームに既存の値をセット）
  const startEdit = (issue: Issue) => {
    setEditingIssueId(issue.id);
    setEditSummary(issue.summary);
    setEditDescription(issue.description);
    setEditStatus(issue.status);
  };

  // 編集データの送信処理 (PUT)
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIssueId === null) return;

    const updatedIssue = {
      summary: editSummary,
      description: editDescription,
      status: editStatus,
    };

    axios
      .put(`http://localhost:8080/api/issues/${editingIssueId}`, updatedIssue)
      .then(() => {
        setEditingIssueId(null); // 編集モード解除
        fetchIssues(); // 一覧更新
        if (selectedIssueId === editingIssueId) {
          // 詳細表示中のタスクを更新した場合は詳細も再取得
          setSelectedIssueId(null);
        }
      })
      .catch((error) => console.error('更新エラー:', error));
  };

  // 削除処理
  const handleDelete = (id: number) => {
    // 誤操作防止の確認ダイアログ（任意）
    if (!window.confirm('本当に削除しますか？')) return;

    axios
      .delete(`http://localhost:8080/api/issues/${id}`)
      .then(() => {
        fetchIssues(); // 一覧を再取得

        // もし削除した課題の「詳細」や「編集」が開かれていたら閉じる
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

  return (
    <div>
      <h1>課題管理</h1>

      {/* 新規作成フォーム */}
      <h2>新規課題作成</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>概要: </label>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />
        </div>
        <div>
          <label>詳細: </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">作成</button>
      </form>

      <hr />

      {/* 編集フォーム（編集ボタンが押された時だけ表示） */}
      {editingIssueId !== null && (
        <div>
          <h2>課題編集 (ID: {editingIssueId})</h2>
          <form onSubmit={handleUpdate}>
            <div>
              <label>概要: </label>
              <input
                type="text"
                value={editSummary}
                onChange={(e) => setEditSummary(e.target.value)}
                required
              />
            </div>
            <div>
              <label>詳細: </label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label>ステータス: </label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
              >
                <option value="TODO">TODO</option>
                <option value="DOING">DOING</option>
                <option value="DONE">DONE</option>
              </select>
            </div>
            <button type="submit">更新</button>
            <button type="button" onClick={() => setEditingIssueId(null)}>
              キャンセル
            </button>
          </form>
          <hr />
        </div>
      )}

      {/* 詳細表示エリア */}
      {detailIssue && (
        <div>
          <h2>詳細表示 (ID: {detailIssue.id})</h2>
          <p>概要: {detailIssue.summary}</p>
          <p>ステータス: {detailIssue.status}</p>
          <p>詳細: {detailIssue.description}</p>
          <button
            onClick={() => {
              setDetailIssue(null);
              setSelectedIssueId(null);
            }}
          >
            閉じる
          </button>
          <hr />
        </div>
      )}

      {/* 一覧表示エリア */}
      <h2>課題一覧</h2>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            [{issue.status}] {issue.summary}
            <button onClick={() => setSelectedIssueId(issue.id)}>詳細</button>
            <button onClick={() => startEdit(issue)}>編集</button>
            <button onClick={() => handleDelete(issue.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
