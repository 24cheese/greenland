import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom';
import './homepage.css'

import { Container, Row, Col, ProgressBar, Button, NavDropdown } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faCircleCheck, faCircleDollarToSlot, faHourglassStart, faCheck, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import logo from './assets/image/logo.png'
import about_1 from './assets/image/about-1.jpg'
import section_7_1 from './assets/image/section_4_1.jpeg'
import section_7_2 from './assets/image/section_4_2.jpg'
import section_7_3 from './assets/image/section_4_3.jpg'
import section_7_4 from './assets/image/section_4_4.jpg'
import section_7_5 from './assets/image/section_4_5.png'
import project_1 from './assets/image/project_1.jpg'
import project_2 from './assets/image/project_2.jpg'
import project_3 from './assets/image/project_3.jpg'
import footer_head from './assets/image/footer_head.png'

import flagEn from './assets/image/en.svg';
import flagVi from './assets/image/vi.svg';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import AOS from 'aos';
import 'aos/dist/aos.css';

import { useTranslation } from 'react-i18next';
import i18n from './i18n';

interface Props { }

function HomePage(props: Props) {
   const { } = props

   const [isScrolledPast, setIsScrolledPast] = useState(false);

   // Effect for hero section
   useEffect(() => {
      function onMouseMove(e: any) {
         document.documentElement.style.setProperty("--cursor-x", e.clientX + 'px');
         document.documentElement.style.setProperty("--cursor-y", e.clientY + 'px');
      }

      window.addEventListener('mousemove', onMouseMove);

      return (() => {
         window.removeEventListener('mousemove', onMouseMove)
      })
   }, [])

   function onMouseEnter() {
      document.documentElement.style.setProperty("--cursor-size", "400px");
   }

   function onMouseLeave() {
      document.documentElement.style.setProperty("--cursor-size", "42px");
   }
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

   // React Slick
   var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
         {
            breakpoint: 798,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 2,
               initialSlide: 2,
            }
         },
         {
            breakpoint: 576,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
            }
         },
      ],
      // prevArrow: <FontAwesomeIcon icon={faAngleLeft} />,
      // nextArrow: <FontAwesomeIcon icon={faAngleRight} />,
   };

   // Animation on Scroll
   useEffect(() => {
      AOS.init({
         duration: 1000,
         once: true,
      });
   }, []);

   // Impact effect
   useEffect(() => {
      let countTriggered = false;

      const handleScroll = () => {
         if (!countTriggered && isInViewport(document.getElementById('impact') as HTMLElement)) {
            countTriggered = true;
            countUp('yearCount', 9);
            countUp('partnerCount', 53);
            countUp('projectCount', 48);
            countUp('memberCount', 5);
         }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   const isInViewport = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;

      const verticallyVisible = rect.top <= windowHeight && rect.bottom >= 0;
      const horizontallyVisible = rect.left <= windowWidth && rect.right >= 0;

      return verticallyVisible && horizontallyVisible;
   };

   const countUp = (id: string, target: number) => {
      let current = 0;
      const increment = Math.ceil(target / 10);
      const interval = setInterval(() => {
         if (current >= target) {
            clearInterval(interval);
         } else {
            current += increment;
            const element = document.getElementById(id);
            if (element) {
               element.textContent = current.toLocaleString();
            }
         }
      }, 100);
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
// Form
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');

   const [nameError, setNameError] = useState('');
   const [emailError, setEmailError] = useState('');

   const validateName = (name : string) => {
      return /^[a-zA-Z\s]*$/.test(name);
   };

   const validateEmail = (email : string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
   };

   const handleFirstNameChange = (e : any) => {
      const value = e.target.value;
      setFirstName(value);
      validateNames(value, lastName);
   };

   const handleLastNameChange = (e : any) => {
      const value = e.target.value;
      setLastName(value);
      validateNames(firstName, value);
   };

   const validateNames = (first : string, last : string) => {
      if (!first && !last) {
         setNameError(t('name_require'));
      } else if (!validateName(first) || !validateName(last)) {
         setNameError(t('name_error'));
      } else {
         setNameError('');
      }
   };

   const handleEmailChange = (e : any) => {
      const value = e.target.value;
      setEmail(value);
      if (!value) {
         setEmailError(t('mail_require'));
      } else if (!validateEmail(value)) {
         setEmailError(t('mail_error'));
      } else {
         setEmailError('');
      }
   };

   const handleSubmit = (e : any) => {
      e.preventDefault();
      validateNames(firstName, lastName);
      if (!nameError && !emailError) {
         console.log('Form submitted');
      }
   };

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
                           <Nav.Link as={NavLink} to="/home" className='active'>{t('home')}</Nav.Link>
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
         {/* Hero Section */}
         <div className="hero-section">
            <div className="layer layer-01">
               <div className="text-container text-01" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                  <div>{t('variety')}</div>
                  <div>{t('is_the')}</div>
                  <div>{t('spice')}</div>
                  <div>{t('of')}</div>
                  <div>{t('life')}</div>
               </div>
            </div>
            <div className="layer layer-02">
               <div className="text-container">
                  <div>{t('keep')} </div>
                  <div>{t('variety')}</div>
                  <div>{t('and')}</div>
                  <div>{t('prevent')}</div>
                  <div>{t('extinction')}!</div>
               </div>
            </div>
         </div>
         {/*End Hero Section */}
         {/* Section Introduce */}
         <div id="introduce">
            <Container>
               <Row>
                  <Col lg={6}>
                     <div className="image-box">
                        <div className="shape"></div>
                        <div className="image">
                           <img src={about_1} alt="" />
                        </div>
                     </div>
                  </Col>
                  <Col lg={6}>
                     <div className="content-box">
                        <h2>{t('welcome')}</h2>
                        <h4>{t('help_us')}</h4>
                        <p>{t('descript_1')}</p>
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
                        <Link to="/about-us" className='button button-left'>{t('discover_more')}</Link>
                     </div>
                  </Col>
               </Row>
            </Container>
         </div>
         {/* End Introduce */}
         {/* Section impact */}
         <div id="impact">
            <Container>
               <div className="inner-content">
                  <h2>{t('impact')}</h2>
                  <ul className="inner-infor">
                     <li>
                        <h3 id="yearCount">1</h3>
                        <p>{t('exp')}</p>
                     </li>
                     <li>
                        <h3 id="partnerCount">1</h3>
                        <p>{t('partner')}</p>
                     </li>
                     <li>
                        <h3 id="projectCount">1</h3>
                        <p>{t('project')}</p>
                     </li>
                     <li>
                        <div className="box d-flex">
                           <h3 id="memberCount">1</h3>
                           <h3> K</h3>
                        </div>
                        <p>{t('mem')}</p>
                     </li>
                  </ul>
               </div>
            </Container>
         </div>
         {/* End section impact */}
         {/* Section recentproj */}
         <div id="recent-proj">
            <div className="head">
               <h2>{t('recent_prj')}</h2>
            </div>
            <Container>
               <div className="card__container">
                  <Row>
                     <Col lg={4} className="card__article">
                        <img src={project_1} alt="image" className='card__img' />
                        <div className="image-title">Nature's Keepers</div>
                        <div className="card__data">
                           <h2 className="card__title">Nature's Keepers Project</h2>
                           <Link to="/payment/project1" className='card__button button button-left'>
                              {t('donate_now')}
                           </Link>
                        </div>
                     </Col>

                     <Col lg={4} className="card__article">
                        <img src={project_2} alt="image" className='card__img' />
                        <div className="image-title">Forest's Friends</div>
                        <div className="card__data">
                           <h2 className="card__title">Forest's Friends Project</h2>
                           <Link to="/payment/project2" className='card__button button button-left'>
                              {t('donate_now')}
                           </Link>
                        </div>
                     </Col>

                     <Col lg={4} className="card__article">
                        <img src={project_3} alt="image" className='card__img' />
                        <div className="image-title">EcoProtect Alliance</div>
                        <div className="card__data">
                           <h2 className="card__title">EcoProtect Alliance</h2>
                           <Link to="/payment/project3" className='card__button button button-left'>
                              {t('donate_now')}
                           </Link>
                        </div>
                     </Col>
                  </Row>
               </div>
            </Container>
         </div>
         {/* End section recentproj */}
         {/* How we work section */}
         <div id="work">
            <Container>
               <div className="title">
                  <h4>{t('working_process')}</h4>
                  <h2>{t('you_donate')}</h2>
               </div>
               <Row>
                  <Col lg={4} className='step step-1'>
                     <div className="step-content">
                        <div className="step-icon">
                           <FontAwesomeIcon icon={faCircleDollarToSlot} />
                        </div>
                        <div className="step-name">{t('donating')}</div>
                        <div className="step-description">{t('d_des')}</div>
                     </div>
                     <div className="step-line">
                        <img src="https://demo.bravisthemes.com/nonta/wp-content/uploads/2023/07/line1.png" alt="" />
                     </div>
                  </Col>
                  <Col lg={4} className='step step-2'>
                     <div className="step-content">
                        <div className="step-icon">
                           <FontAwesomeIcon icon={faHourglassStart} />
                        </div>
                        <div className="step-name">{t('process')}</div>
                        <div className="step-description">{t('p_des')}</div>
                     </div>
                     <div className="step-line">
                        <img src="https://demo.bravisthemes.com/nonta/wp-content/uploads/2023/07/line2.png" alt="" />
                     </div>
                  </Col>
                  <Col lg={4} className='step step-3'>
                     <div className="step-content">
                        <div className="step-icon">
                           <FontAwesomeIcon icon={faCheck} />
                        </div>
                        <div className="step-name">{t('complete')}</div>
                        <div className="step-description">{t('p_des')}</div>
                     </div>
                  </Col>
               </Row>
            </Container>
         </div>
         {/* End how we work section */}
         {/* Section latest new */}
         <div id="latest-new" >
            <Container>
               <h2>{t('latest_new')}</h2>
               <div>
                  <Slider {...settings} >
                     <div className='inner-box'>
                        <div className="box-header">
                           <div className="main-img">
                              <a href="#" target='_blank'>
                                 <Nav.Link as={NavLink} to="/trainning"><img src={section_7_1} alt="" /></Nav.Link>
                              </a>
                           </div>
                           <div className="date-box">
                              <p>13</p>
                              <span>Mar</span>
                           </div>
                        </div>
                        <div className="title">
                           <Nav.Link as={NavLink} to="/trainning">{t('new_1')}</Nav.Link>
                        </div>
                        <div className="description">{t('new_1_des')}</div>
                     </div>
                     <div className='inner-box'>
                        <div className="box-header">
                           <div className="main-img">
                              <a href="#" target='_blank'>
                                 <Nav.Link as={NavLink} to="/conferences"><img src={section_7_2} alt="" /></Nav.Link>
                              </a>
                           </div>
                           <div className="date-box">
                              <p>27</p>
                              <span>Jan</span>
                           </div>
                        </div>
                        <div className="title">
                           <Nav.Link as={NavLink} to="/conferences">{t('new_2')}</Nav.Link>
                        </div>
                        <div className="description">{t('new_2_des')}</div>
                     </div>
                     <div className='inner-box'>
                        <div className="box-header">
                           <div className="main-img">
                              <a href="#" target='_blank'>
                                 <Nav.Link as={NavLink} to="/release"><img src={section_7_3} alt="" /></Nav.Link>
                              </a>
                           </div>
                           <div className="date-box">
                              <p>04</p>
                              <span>Dec</span>
                           </div>
                        </div>
                        <div className="title">
                           <a href="#" target='_blank'>
                              <Nav.Link as={NavLink} to="/realse">{t('new_3')}</Nav.Link>
                           </a>
                        </div>
                        <div className="description">{t('new_3_des')}</div>
                     </div>
                     <div className='inner-box'>
                        <div className="box-header">
                           <div className="main-img">
                              <a href="#" target='_blank'>
                                 <Nav.Link as={NavLink} to="/resued"><img src={section_7_4} alt="" /></Nav.Link>
                              </a>
                           </div>
                           <div className="date-box">
                              <p>11</p>
                              <span>Nov</span>
                           </div>
                        </div>
                        <div className="title">
                           <a href="#" target='_blank'>
                              <Nav.Link as={NavLink} to="/resued">{t('new_4')}</Nav.Link>
                           </a>
                        </div>
                        <div className="description">{t('new_4_des')}</div>
                     </div>
                     <div className='inner-box'>
                        <div className="box-header">
                           <div className="main-img">
                              <a href="#" target='_blank'>
                                 <Nav.Link as={NavLink} to="/saving"><img src={section_7_5} alt="" /></Nav.Link>
                              </a>
                           </div>
                           <div className="date-box">
                              <p>23</p>
                              <span>Dec</span>
                           </div>
                        </div>
                        <div className="title">
                           <a href="#" target='_blank'>
                              <Nav.Link as={NavLink} to="/saving">{t('new_5')}</Nav.Link>
                           </a>
                        </div>
                        <div className="description">{t('new_5_des')}</div>
                     </div>
                  </Slider>
               </div>
            </Container>
         </div>
         {/* End section latest new */}
         {/* Feed back */}
         {/* <div id="feedback">
            <h2>{t('feedback')}</h2>
            <Container>
               <div>
                  <Slider {...settings2}>
                     <div className="fb-card">
                        <div className="fb-avatar">
                           <img src="https://i.pinimg.com/236x/ca/8b/41/ca8b41622910b791c596d71e85e660d2.jpg" alt="" />
                        </div>
                        <div className="fb-content">
                           <p>{t('fb_1')}</p>
                        </div>
                     </div>
                     <div className="fb-card">
                        <div className="fb-avatar">
                           <img src="https://i.pinimg.com/236x/47/ca/e6/47cae64d490d3b27943379aa24b35fcf.jpg" alt="" />
                        </div>
                        <div className="fb-content">
                           <p>{t('fb_2')}</p>
                        </div>
                     </div>
                     <div className="fb-card">
                        <div className="fb-avatar">
                           <img src="https://i.pinimg.com/236x/12/0f/da/120fda80253199dbe6c7682f9fd50e8e.jpg" alt="" />
                        </div>
                        <div className="fb-content">
                           <p>{t('fb_3')}</p>
                        </div>
                     </div>
                     <div className="fb-card">
                        <div className="fb-avatar">
                           <img src="https://i.pinimg.com/236x/e4/2e/13/e42e138bc900aa3e35669fcfdfa5120c.jpg" alt="" />
                        </div>
                        <div className="fb-content">
                           <p>{t('fb_4')}</p>
                        </div>
                     </div>
                     <div className="fb-card">
                        <div className="fb-avatar">
                           <img src="https://i.pinimg.com/236x/19/fe/d1/19fed161e08b6be900b63c4db920a6a5.jpg" alt="" />
                        </div>
                        <div className="fb-content">
                           <p>{t('fb_5')}</p>
                        </div>
                     </div>
                  </Slider>
               </div>
            </Container>
         </div> */}
         {/* End feedback */}
         {/* Section subscribe */}
         <div id="subscribe">
            <Container>
               <div className="inner-main">
                  <div className="inner-content">
                     <h2>{t('volunteer')}</h2>
                     <p>{t('volunteer_des')}</p>
                  </div>
               </div>
            </Container>
         </div>
         {/* End section subscribe */}
         {/* Contact */}
         <div className="contact-section">
            <Container>
               <Row>
                  <div className="col-xl-5 col-12 ms-auto mb-5 ">
                     <div className="contact-main">
                        <p className='address'>
                           <FontAwesomeIcon icon={faLocationDot} />
                           <span>470 Tran Dai Nghia,
                              <br /> Da Nang</span>
                        </p>
                        <p className='phone'>
                           <FontAwesomeIcon icon={faPhone} />
                           <span>0236 3667 111</span> <br />
                           <span>greenland@gmail.com</span>
                        </p>
                     </div>
                  </div>
                  <div className="col-xl-5 col-12 mx-auto">
                     <form action="#" className="contact-form custom-form" onSubmit={handleSubmit}>
                        <p style={{ color: "#315740" }}>{t('our_contact')}</p>
                        <h2>{t('getin')}</h2>
                        <div className="row">
                           <div className="col-lg-6 col-md-6 col-12">
                              <input
                                 type="text"
                                 className="form-control"
                                 name="first-name"
                                 id="first-name"
                                 placeholder={t('fname')}
                                 value={firstName}
                                 onChange={handleFirstNameChange}
                              />
                           </div>
                           <div className="col-lg-6 col-md-6 col-12">
                              <input
                                 type="text"
                                 className="form-control"
                                 name="last-name"
                                 id="last-name"
                                 placeholder={t('lname')}
                                 value={lastName}
                                 onChange={handleLastNameChange}
                              />
                           </div>
                        </div>
                        <div className="error-message">{nameError}</div>
                        <input
                           type="email"
                           className="form-control"
                           name="email"
                           id="email"
                           placeholder="example@gmail.com"
                           value={email}
                           onChange={handleEmailChange}
                        />
                        <div className="error-message">{emailError}</div>
                        <textarea
                           name="message"
                           id="message"
                           className="form-control"
                           rows={5}
                           placeholder={t('help')}
                           defaultValue={""}
                        />
                        <button type='submit' className="button button-left">{t('mess')}</button>
                     </form>
                  </div>
               </Row>
            </Container>
         </div>
         {/* End contact */}
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

export default HomePage;

