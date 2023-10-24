import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth-context';

function Profile() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    // Check if currentUser is stored in localStorage on component mount
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
    }
  }, [setCurrentUser]);

  const signOut = () => {
    // Clear the currentUser from localStorage
    localStorage.removeItem('currentUser');
    // Clear the currentUser in your context
    setCurrentUser(null);
  };

  return (
    <div>
      <h3>Welcome! {currentUser?.email}</h3>
      <p>Sign In Status: {currentUser ? 'active' : 'not active'}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default Profile;



