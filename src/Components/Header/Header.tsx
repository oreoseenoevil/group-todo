import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

type Links = {
  name: string;
  link: string;
};

const links: Links[] = [
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'Contact',
    link: '/contact'
  },
  {
    name: 'About',
    link: '/about'
  }
];

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      {links.map((item, i) => (
        <Link to={item.link} key={i} className={styles.link}>
          {item.name}
        </Link>
      ))}
    </header>
  );
};
