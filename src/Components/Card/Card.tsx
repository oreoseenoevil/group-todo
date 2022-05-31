import React, { useState } from 'react';
import Checkbox from 'Components/Checkbox';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaTimes } from 'react-icons/fa';

import styles from './Card.module.scss';

interface CardProps {
  name: string;
  id: number;
  checked: boolean;
  onChecked?: (id: string, checked: boolean) => unknown;
  onChange?: (id: number, name: string) => unknown;
  onDelete?: (id: number) => unknown;
  indeterminate?: boolean;
}

export const Card = ({ name, id, checked, onChecked, onChange, onDelete, indeterminate = false }: CardProps) => {
  const [edit, setEdit] = useState(false);
  const [groupName, setGroupName] = useState(name);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!groupName) return;
    if (e.key === 'Enter') {
      if (onChange) {
        onChange(id, groupName);
      }
      setEdit(false);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className={styles.card}>
      <Checkbox checked={checked} onChange={onChecked} id={`${id}`} indeterminate={indeterminate} />
      {edit ? (
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      ) : (
        <Link to={`${id}`}>{name}</Link>
      )}
      <div className={styles.button_group}>
        {edit ? <FaTimes onClick={() => setEdit(false)} /> : <FaEdit onClick={() => setEdit(true)} />}
        <FaTrash onClick={handleDelete} />
      </div>
    </div>
  );
};
