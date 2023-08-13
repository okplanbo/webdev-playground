import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import Home from './pages/Home/Home';
import Todo from './pages/Todo/Todo';

import { APP_TITLE, PAGES, BASE } from './constants';

import './App.scss';

function App() {
  const location = useLocation();
  let pageName = ''

  if (location.pathname === `/${BASE}`) {
    pageName = '';
  }

  Object.values(PAGES).forEach(page => {
    if (location.pathname.includes(page.path)) {
      pageName = ` / ${page.title}`;
    }
  });
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Typography variant="h2" component="h1">
        {pageName
          ? <><Link to='/'>{APP_TITLE}</Link> {pageName}</>
          : APP_TITLE
        }
      </Typography>

      <Routes>
        <Route path='/'
          element={<Home />}
        />
        <Route
          path={PAGES.todo.path}
          element={<Todo />}
        />
      </Routes>

      <footer>
        <p>{new Date().getFullYear()}</p>
        <p>
          <a href='/'>
            Home
          </a>
          {` / `}
          <a href='https://github.com/okplanbo/' rel="noreferrer" target='_blank'>
            github.com/okplanbo
          </a>
        </p>
      </footer>
    </LocalizationProvider>
  )
}

export default App;
