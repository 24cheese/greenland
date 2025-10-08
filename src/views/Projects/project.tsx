import { useState, useEffect, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../layouts/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './project.css';

// Import hook và các file cần thiết
import { useFetchProjectDetail } from '../../hooks/useFetchProjectDetail';
import apiClient from '../../api/apiClient'; // Dùng cho form donate

// Các import khác giữ nguyên...
import vnpay from '../../assets/image/vnpay.png';

function Project() {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();

    // Sử dụng hook để lấy dữ liệu, loading và error
    const { project, loading, error } = useFetchProjectDetail(id);

    // --- LOGIC KHÁC CỦA COMPONENT ---
    const [donateMethod, setDonateMethod] = useState('online');
    const [amount, setAmount] = useState<number>(10000);

    // Phần logic VNPAY (bạn yêu cầu bỏ qua nên tôi sẽ comment lại)
    const handleDonate = async () => {
        // const user = JSON.parse(localStorage.getItem('user') || 'null');
        // if (!user || !user.id || !id) return;
        // try {
        //     const res = await apiClient.post('/api/payment/create_payment_url', { ... });
        //     if (res.data.paymentUrl) window.location.href = res.data.paymentUrl;
        // } catch (err) {
        //     console.error("Lỗi khi tạo URL thanh toán:", err);
        // }
    };
    
    // Xử lý trạng thái loading và error
    if (loading) {
        return <Layout><div>Đang tải dự án...</div></Layout>;
    }
    if (error) {
        return <Layout><div>Lỗi khi tải dự án. Vui lòng thử lại.</div></Layout>;
    }
    if (!project) {
        return <Layout><div>Không tìm thấy dự án.</div></Layout>;
    }

    return (
        <Layout>
            {/* Hero section */}
            <div id="hero">
                <Container>
                    <h1>{t('make_donation')}</h1>
                </Container>
            </div>

            {/* Main Content */}
            <div id="main">
                <Container>
                    <Row>
                        <Col xl={3} className='image'>
                            <img src={project.image_url} alt={project.title} />
                        </Col>
                        <Col xl={4} className='content'>
                            <h6>{t('donatingto')}:</h6>
                            <h4>{project.title}</h4>
                            <p>{project.description}</p>
                            <ul className='socials-list'>
                                <li><a href="#"><FontAwesomeIcon className='icon' icon={faFacebookF} /></a></li>
                                <li><a href="#"><FontAwesomeIcon className='icon' icon={faInstagram} /></a></li>
                                <li><a href="#"><FontAwesomeIcon className='icon' icon={faLinkedin} /></a></li>
                                <li><a href="#"><FontAwesomeIcon className='icon' icon={faTwitter} /></a></li>
                            </ul>
                        </Col>
                        <Col xl={5}>
                            <div className="donate-box">
                                {/* Phần form donate giữ nguyên */}
                                <div>
                                    <label>{t('donation_amount')}: </label>
                                    <br />
                                    <input
                                        className='amount'
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                    />
                                </div>
                                <Row>
                                    {/* ... Các radio button ... */}
                                </Row>
                                {donateMethod === 'online' && (
                                    <div className="online-content">
                                        <div className='title'>{t('method')}</div>
                                        <img src={vnpay} alt="VNPay" />
                                        <br />
                                        <button className='button button-left' onClick={handleDonate}>{t('donate_now')}</button>
                                    </div>
                                )}
                                {/* ... phần offline ... */}
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
            </div>
        </Layout>
    );
}

export default Project;