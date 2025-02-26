import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import '@fortawesome/fontawesome-free/css/all.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faAngleLeft, faAngleRight, faHeart, faCircleCheck, faLock } from '@fortawesome/free-solid-svg-icons'

import logo from './assets/image/logo.png';
import http from './assets/image/http.png'
import project_1 from './assets/image/project_1.jpg';
import project_2 from './assets/image/project_2.jpg';
import project_3 from './assets/image/project_3.jpg';
import footer_head from './assets/image/footer_head.png';

import flagEn from './assets/image/en.svg';
import flagVi from './assets/image/vi.svg';

import './donation.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { useTranslation } from 'react-i18next';
import i18n from './i18n';

const Donation: React.FC = () => {
    const [isScrolledPast, setIsScrolledPast] = useState(false);

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

    // React Slick
    var settings = {
        infinite: false,
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <FontAwesomeIcon icon={faAngleLeft} />,
        nextArrow: <FontAwesomeIcon icon={faAngleRight} />,
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
            {/* Project */}
            <div id="project">
                <Container>
                    <Slider {...settings} >
                        <div>
                            <Row>
                                <Col lg={7}>
                                    <img src={project_1} alt="" />
                                </Col>
                                <Col lg={5}>
                                    <h2>Nature's Keepers <br />
                                        Project
                                    </h2>
                                    <p>{t('pr1_des')}</p>

                                    <ProgressBar now={70} />
                                    <div className="status">
                                        <div className='donated'>70% {t('donated')}</div>
                                        <div className='goal'>{t('goal')}: 100,000,000 VND</div>
                                    </div>
                                    <hr />
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
                                    </ul>
                                    <div className="button-group">
                                        <Nav.Link as={NavLink} to="/payment/project1">
                                            <button className='button button-left'>{t('donate_now')}</button>
                                        </Nav.Link>
                                        <div className='follow'>
                                            <a href="https://www.facebook.com/" target='_blank'>
                                                <button>
                                                    <FontAwesomeIcon icon={faHeart} />
                                                    <span>{t('follow')}</span>
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Row>
                                <Col lg={7}>
                                    <img src={project_2} alt="" />
                                </Col>
                                <Col lg={5}>
                                    <h2>Forest's Friend <br />
                                        Project
                                    </h2>
                                    <p>{t('pr2_des')}</p>

                                    <ProgressBar now={100} />
                                    <div className="status">
                                        <div className='donated'>100% {t('donated')}</div>
                                        <div className='goal'>{t('goal')}: 500,000,000 VND</div>
                                    </div>
                                    <hr />
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
                                    </ul>
                                    <div className="button-group">
                                        <Nav.Link as={NavLink} to="/payment/project2">
                                            <button className='button button-left'>{t('donate_now')}</button>
                                        </Nav.Link>
                                        <div className='follow'>
                                            <a href="https://www.facebook.com/" target='_blank'>
                                                <button>
                                                    <FontAwesomeIcon icon={faHeart} />
                                                    <span>{t('follow')}</span>
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Row>
                                <Col lg={7}>
                                    <img src={project_3} alt="" />
                                </Col>
                                <Col lg={5}>
                                    <h2>EcoProtect Alliance <br />
                                        Project
                                    </h2>
                                    <p>{t('pr3_des')}</p>

                                    <ProgressBar now={40} />
                                    <div className="status">
                                        <div className='donated'>40% {t('donated')}</div>
                                        <div className='goal'>{t('goal')}: 700,000,000 VND</div>
                                    </div>
                                    <hr />
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
                                    </ul>
                                    <div className="button-group">
                                        <Nav.Link as={NavLink} to="/payment/project3">
                                            <button className='button button-left'>{t('donate_now')}</button>
                                        </Nav.Link>
                                        <div className='follow'>
                                            <a href="https://www.facebook.com/" target='_blank'>
                                                <button>
                                                    <FontAwesomeIcon icon={faHeart} />
                                                    <span>{t('follow')}</span>
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Slider>
                </Container>
            </div>
            {/* End Project */}
            {/* Story */}
            <div id="story">
                <Container>
                    <Row>
                        <Col lg={7}>
                            <h4>{t('how')}?</h4>
                            <p>{t('para_1')}</p>
                            <p>{t('para_2')}</p>
                            <div className='line'></div>
                            <div className="slogan">{t('slogan')}</div>
                            <ul>
                                <li>
                                    <FontAwesomeIcon className='icon' icon={faCircleCheck} />
                                    <span>{t('key_1')}</span>
                                </li>
                                <li>
                                    <FontAwesomeIcon className='icon' icon={faCircleCheck} />
                                    <span>{t('key_2')}</span>
                                </li>
                                <li>
                                    <FontAwesomeIcon className='icon' icon={faCircleCheck} />
                                    <span>{t('key_3')}</span>
                                </li>
                            </ul>
                        </Col>
                        <Col lg={5}>
                            <div className="box">
                                <div className="content">
                                    <p>{t('donate_phone')}?</p>
                                    <br />
                                    <span>{t('noproblem')}</span>
                                    <p>0236-3667-111</p>
                                    <br />
                                    <span>{t('oremail')}:</span>
                                    <p>greenland@gmail.com</p>
                                </div>
                            </div>
                            <div className="secure">
                                <img src={http} alt="" />
                                <p className='title'>{t('safe')}</p>
                                <p className='descript'>{t('safe_des')}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="video">
                    <Container>
                        <Row>
                            <Col lg={6}>
                                <p className='title-head'>{t('the_stories')}</p>
                                <h2 className='title-main'>{t('how')}</h2>
                                <span>{t('how_des')}</span>
                                <Nav.Link as={NavLink} to='/about-us'>
                                    <button>{t('how_explore')}</button>
                                </Nav.Link>
                            </Col>
                            <Col lg={6}>
                                <iframe
                                    width="100%"
                                    height="400"
                                    src={`https://www.youtube.com/embed/E4JKRaxr8zE?si=QQINO5xJu8AZZWzO`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            {/* End story */}
            {/* FAQ */}
            <div id="faq">
                <Container>
                    <h3>FAQ</h3>
                    <Row>
                        <Col lg={6}>
                            <p className='quest'>{t('quest_1')}</p>
                            <p className='ans'>- {t('ans_1')}</p>
                            <hr />
                            <p className='quest'>{t('quest_2')}</p>
                            <p className='ans'>- {t('ans_2')}</p>
                            <hr />
                            <p className='quest'>{t('quest_3')}</p>
                            <p className='ans'>- {t('ans_3')}</p>
                            <hr />
                            <p className='quest'>{t('quest_4')}</p>
                            <p className='ans'>- {t('ans_4')}</p>
                        </Col>
                        <Col lg={6}>
                            <p className='quest'>{t('quest_5')}</p>
                            <p className='ans'>- {t('ans_5')}</p>
                            <hr />
                            <p className='quest'>{t('quest_6')}</p>
                            <p className='ans'>- {t('ans_6')}</p>
                            <hr />
                            <p className='quest'>{t('quest_7')}</p>
                            <p className='ans'>- {t('ans_7')}</p>
                            <hr />
                            <p className='quest'>- {t('quest_8')}</p>
                            <p className='ans'>- {t('ans_8')}</p>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* End FAQ */}
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
};

export default Donation;
