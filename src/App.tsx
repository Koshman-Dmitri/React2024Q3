import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FormData from './components/FormData/FormData';
import Navigation from './components/Navigation/Navigation';
import { useAppSelector } from './redux/hooks/hooks';
import styles from './App.module.css';

type NavState = { isNew: boolean };

function App() {
  const [isNew, setIsNew] = useState(false);
  const forms = useAppSelector((state) => state.forms);
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as NavState;

  useEffect(() => {
    if (!state) return;

    if (state.isNew) {
      setIsNew(true);
      navigate('/');
    }
  }, [state, navigate]);

  return (
    <>
      <Navigation />

      <div className={styles.tilesWrapper}>
        {forms.map((data, index) => (
          <FormData key={data.id} data={data} isNew={forms.length - 1 === index && isNew} />
        ))}
      </div>
    </>
  );
}

export default App;
