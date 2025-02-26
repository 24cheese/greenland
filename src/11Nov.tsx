import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom';
import './13march.css'

import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faHouse, faUser, faClock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import logo from './assets/image/logo.png'

import footer_head from './assets/image/footer_head.png'

import flagEn from './assets/image/en.svg';
import flagVi from './assets/image/vi.svg';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { useTranslation } from 'react-i18next';
import i18n from './i18n';



interface Props { }

function Nov11(props: Props) {
    const { } = props

    const [isScrolledPast, setIsScrolledPast] = useState(false);

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
            {/* Main */}
            <div id="content">
                <div className="head">
                    <div className="header">{t('title_4')}</div>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/home">
                                <FontAwesomeIcon icon={faHouse} />
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{t('title_4')}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Container>
                    <div className="top">
                        <FontAwesomeIcon icon={faUser} />
                        Admin -
                        <FontAwesomeIcon icon={faClock} />
                        {t('date_4')} - {t('latest')}
                    </div>
                    <div className="inner_main_content">
                        <img src={"https://image.vietnamnews.vn/uploadvnnews/Article/2021/11/22/187041_thatete2-21.jpg"} alt="" />
                        <p>{t('new_1_1')}</p>
                        <p>{t('new_1_2')}</p>
                        <p>{t('new_1_3')}</p>
                        <p>{t('new_1_4')}</p>
                        <img src={"https://image.vietnamnews.vn/uploadvnnews/Article/2021/11/22/187042_thatete3-21.jpg"} alt="" />
                        <img src={"https://www.nature.org.vn/en/wp-content/uploads/2023/07/1304_taphuantruyenthong3-2.jpeg"} alt="" />
                        <p className='share'>{t('sharing')}</p>
                        <ul className='socials-list'>
                            <li>
                                <a href="https://www.facebook.com/" target='_blank'>
                                    <FontAwesomeIcon className='icon' icon={faFacebookF} />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/">
                                    <FontAwesomeIcon className='icon' icon={faInstagram} />
                                </a>

                            </li>
                            <li>
                                <a href="https://www.linkedin.com/">
                                    <FontAwesomeIcon className='icon' icon={faLinkedin} />
                                </a>
                            </li>
                            <li>
                                <a href="https://x.com/?lang=vi">
                                    <FontAwesomeIcon className='icon' icon={faTwitter} />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.google.com/intl/vi/gmail/about/">
                                    <FontAwesomeIcon className='icon' icon={faEnvelope} />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="navigator">
                        <div className="prev">
                            <Link to="/release">
                                <FontAwesomeIcon icon={faAngleLeft} /> <span>{t('prev')}</span>
                            </Link>
                        </div>
                        <div className="next">
                            <Link to="/saving">
                                <span>{t('next')}</span><FontAwesomeIcon icon={faAngleRight} />
                            </Link>
                        </div>
                    </div>
                </Container >
            </div >
            {/* End main */}
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

export default Nov11;

