import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faAngleLeft, faAngleRight, faHeart, faCircleCheck, faLock } from '@fortawesome/free-solid-svg-icons'
import Layout from '../../layouts/Layout';
import './donation.css';

import project_1 from '../../assets/image/project_1.jpg';
import project_2 from '../../assets/image/project_2.jpg';
import project_3 from '../../assets/image/project_3.jpg';
import http from '../../assets/image/http.png';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useTranslation } from 'react-i18next';

const Donation: React.FC = () => {
    const { t } = useTranslation();

    const [isScrolledPast, setIsScrolledPast] = useState(false);
    useEffect(() => {
        const handleScroll = () => setIsScrolledPast(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const settings = {
        infinite: false,
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <FontAwesomeIcon icon={faAngleLeft} />,
        nextArrow: <FontAwesomeIcon icon={faAngleRight} />,
    };

    return (
        <Layout>
            <div id="project">
                <Container>
                    <Slider {...settings}>
                        {[{
                            img: project_1,
                            title: "Nature's Keepers",
                            desc: t('pr1_des'),
                            progress: 70,
                            goal: '100,000,000 VND',
                            link: '/payment/project1'
                        }, {
                            img: project_2,
                            title: "Forest's Friend",
                            desc: t('pr2_des'),
                            progress: 100,
                            goal: '500,000,000 VND',
                            link: '/payment/project2'
                        }, {
                            img: project_3,
                            title: "EcoProtect Alliance",
                            desc: t('pr3_des'),
                            progress: 40,
                            goal: '700,000,000 VND',
                            link: '/payment/project3'
                        }].map((project, index) => (
                            <div key={index}>
                                <Row>
                                    <Col lg={7}><img src={project.img} alt="" /></Col>
                                    <Col lg={5}>
                                        <h2>{project.title} <br /> Project</h2>
                                        <p>{project.desc}</p>
                                        <ProgressBar now={project.progress} />
                                        <div className="status">
                                            <div className='donated'>{project.progress}% {t('donated')}</div>
                                            <div className='goal'>{t('goal')}: {project.goal}</div>
                                        </div>
                                        <hr />
                                        <ul className='socials-list'>
                                            {[faFacebookF, faInstagram, faLinkedin, faTwitter].map((icon, i) => (
                                                <li key={i}><a href="#" target='_blank'><FontAwesomeIcon className='icon' icon={icon} /></a></li>
                                            ))}
                                        </ul>
                                        <div className="button-group">
                                            <NavLink to={project.link}>
                                                <button className='button button-left'>{t('donate_now')}</button>
                                            </NavLink>
                                            <div className='follow'>
                                                <a href="#" target='_blank'>
                                                    <button><FontAwesomeIcon icon={faHeart} /><span>{t('follow')}</span></button>
                                                </a>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </Slider>
                </Container>
            </div>

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
                                {[t('key_1'), t('key_2'), t('key_3')].map((item, i) => (
                                    <li key={i}><FontAwesomeIcon className='icon' icon={faCircleCheck} /><span>{item}</span></li>
                                ))}
                            </ul>
                        </Col>
                        <Col lg={5}>
                            <div className="box">
                                <div className="content">
                                    <p>{t('donate_phone')}?</p>
                                    <span>{t('noproblem')}</span>
                                    <p>0236-3667-111</p>
                                    <span>{t('oremail')}:</span>
                                    <p>greenland@gmail.com</p>
                                </div>
                            </div>
                            <div className="secure">
                                <img src={http} alt="secure" />
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
                                <NavLink to='/about-us'><button>{t('how_explore')}</button></NavLink>
                            </Col>
                            <Col lg={6}>
                                <iframe
                                    width="100%"
                                    height="400"
                                    src="https://www.youtube.com/embed/E4JKRaxr8zE"
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>

            <div id="faq">
                <Container>
                    <h3>FAQ</h3>
                    <Row>
                        {[1, 2, 3, 4].map(i => (
                            <Col lg={6} key={i}>
                                <p className='quest'>{t(`quest_${i}`)}</p>
                                <p className='ans'>- {t(`ans_${i}`)}</p>
                                <hr />
                            </Col>
                        ))}
                        {[5, 6, 7, 8].map(i => (
                            <Col lg={6} key={i + 4}>
                                <p className='quest'>{t(`quest_${i}`)}</p>
                                <p className='ans'>- {t(`ans_${i}`)}</p>
                                <hr />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </Layout>
    );
};

export default Donation;
