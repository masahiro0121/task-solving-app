import { UserForm } from '../components/UserForm';
import { UserList } from '../components/UserList';
import { useUsers } from '../hooks/useUsers';

type UsersPageProps = {
  isLoggedIn: boolean;
};

export const UsersPage = ({ isLoggedIn }: UsersPageProps) => {
  const {
    users,
    editingUsername,
    editingUser,
    handleSubmit: handleUserSubmit,
    handleStartEdit,
    handleCancelEdit,
    handleUpdate: handleUserUpdate,
    handleDelete: handleUserDelete,
  } = useUsers(isLoggedIn);

  return (
    <div>
      <h2 className="h4 mb-4 fw-bold">ユーザー管理</h2>

      <UserForm
        onCreate={({ username, password, authority }) =>
          handleUserSubmit({ username, password, authority })
        }
        onUpdate={({ username, password, authority }) =>
          handleUserUpdate({ username, password, authority })
        }
        editingUsername={editingUsername}
        userToEdit={editingUser}
        onCancelEdit={handleCancelEdit}
      />

      <UserList
        users={users}
        onStartEdit={handleStartEdit}
        onDelete={handleUserDelete}
      />
    </div>
  );
};
