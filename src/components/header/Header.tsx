import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import './header.scss';
import Logo from '../../assets/img/Logo.webp';
import { clearToken, isTokenExpired } from '../../utils/auth';
import { profileEffectCallbacks } from '../../services/paths/effectCallbacksInstances';
import { UserContext } from '../../context/UserContext';

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userContext = useContext(UserContext);
  const userData = userContext?.userData;
  const updateUser = userContext?.updateUser;

  useEffect(() => {
    if (isTokenExpired()) {
      clearToken();
    } else {
      setIsAuthenticated(true);
      fetchUserData();
    }
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (token) {
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.userId;

        const response = await profileEffectCallbacks.single({ userId });

        updateUser?.(response);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = () => {
    clearToken();
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header>
      <div className="header-content">
        <Image width={50} src={Logo} alt="Logo" onClick={() => history.back()} />

        {isAuthenticated ? (
          <nav>
            <Button onClick={() => navigate('/people')}>Users</Button>
            <Button onClick={handleLogout}>LogOut</Button>
            <Button icon={<UserOutlined />} onClick={() => navigate('/account')}>
              Account
            </Button>
            {userData?.profilePicture ? (
              <img
                alt={userData?.name}
                src={`${process.env.REACT_APP_API_ROUTE}/${userData?.profilePicture}`}
                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%' }}
              />
            ) : (
              <UserOutlined style={{ fontSize: '32px', color: '#1890ff', borderRadius: '50%' }} />
            )}
          </nav>
        ) : (
          <nav>
            <Button onClick={() => navigate('/')}>Registration</Button>
            <Button onClick={() => navigate('/login')}>Login</Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
