import { useParams, Link } from 'react-router-dom';
import { Container, Breadcrumb } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faClock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import Layout from '../../layouts/Layout';
import './NewsDetail.css';

import moment from 'moment';
import 'moment/locale/vi';
import { useFetchNewsDetail } from '../../hooks/useFetchNewsDetail'; 

function NewsDetail() {
  const { id } = useParams<{ id: string }>();

  // Sử dụng hook để lấy dữ liệu, loading và error
  const { news, loading, error } = useFetchNewsDetail(id);

  // Xử lý trạng thái loading
  if (loading) {
    return <Layout><div>Đang tải bài viết...</div></Layout>;
  }

  // Xử lý trạng thái lỗi
  if (error) {
    return <Layout><div>Lỗi khi tải bài viết. Vui lòng thử lại.</div></Layout>;
  }

  // Xử lý khi không tìm thấy bài viết
  if (!news) {
    return <Layout><div>Không tìm thấy bài viết.</div></Layout>;
  }

  return (
    <Layout>
      <div id="content">
        <div className="head">
          <div className="header">{news.title}</div>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/"><FontAwesomeIcon icon={faHouse} /></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{news.title}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Container>
          <div className="top">
            <FontAwesomeIcon icon={faUser} /> {news.author} -
            <FontAwesomeIcon icon={faClock} /> {moment(news.date).locale('vi').format('D MMMM, YYYY')}
          </div>
          <div className="inner_main_content">
            {news.thumbnail && <img src={news.thumbnail} alt={news.title} className="news-detail-thumbnail" />}
            <div className="description" dangerouslySetInnerHTML={{ __html: news.content }}></div>
            <p className='share'>Chia sẻ bài viết</p>
            <ul className='socials-list'>
              <li><a href="#"><FontAwesomeIcon className='icon' icon={faFacebookF} /></a></li>
              <li><a href="#"><FontAwesomeIcon className='icon' icon={faInstagram} /></a></li>
              <li><a href="#"><FontAwesomeIcon className='icon' icon={faLinkedin} /></a></li>
              <li><a href="#"><FontAwesomeIcon className='icon' icon={faTwitter} /></a></li>
              <li><a href="#"><FontAwesomeIcon className='icon' icon={faEnvelope} /></a></li>
            </ul>
          </div>
        </Container>
      </div>
    </Layout>
  );
}

export default NewsDetail;