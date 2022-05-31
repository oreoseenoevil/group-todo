import { useState } from 'react';
import { Button } from 'Components/Button';
import { Card } from 'Components/Card';
import { InputField } from 'Components/InputField';
import { deleteGroup, renameGroup, setCheckGroup, setGroup } from 'Redux/Slice/groupSlice';
import { useAppDispatch, useAppSelector } from 'Redux/Store';

import styles from './SideBar.module.scss';

export const SideBar = () => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();
  const { groups } = useAppSelector((state) => state.group);

  const handleSubmit = () => {
    if (!value) return;

    dispatch(
      setGroup({
        id: Math.floor(Math.random() * 1000000000),
        name: value,
        checked: false,
        todos: []
      })
    );
    setValue('');
  };

  const handleChecked = (id: string, checked: boolean) => {
    dispatch(setCheckGroup({ id: +id, checked }));
  };

  const handleDeleteGroup = (id: number) => {
    dispatch(deleteGroup(id));
  };

  const handleRename = (id: number, name: string) => {
    dispatch(renameGroup({ id, name }));
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.group}>
        <InputField value={value} onChange={setValue} />
        <Button onClick={handleSubmit}>Add Group</Button>
      </div>
      <div className={styles.card_container}>
        {groups.map((item, i) => {
          const checkedOptions = item.todos.filter((todo) => todo.checked === true);
          const isIndeterminate = item.checked && checkedOptions.length !== item.todos.length;

          return (
            <Card
              id={item.id}
              name={item.name}
              key={i}
              checked={item.checked}
              onChecked={handleChecked}
              onDelete={handleDeleteGroup}
              onChange={handleRename}
              indeterminate={isIndeterminate}
            />
          );
        })}
      </div>
    </div>
  );
};
