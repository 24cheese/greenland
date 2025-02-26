import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import './gallery.css'
import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import i18n from './i18n';

import logo from './assets/image/logo.png'
import flagEn from './assets/image/en.svg';
import flagVi from './assets/image/vi.svg';
import { NavLink } from 'react-router-dom';

interface Props { }

function Gallery(props: Props) {
    // effect for load more
    useEffect(() => {
        let currentItems = 1;
        const loadmore = document.querySelector('.load-more') as HTMLElement;

        const handleLoadMore = (e: MouseEvent) => {
            e.preventDefault();
            const elementList = Array.from(document.querySelectorAll('.animals-gallery .gallery')) as HTMLElement[];
            (e.target as HTMLElement).classList.add('show-loader');

            for (let i = currentItems; i < currentItems + 1; i++) {
                setTimeout(() => {
                    (e.target as HTMLElement).classList.remove('show-loader');
                    if (elementList[i]) {
                        elementList[i].style.display = window.innerWidth <= 560 ? 'block' : 'grid';
                    }
                }, 1000);
            }
            currentItems += 1;

            if (currentItems >= elementList.length) {
                (e.target as HTMLElement).classList.add('loaded');
            }
        };

        loadmore.addEventListener('click', handleLoadMore);

        return () => {
            loadmore.removeEventListener('click', handleLoadMore);
        };
    }, []);


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
            {/* Header */}
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
            {/* End header */}
            {/* Main */}
            <section className="animals-gallery">
                <hr className="threats-line" />
                <h2 className="gallery-header">{t('animals')} <span className="text-success fw-lighter">{t('Gallery')}</span></h2>
                <div className="gallery">
                    <div className="gallery__item gallery__item--1">
                        <a href="https://vi.wikipedia.org/wiki/R%C3%B9a_bi%E1%BB%83n" className="gallery__link" target='_blank'>
                            <img src={"https://images.pexels.com/photos/5349869/pexels-photo-5349869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} className="gallery__image" alt="" />
                            <div className="gallery__overlay">
                                <span>{t('sea_turtle')}</span>
                            </div>
                        </a>
                    </div>
                    <div className="gallery__item gallery__item--2">
                        <a href="https://vi.wikipedia.org/wiki/Rhinoceros" className="gallery__link" target='_blank'>
                            <img src={"https://images.pexels.com/photos/16040/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} className="gallery__image" alt="" />
                            <div className="gallery__overlay">
                                <span>{t('rhino')}</span>
                            </div>
                        </a>
                    </div>
                    <div className="gallery__item gallery__item--3">
                        <a href="https://en.wikipedia.org/wiki/Deer" className="gallery__link">
                            <img src={"https://images.pexels.com/photos/3874511/pexels-photo-3874511.jpeg?auto=compress&cs=tinysrgb&w=600"} className="gallery__image" alt="" />
                            <div className="gallery__overlay">
                                <span>{t('deer')}</span>
                            </div>
                        </a>
                    </div>
                    <div className="gallery__item gallery__item--4">
                        <a href="https://en.wikipedia.org/wiki/Elephant" className="gallery__link">
                            <img src={"https://images.pexels.com/photos/53125/elephant-tusk-ivory-animal-53125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} className="gallery__image" alt="" />
                            <div className="gallery__overlay">
                                <span>{t('elephant')}</span>
                            </div>
                        </a>
                    </div>
                    <div className="gallery__item gallery__item--5">
                        <a href="https://en.wikipedia.org/wiki/Koala" className="gallery__link">
                            <img src={"https://images.pexels.com/photos/3059285/pexels-photo-3059285.jpeg"} className="gallery__image" alt="" />
                            <div className="gallery__overlay">
                                <span>{t('koalar')}</span>
                            </div>
                        </a>
                    </div>
                    <div className="gallery__item gallery__item--6">
                        <a href="https://en.wikipedia.org/wiki/Giant_panda" className="gallery__link">
                            <img src={"https://images.pexels.com/photos/1661535/pexels-photo-1661535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} className="gallery__image" alt="" />
                            <div className="gallery__overlay">
                                <span>{t('gpanda')}</span>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="gallery pt-2">
                    <div className="gallery__item gallery__item--1">
                        <a href="https://en.wikipedia.org/wiki/Puffin" className="gallery__link">
                            <img alt="" src={"https://images.pexels.com/photos/6471196/pexels-photo-6471196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} className="gallery__image" />
                            <div className="gallery__overlay">
                                <span>{t('puffin')}</span>
                            </div>
                        </a>
                    </div>
                    <div className="gallery__item gallery__item--2">
                        <a href="https://en.wikipedia.org/wiki/Red_panda" className="gallery__link">
                            <img alt="" src={"https://images.pexels.com/photos/5633389/pexels-photo-5633389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} className="gallery__image" />
                            <div className="gallery__overlay">
                                <span>{t('rpanda')}</span>
                            </div>
                        </a>
                    </div>
                    <div className="gallery__item gallery__item--3">
                        <a href="https://en.wikipedia.org/wiki/Amur_leopard" className="gallery__link">
                            <img alt="" src={"https://images.pexels.com/photos/20449623/pexels-photo-20449623/free-photo-of-leopard-in-sunlight-and-shadow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} className="gallery__image" />
                            <div className="gallery__overlay">
                                <span>{t('amur')}</span>
                            </div>
                        </a>
                    </div>
                    <div className="gallery__item gallery__item--4">
                        <a href="https://en.wikipedia.org/wiki/Whale" className="gallery__link">
                            <img alt="" src={"https://images.pexels.com/photos/4666751/pexels-photo-4666751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} className="gallery__image" />
                            <div className="gallery__overlay">
                                <span>{t('whale')}</span>
                            </div>
                        </a>
                    </div>
                    <div className="gallery__item gallery__item--5">
                        <a href="https://en.wikipedia.org/wiki/Polar_bear" className="gallery__link">
                            <img alt="" src={"https://images.pexels.com/photos/2698880/pexels-photo-2698880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} className="gallery__image" />
                            <div className="gallery__overlay">
                                <span>{t('polar')}</span>
                            </div>
                        </a>
                    </div>
                    <div className="gallery__item gallery__item--6">
                        <a href="https://en.wikipedia.org/wiki/Hippopotamus" className="gallery__link">
                            <img alt="" src={"https://images.pexels.com/photos/5504243/pexels-photo-5504243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} className="gallery__image" />
                            <div className="gallery__overlay">
                                <span>{t('hippopotamus')}</span>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="gallery pt-2">
                    <div className="gallery__item gallery__item--1">
                        <a href="https://en.wikipedia.org/wiki/Snow_leopard" className="gallery__link">
                            <img alt="" src={"https://images.pexels.com/photos/751820/pexels-photo-751820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} className="gallery__image" />
                            <div className="gallery__overlay">
                                <span>{t('sleopard')}</span>
                            </div>
                        </a>
                    </div>
                    <div className="gallery__item gallery__item--2">
                        <a href="https://en.wikipedia.org/wiki/Beluga_whale" className="gallery__link">
                            <img alt="" src={"https://images.pexels.com/photos/9408378/pexels-photo-9408378.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} className="gallery__image" />
                            <div className="gallery__overlay">
                                <span>{t('beluga')}</span>
                            </div>
                        </a>
                    </div>
                    <div className="gallery__item gallery__item--3">
                        <a href="https://en.wikipedia.org/wiki/Kangaroo" className="gallery__link">
                            <img alt="" src={"https://images.pexels.com/photos/5490211/pexels-photo-5490211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} className="gallery__image" />
                            <div className="gallery__overlay">
                                <span>{t('kangaroo')}</span>
                            </div>
                        </a>
                    </div>
                    <div className="gallery__item gallery__item--4">
                        <a href="https://en.wikipedia.org/wiki/Loggerhead_sea_turtle" className="gallery__link">
                            <img alt="" src={"https://images.pexels.com/photos/25975158/pexels-photo-25975158/free-photo-of-portrait-of-a-turtle.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} className="gallery__image" />
                            <div className="gallery__overlay">
                                <span>{t('l_turtle')}</span>
                            </div>
                        </a>
                    </div>
                    <div className="gallery__item gallery__item--5">
                        <a href="https://en.wikipedia.org/wiki/Macaw" className="gallery__link">
                            <img alt="" src={"https://images.pexels.com/photos/2642167/pexels-photo-2642167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} className="gallery__image" />
                            <div className="gallery__overlay">
                                <span>{t('m_bird')}</span>
                            </div>
                        </a>
                    </div>
                    <div className="gallery__item gallery__item--6">
                        <a href="https://en.wikipedia.org/wiki/Swift_fox" className="gallery__link">
                            <img alt="" src={"https://images.pexels.com/photos/271932/pexels-photo-271932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} className="gallery__image" />
                            <div className="gallery__overlay">
                                <span>{t('s_fox')}</span>
                            </div>
                        </a>
                    </div>
                </div>
                <a href="/" className="load-more">
                    {t('loadmore')}
                    <span className="loading"><span></span></span>
                </a>
            </section>
            {/* End main */}
        </>
    );
}

export default Gallery;