import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'Redux/Store';
import { Card } from 'Components/Card';
import { Button } from 'Components/Button';
import { InputField } from 'Components/InputField';
import { addTodo, checkTodo, deleteTodo, updateTodo } from 'Redux/Slice/groupSlice';
import { Todo } from 'types/group';

import styles from './Group.module.scss';

export const Group = () => {
  const [value, setValue] = useState('');
  const { groups } = useAppSelector((state) => state.group);
  const { id: groupId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const group = useMemo(() => groups.find((group) => group.id === +groupId!), [groups, groupId]);

  const handleAddTodo = () => {
    if (!value) return;
    dispatch(
      addTodo({
        id: +groupId!,
        todo: {
          id: Math.floor(Math.random() * 1000000000),
          name: value,
          checked: false
        }
      })
    );
    setValue('');
  };

  const handleChecked = (id: string, checked: boolean) => {
    const todo = {
      id: +id,
      checked
    };

    dispatch(checkTodo({ id: +groupId!, todo }));
  };

  const handleDeleteTodo = (id: number) => {
    const todo = { id };
    dispatch(deleteTodo({ id: +groupId!, todo }));
  };

  const handleUpdateTodo = (id: number, name: string) => {
    const todo = { id, name };
    dispatch(updateTodo({ id: +groupId!, todo }));
  };

  useEffect(() => {
    if (group?.id !== +groupId!) {
      navigate('/');
    }
  }, [group?.id, groupId, navigate]);

  return (
    <div className={styles.group_container}>
      <div className={styles.group_header}>
        <h1>{group?.name}</h1>
        <div className={styles.group}>
          <InputField value={value} onChange={setValue} />
          <Button onClick={handleAddTodo}>Add Todo</Button>
        </div>
      </div>
      <div className={styles.group_content}>
        {group?.todos.length === 0 && <h1>No existing todo for this group</h1>}
        {group?.todos &&
          group?.todos.map((todo: Todo) => (
            <Card
              key={todo.id}
              id={todo.id}
              name={todo.name}
              checked={todo.checked}
              onChecked={handleChecked}
              onDelete={handleDeleteTodo}
              onChange={handleUpdateTodo}
            />
          ))}
      </div>
    </div>
  );
};
