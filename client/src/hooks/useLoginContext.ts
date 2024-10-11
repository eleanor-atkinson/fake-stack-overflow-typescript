import { useContext } from 'react';
import LoginContext, { LoginContextType } from '../contexts/LoginContext';

/**
 * Custom hook to access the LoginContext
 *
 * @returns LoginContextType - The context value for login management.
 */
const useLoginContext = (): LoginContextType => {
  const context = useContext(LoginContext);

  if (context === null) {
    throw new Error('Login context is null.');
  }

  return context;
};

export default useLoginContext;
