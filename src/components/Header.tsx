import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import logo from '../assets/image/logo.png';
import flagEn from '../assets/image/en.svg';
import flagVi from '../assets/image/vi.svg';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { getUser } from '../utils/authStorage';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import UserMenu from '../auth/UserMenu';
interface User {
  name: string;
  email: string;
}

const Header = () => {
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  const [flag, setFlag] = useState(localStorage.getItem('flag') || flagEn);

  const { t } = useTranslation();

  const [user, setUser] = useState<any>(null);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) setUser(savedUser);
  }, []);

  // Xử lý đổi ngôn ngữ
  useEffect(() => {
    i18n.changeLanguage(language);
    setFlag(language === 'en' ? flagEn : flagVi);
  }, [language]);

  const changeLanguage = () => {
    const newLanguage = language === 'en' ? 'vi' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    localStorage.setItem('flag', newLanguage === 'en' ? flagEn : flagVi);
  };

  // Hiệu ứng cuộn để đổi màu header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledPast(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {['lg'].map((expand) => (
        <Navbar className={`fixed-top ${isScrolledPast ? 'scrolled-past' : ''}`} key={expand} expand={expand}>
          <Container>
            <Navbar.Brand className='logo' as={Link} to="/home">
              <img src={logo} alt="Logo" />
              <div className='brand-name'>GREEN LAND</div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title className='logo' id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img src={logo} alt="Logo" />
                  <div className='brand-name'>GREEN LAND</div>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1">
                  <Nav.Link as={NavLink} to="/about-us">{t('about_us')}</Nav.Link>
                  <Nav.Link as={NavLink} to="/reality">{t('reality')}</Nav.Link>
                  <Nav.Link as={NavLink} to="/gallery">{t('gallery')}</Nav.Link>
                  <Nav.Link as={NavLink} to="/forests-map">Bản đồ</Nav.Link>
                  <Nav.Link as={NavLink} to="/donate">
                    <button className='button button-left'>{t('donate')}</button>
                  </Nav.Link>
                  <Nav.Link onClick={changeLanguage} style={{ cursor: 'pointer' }}>
                    <img src={flag} alt="flag" width="40" height="30" /> {language.toUpperCase()}
                  </Nav.Link>
                  <Popup
                    trigger={
                      <button className="btn btn-light d-flex align-items-center gap-2">
                        <FontAwesomeIcon icon={faUser} />
                        {user && <span>{user.name}</span>}
                      </button>
                    }
                    position="bottom center"
                    contentStyle={{ zIndex: 9999, padding: '20px', borderRadius: '10px', width: '300px' }}
                  >
                    {user ? (
                      <UserMenu user={user} onLogout={() => setUser(null)} />
                    ) : (
                      isLogin
                        ? <LoginForm switchToRegister={() => setIsLogin(false)} onLoginSuccess={setUser} />
                        : <RegisterForm switchToLogin={() => setIsLogin(true)} />
                    )}
                  </Popup>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Header;
