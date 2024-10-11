import { useContext } from 'react';
import UserContext, { UserContextType } from '../contexts/UserContext';

/**
 * Custom hook to access the UserContext and return the user-related data and socket.
 * It provides easier access to UserContext in components without needing to import useContext repeatedly.
 *
 * @returns The current value of UserContext which includes the user data and socket connection.
 */
const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error('User context is null.');
  }

  return context;
};

export default useUserContext;
