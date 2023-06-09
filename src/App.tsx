import { Paper, Typography } from '@mui/material';

import './App.scss'

function App() {
  // add routes, rafc new lazy module
  // do i really need vite-plugin-stylelint?
  // check postcss stuff, autoprefixer
  // use grid for cards
  // tailwind? deploy gh pages or vercel
  // add link to my gists to personal site
  
  return (
    <>
      <Typography variant="h2" component="h1">
        Webdev Playground
      </Typography>
      <Paper
        variant="outlined"
        className='container'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '3em',
        }}
      >
        <div className="card">
          <Typography variant="h4" component="h2">
            Stack
          </Typography>
          <ul>
            <li>Vite + React + TS</li>
            <li>MUI</li>
            <li><a href='https://github.com/sindresorhus/modern-normalize' target='_blank'>Modern Normalize</a></li>
            <li>PostCSS, Sass</li>
            <li>Stylelint, ESlint</li>
            <li>Husky</li>
          </ul>
        </div>
        <div className="card">
          <Typography variant="h4" component="h2">
            Pages
          </Typography>
          <ul>
            <li>ToDo</li>
            <li>Uno</li>
            <li>Dos</li>
            <li>Tres</li>
          </ul>
        </div>
      </Paper>
      <footer>
        <p>2023</p>
        <p><a href='https://github.com/ok-plan-b/' target='_blank'>github.com/ok-plan-b</a></p>
      </footer>
    </>
  )
}

export default App
