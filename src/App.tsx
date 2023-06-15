import { useEffect, useState, Suspense } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import Home from './pages/Home/Home';
import Todo from './pages/Todo/Todo';

import { APP_TITLE, PAGES } from './constants';

import './App.scss';

function App() {
  const location = useLocation();
  const [pageName, setPageName] = useState('');

  useEffect(() => {
    if (location.pathname === '/') {
      setPageName('');
    }

    Object.values(PAGES).forEach(page => {
      if (location.pathname.includes(page.path)) {
        setPageName(` / ${page.title}`)
      }
    });
  }, [location]);

  return (
    <>
      <Typography variant="h2" component="h1">
        {pageName
          ? <><Link to={'/'}>{APP_TITLE}</Link> {pageName}</>
          : APP_TITLE
        }
      </Typography>

      <Routes>
        <Route path="/"
          element={<Home />}
        />
        <Route
          path={PAGES.todo.path}
          element={
            <Suspense fallback={<>...</>}>
              <Todo />
            </Suspense>
          }
        />
      </Routes>

      <footer>
        <p>2023</p>
        <p>
          <a href='https://github.com/ok-plan-b/' rel="noreferrer" target='_blank'>
            github.com/ok-plan-b
          </a>
        </p>
      </footer>
    </>
  )
}

export default App;
