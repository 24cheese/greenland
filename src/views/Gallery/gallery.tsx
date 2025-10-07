import './gallery.css';
import React, { useState, useMemo } from 'react';
import Layout from '../../layouts/Layout';
import { useTranslation } from 'react-i18next';
import { useFetchData } from '../../hooks/useFetchData'; // Import hook chung
import { fetchAllAnimals } from '../../api/animalApi';   // Import hàm API
import { Animal } from '../../types/animal';           // Import kiểu dữ liệu

function Gallery() {
  const { t } = useTranslation();

  // Bước 1: Gọi hook chung để lấy dữ liệu, trạng thái loading và lỗi
  const { data: animals, loading, error } = useFetchData<Animal>(fetchAllAnimals);

  // Các state cho việc filter và pagination vẫn giữ lại ở component
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [selectedLevel, setSelectedLevel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Bước 2: Tối ưu hóa việc filter bằng useMemo
  // Logic filter chỉ chạy lại khi danh sách animals, selectedLevel hoặc searchTerm thay đổi
  const filteredAnimals = useMemo(() => {
    return animals.filter(animal => {
      const matchesLevel = selectedLevel ? animal.red_level === selectedLevel : true;
      const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesLevel && matchesSearch;
    });
  }, [animals, selectedLevel, searchTerm]);


  const handlePageChange = (page: number) => setCurrentPage(page);

  // Tính toán phân trang dựa trên dữ liệu đã filter
  const totalPages = Math.ceil(filteredAnimals.length / itemsPerPage);
  const currentAnimals = filteredAnimals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Bước 3: Xử lý các trạng thái giao diện (UI states)
  const renderContent = () => {
    if (loading) {
      return <p className="loading-message">Đang tải thư viện...</p>;
    }

    if (error) {
      return <p className="error-message">Không thể tải dữ liệu. Vui lòng thử lại sau.</p>;
    }

    if (currentAnimals.length === 0) {
      return <p className="no-results-message">Không tìm thấy kết quả nào.</p>;
    }

    return (
      <>
        <div className="gallery pt-2">
          {currentAnimals.map((animal) => (
            <div className="gallery__item gallery__item--1" key={animal.id}>
              <a href={animal.link} className="gallery__link" target='_blank' rel="noreferrer">
                <img src={animal.image_url} className="gallery__image" alt={animal.name} />
                <div className="gallery__overlay">
                  <span>
                    {animal.name}
                    {animal.red_list ? ` 🔴 (${animal.red_level})` : ''}
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="pagination">
          {totalPages > 1 && Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`page-button ${page === currentPage ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </>
    );
  };


  return (
    <Layout>
      <section className="animals-gallery">
        <hr className="threats-line" />
        <h2 className="gallery-header">
          {t('animals')} <span className="text-success fw-lighter">{t('Gallery')}</span>
        </h2>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên động vật..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Quay về trang đầu khi search
            }}
          />
        </div>

        <div className="filter-container">
          <label htmlFor="filter">Lọc theo mức độ:</label>
          <select
            id="filter"
            value={selectedLevel}
            onChange={(e) => {
              setSelectedLevel(e.target.value);
              setCurrentPage(1); // Quay về trang đầu khi filter
            }}
          >
            <option value="">Tất cả</option>
            <option value="EN">Nguy cấp (EN)</option>
            <option value="VU">Sắp nguy cấp (VU)</option>
            <option value="R">Hiếm (R)</option>
            <option value="T">Bị đe dọa (T)</option>
            <option value="NT">Sắp bị đe dọa (NT)</option>
          </select>
        </div>

        {renderContent()}

      </section>
    </Layout>
  );
}

export default Gallery;