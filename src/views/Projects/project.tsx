import { useState, useEffect, SetStateAction } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import './project.css';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import Layout from '../../layouts/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import { Container, Row, Col, } from 'react-bootstrap';

import Alert from 'react-bootstrap/Alert';
import vnpay from '../../assets/image/vnpay.png'
import flagEn from '../../assets/image/en.svg';
import flagVi from '../../assets/image/vi.svg';

import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

interface Props { }

function Project(props: Props) {
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

    const projectId = '66769038f82351ff111ac31f'

    const handleDonate = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/payment/create_payment_url', {
                amount,
                locale,
                projectId
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
            // setShowAlert(false); 
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

    const { slug } = useParams();
    const [project, setProject] = useState<any>(null);

    // Lấy dữ liệu project theo slug
    useEffect(() => {
    if (slug) {
        axios.get(`/api/projects/${slug}`)
        .then(res => setProject(res.data))
        .catch(err => console.error('Lỗi tải project:', err));
    }
    }, [slug]);

    return (
        <Layout>
            {/* Hero section */}
            <div id="hero">
                <Container>
                    <h1>{t('make_donation')}</h1>
                </Container>
            </div>

            {/* Donate */}
            <div id="main">
                <Container>
                    <Row>
                        <Col xl={3} className='image'>
                            <img src={project?.image_url} alt={project?.title} />
                        </Col>
                        <Col xl={4} className='content'>
                            <h6>{t('donatingto')}:</h6>
                            <h4>{project?.title}</h4>
                            <p>{project?.description}</p>
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
                                        <div className='main-content'>{t('donate_des')}</div>
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
                            <h3>{t('introduce')} THE NATURE'S KEEPERS</h3>
                            <p>{t('pr1_1')}</p>
                            <p>{t('pr1_2')}</p>
                            <p>{t('pr1_3')}</p>
                            <hr />
                        </Col>
                        <Col md={7} >
                            <h4>{t('promise')}</h4>
                            <p className='promise'>{t('promise_des')}</p>
                        </Col>
                    </Row>
                </Container>
            </div >

            {/* End section Donate */}

        </Layout>
    );
}

export default Project;
