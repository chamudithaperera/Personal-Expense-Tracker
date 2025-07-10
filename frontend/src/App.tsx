import React from 'react';
import { Provider } from 'react-redux';
import { useAppSelector } from './hooks/redux';
import { store } from './store';

// Placeholder AuthForm component
const AuthForm = () => <div className="flex items-center justify-center min-h-screen"><div className="bg-white p-8 rounded shadow w-full max-w-md"><h2 className="text-2xl font-bold mb-4">Login or Register</h2><p>Auth form goes here.</p></div></div>;

const Main = () => {
  const user = useAppSelector(state => state.auth.user);
  return user ? <div className="p-8">Welcome, {user.name}!</div> : <AuthForm />;
};

const App: React.FC = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App; 