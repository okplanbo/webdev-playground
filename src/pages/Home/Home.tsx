import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import { PAGES } from ':src/constants';

import styles from './Home.module.scss'

export default function Home() {
  return (
    <Paper variant="outlined" className={styles.container}>
      <div className={styles.card}>
        <Typography variant="h4" component="h2">
          Stack
        </Typography>
        <ul>
          <li>Vite + React + TS</li>
          <li>MUI</li>
          <li>
            <a href='https://github.com/sindresorhus/modern-normalize' rel="noreferrer" target='_blank'>
              Modern Normalize
            </a>
          </li>
          <li>PostCSS, Sass</li>
          <li>Stylelint, ESlint</li>
          <li>Husky</li>
        </ul>
      </div>
      <div className={styles.card}>
        <Typography variant="h4" component="h2">
          Pages
        </Typography>
        <ul>
          { Object.values(PAGES).map(page => {
            return (
              <li key={page.title}>
                <Link to={page.path}>ToDo demo</Link>
              </li>
            )
          }) }
          <li>Uno</li>
          <li>Dos</li>
          <li>Tres...</li>
        </ul>
      </div>
    </Paper>
  )
}