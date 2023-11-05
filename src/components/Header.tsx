import styles from './Header.module.css'

import todoLogo from '../assets/logo.svg'

export function Header() {
  return (
    <article className={styles.headerContainer}>
      <strong className={styles.header}>
        <img src={todoLogo} alt="GR To Do List" />
      </strong>
    </article>
  )
}
