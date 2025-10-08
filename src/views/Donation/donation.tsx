import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Layout from '../../layouts/Layout';
import './donation.css';
import http from '../../assets/image/http.png';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useTranslation } from 'react-i18next';
// 1. Import hook chung, hàm API và kiểu dữ liệu
import { useFetchData } from '../../hooks/useFetchData';
import { fetchAllProjects } from '../../api/projectApi';
import { Project } from '../../types/project';


const Donation: React.FC = () => {
    const { t } = useTranslation();

    // 2. Sử dụng hook để lấy dữ liệu projects
    const { data: projects, loading, error } = useFetchData<Project>(fetchAllProjects);

    // --- LOGIC KHÁC CỦA COMPONENT GIỮ NGUYÊN ---
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
        // Bỏ qua prevArrow và nextArrow nếu không có custom icon
    };


    // Component con để render slider, giúp code chính gọn hơn
    const renderProjectSlider = () => {
        if (loading) {
            return <p>Đang tải danh sách dự án...</p>;
        }
        if (error) {
            return <p>Lỗi khi tải dự án. Vui lòng thử lại.</p>;
        }
        if (projects.length === 0) {
            return <p>Hiện chưa có dự án nào.</p>;
        }
        return (
            <Slider {...settings}>
                {projects.map((project) => (
                    <div key={project.id}>
                        <Row>
                            <Col lg={7}><img src={project.image_url} alt={project.title} /></Col>
                            <Col lg={5}>
                                <h2>{project.title} <br /> Project</h2>
                                <p>{project.description}</p>
                                <ProgressBar now={project.progress} />
                                <div className="status">
                                    <div className='donated'>{project.progress}% {t('donated')}</div>
                                    <div className='goal'>{t('goal')}: {project.goal.toLocaleString()} VND</div>
                                </div>
                                <hr />
                                <div className="button-group">
                                    <NavLink to={`/projects/${project.id}`}>
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
        );
    };

    return (
        <Layout>
            <div id="project">
                <Container>
                    {renderProjectSlider()}
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