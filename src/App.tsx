import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FormData from './components/FormData/FormData';
import { NavigationState } from './globalTypes';
import Navigation from './components/Navigation/Navigation';

function App() {
  const [isReactHookForm, setIsReactHookForm] = useState(false);
  const [isUncontrolledForm, setIsUncontrolledForm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as NavigationState;

  useEffect(() => {
    if (!state) return;

    if (state.from === 'react-hook-form') setIsReactHookForm(true);
    else if (state.from === 'uncontrolled-form') setIsUncontrolledForm(true);
    navigate('/');
  }, [state, navigate]);

  return (
    <>
      <Navigation />
      <FormData title="react-hook-form" isNewData={isReactHookForm} />
      <FormData title="uncontrolled-form" isNewData={isUncontrolledForm} />
    </>
  );
}

export default App;
