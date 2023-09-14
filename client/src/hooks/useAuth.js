import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  if (!token) {
    navigate('/login');
  }

  return token;
};

export default useAuth;