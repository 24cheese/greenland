import { useState, useEffect, SetStateAction } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import './donate.css';

import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import { Container, Row, Col, } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import project_1 from './assets/image/project_1.jpg'
import project_2 from './assets/image/project_2.jpg'
import project_3 from './assets/image/project_3.jpg'
import vnpay from './assets/image/vnpay.png'
import logo from './assets/image/logo.png';
import footer_head from './assets/image/footer_head.png'

import flagEn from './assets/image/en.svg';
import flagVi from './assets/image/vi.svg';

import { useTranslation } from 'react-i18next';
import i18n from './i18n';

interface Props { }

function Donate2(props: Props) {
    const { } = props;

    const [isScrolledPast, setIsScrolledPast] = useState(false);
    const navigate = useNavigate();

    // Effect for header
    useEffect(() => {
        function handleScroll() {
            const isPast = window.scrollY > 0;
            setIsScrolledPast(isPast);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Donate Method
    const [donateMethod, setDonateMethod] = useState('');

    const handleDonateMethodChange = (method: SetStateAction<string>) => {
        setDonateMethod(method);
    };

    useEffect(() => {
        setDonateMethod('online');
    }, []);

    // Donate
    const [amount, setAmount] = useState<number>(0);
    const [locale, setLocale] = useState<string>('en');

    const handleDonate = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/payment/create_payment_url', {
                amount,
                locale
            });
            window.location.href = response.data.redirectUrl;
        } catch (error) {
            console.error('Payment error:', error);
        }
    };

    const [showAlert, setShowAlert] = useState(false);

    const handleDonateNow = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false); // Tắt alert sau 3 giây
            navigate('/donate'); // Chuyển hướng sau 3 giây
        }, 2000);
    };

    // Change language
    const [language, setLanguage] = useState<string>(localStorage.getItem('language') || 'en');
    const [flag, setFlag] = useState<string>(localStorage.getItem('flag') || flagEn);

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
    const { t } = useTranslation();


    return (
        <>
            {/* Header*/}
            {['lg'].map((expand) => (
                <Navbar className={`fixed-top ${isScrolledPast ? 'scrolled-past' : ''}`} key={expand} expand={expand}>
                    <Container>
                        <Navbar.Brand className='logo' href="#">
                            <img src={logo} alt="" />
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
                                    <img src={logo} alt="" />
                                    <div className='brand-name'>GREEN LAND</div>
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1">
                                    <Nav.Link as={NavLink} to="/home">{t('home')}</Nav.Link>
                                    <Nav.Link as={NavLink} to="/about-us">{t('about_us')}</Nav.Link>
                                    <Nav.Link as={NavLink} to="/reality">{t('reality')}</Nav.Link>
                                    <Nav.Link as={NavLink} to="/gallery">{t('gallery')}</Nav.Link>
                                    <Nav.Link as={NavLink} to="/donate">
                                        <button className='button button-left'>{t('donate')}</button>
                                    </Nav.Link>
                                    <Nav.Link onClick={changeLanguage} style={{ cursor: 'pointer' }}>
                                        <img src={flag} alt="flag" width="40" height="30" /> {language.toUpperCase()}
                                    </Nav.Link>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
            {/* End Header*/}
            {/* Hero section */}
            <div id="hero">
                <Container>
                    <h1>{t('make_donation')}</h1>
                </Container>
            </div>
            {/* End hero section */}
            {/* Donate */}
            <div id="main">
                <Container>
                    <Row>
                        <Col xl={3} className='image'>
                            <img src={project_3} alt="" />
                        </Col>
                        <Col xl={4} className='content'>
                            <h6>{t('donatingto')}:</h6>
                            <h4>EcoProtect Alliance</h4>
                            <p>{t('pr3_des')}!</p>
                            <ul className='socials-list'>
                                <li>
                                    <FontAwesomeIcon className='icon' icon={faFacebookF} />
                                </li>
                                <li>
                                    <FontAwesomeIcon className='icon' icon={faInstagram} />
                                </li>
                                <li>
                                    <FontAwesomeIcon className='icon' icon={faLinkedin} />
                                </li>
                                <li>
                                    <FontAwesomeIcon className='icon' icon={faTwitter} />
                                </li>
                            </ul>
                        </Col>
                        <Col xl={5}>
                            <div className="donate-box">
                                <div>
                                    <label>{t('donation_amount')}: </label>
                                    <br />
                                    <input
                                        className='amount'
                                        type="number"
                                        placeholder='Amount (VND)'
                                        value={amount}
                                        onChange={(e) => setAmount(parseInt(e.target.value))} />
                                </div>
                                <Row>
                                    <Col md={6}>
                                        <div className="form-check form-check-radio">
                                            <input
                                                type="radio"
                                                name='donate-method'
                                                className="form-check-input"
                                                required={true}
                                                checked={donateMethod === 'online'}
                                                onChange={() => handleDonateMethodChange('online')} />
                                            <label
                                                className="form-check-label"
                                                htmlFor="online"
                                            >
                                                {t('online')}
                                            </label>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="form-check form-check-radio">
                                            <input
                                                type="radio"
                                                name='donate-method'
                                                className="form-check-input"
                                                required={true}
                                                onChange={() => handleDonateMethodChange('offline')} />
                                            <label
                                                className="form-check-label"
                                                htmlFor="offline"
                                            >
                                                {t('offline')}
                                            </label>
                                        </div>
                                    </Col>
                                </Row>
                                {donateMethod === 'offline' && (
                                    <div className="offline-content">
                                        <div className='title'>{t('method')}</div>
                                        <div className='main-content'>
                                        {t('donate_des')}
                                        </div>
                                        <br />
                                        <button className='button button-left' onClick={handleDonateNow}>{t('donate_now')}</button>
                                    </div>
                                )}
                                {donateMethod === 'online' && (
                                    <div className="online-content">
                                        <div className='title'>{t('method')}</div>
                                        <img src={vnpay} alt="" />
                                        <br />
                                        <button className='button button-left' onClick={handleDonate}>{t('donate_now')}</button>
                                    </div>
                                )}
                                {showAlert && (
                                    <Alert className="alert-position" variant="success" onClose={() => setShowAlert(false)} dismissible>
                                        Donation successful! Thank you for your contribution.
                                    </Alert>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* Project's description */}
            <div id="des">
                <Container>
                    <Row>
                        <Col xl={7} className='descript'>
                            <h3>{t('introduce')} THE ECOPROTECT ALLIANCE</h3>
                            <p>{t('pr3_1')}</p>
                            <p>{t('pr3_2')}</p>
                            <p>{t('pr3_3')}</p>
                            <hr />
                        </Col>
                        <Col md={7} >
                            <h4>{t('promise')}</h4>
                            <p className='promise'>{t('promise_des')}</p>
                        </Col>
                    </Row>

                </Container>
            </div >
            {/* End project's description */}
            {/* End section Donate */}
            {/* Footer */}
            <div id="footer">
                <div className='footer-head'>
                    <img src={footer_head} alt="" />
                </div>
                <div className="footer_main">
                    <Container>
                        <div className="inner-main">
                            <Row>
                                <Col lg={4} sm={12}>
                                    <h2>GREEN LAND</h2>
                                    <p>{t('footer_des')}</p>
                                    <div className="contact-list">
                                        <a href="https://www.facebook.com/" target='_blank'>
                                            <FontAwesomeIcon className='icon' icon={faFacebookF} />
                                        </a>
                                        <a href="https://www.instagram.com/" target='blank'>
                                            <FontAwesomeIcon className='icon' icon={faInstagram} />
                                        </a>
                                        <a href="https://x.com/?lang=vi" target='blank'>
                                            <FontAwesomeIcon className='icon' icon={faTwitter} />
                                        </a>
                                        <a href="https://www.linkedin.com/" target='blank'>
                                            <FontAwesomeIcon className='icon' icon={faLinkedin} />
                                        </a>
                                    </div>
                                </Col>
                                <Col lg={2} xs={6}>
                                    <ul>
                                        <li className='head'><b>{t('nav')}</b></li>
                                        <li>
                                            <Link to='/home'>{t('home')}</Link>
                                        </li>
                                        <li>
                                            <Link to='/about-us'>{t('about_us')}</Link>
                                        </li>
                                        <li>
                                            <Link to='/reality'>{t('reality')}</Link>
                                        </li>
                                        <li>
                                            <Link to='/contact'>{t('contact')}</Link>
                                        </li>
                                        <li>
                                            <Link to='/donate'>{t('donate')}</Link>
                                        </li>
                                    </ul>
                                </Col>
                                <Col lg={3} xs={6}>
                                    <ul>
                                        <li className='head'><b>{t('contact')}</b></li>
                                        <li>{t('phone')}: 0236 3667 111</li>
                                        <li>Email: greenland@gmail.com</li>
                                        <li>{t('address')}</li>
                                    </ul>
                                </Col>
                                <Col lg={3} sm={12}>
                                    <ul>
                                        <li className='head'><b>Mailbox</b></li>
                                        <li>{t('mail_box_des')}</li>
                                        <li className='email-input'>
                                            <form action="">
                                                <input type="email" name="" id="" placeholder={t('your_email')} />
                                                <button>{t('send')}</button>
                                            </form>
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                            <hr />
                            <div className="copyright-box">
                                <div className="content">
                                    Copyright &copy; Green Land since 2014
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
            {/* Footer */}
        </>
    );
}

export default Donate2;
