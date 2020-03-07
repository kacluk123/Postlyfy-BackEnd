import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { destroyUserData } from '../../redux/actions/userActions';
import { logout } from '../../api/endpoints/auth/logout/logout';

const useLogout = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const destroyAuthTokenCookie = async () => {
    await logout();
  };

  const destroyLocalUserData = () => {
    dispatch(destroyUserData());
  };

  const redirectToMainPage = () => {
    if (history.location.pathname !== '/taglist' || !history.location.pathname.startsWith('/posts')) {
      history.push('/taglist');
    }
  };

  const logoutUser = async () => {
    await destroyAuthTokenCookie();
    destroyLocalUserData();
    redirectToMainPage();
  };

  return [logoutUser];
};

export default useLogout;