import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ForestMap.css';

import { useFetchData } from '../../hooks/useFetchData';
import { fetchAllForests } from '../../api/forestApi';
import { Forest } from '../../types/forest';

// --- CÁC COMPONENT CON ĐƯỢC TÁCH RA ---

// Component nút quay lại
const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className="back-button">
      ← Quay lại
    </button>
  );
};

// Component hiển thị panel chi tiết
const DetailPanel = ({ forest, onClose }: { forest: Forest; onClose: () => void }) => (
  <div className="detail-panel show">
    <h3>{forest.name}</h3>
    <img src={forest.image_url} alt={forest.name} className="detail-panel-image" />
    <p><strong>{forest.description}</strong></p>
    <div dangerouslySetInnerHTML={{ __html: forest.info }} />
    <Button variant="secondary" onClick={onClose}>
      Đóng
    </Button>
  </div>
);

// Component để quản lý các hiệu ứng trên bản đồ
const MapEffects = ({ forest }: { forest: Forest | null }) => {
  const map = useMap();
  useEffect(() => {
    // Luôn resize map sau một khoảng trễ ngắn để đảm bảo layout đúng
    setTimeout(() => map.invalidateSize(), 300);
    // Nếu có một khu rừng được chọn, bay đến vị trí đó
    if (forest) {
      map.flyTo([forest.lat, forest.lng], 13, { duration: 1.5 });
    }
  }, [forest, map]); // Thêm 'map' vào dependency array
  return null;
};


// --- COMPONENT CHÍNH ---

const ForestsMap = () => {
  // Fix lỗi icon marker mặc định của Leaflet
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
  }, []);

  const [selectedForest, setSelectedForest] = useState<Forest | null>(null);
  const markerRefs = useRef<Record<number, L.Marker>>({});

  // Sử dụng hook chung để lấy dữ liệu
  const { data: forests, loading, error } = useFetchData<Forest>(fetchAllForests);

  const handleOpenModal = (forest: Forest) => {
    setSelectedForest(forest);
    markerRefs.current[forest.id]?.closePopup();
  };

  const handleCloseModal = () => {
    setSelectedForest(null);
  };

  // Xử lý trạng thái loading và error
  if (loading) {
    return <div className="map-loading-state">Đang tải bản đồ và dữ liệu...</div>;
  }

  if (error) {
    return <div className="map-error-state">Lỗi khi tải dữ liệu. Vui lòng thử lại.</div>;
  }

  return (
    <div className="forest-map-container">
      {/* Phần bản đồ */}
      <div className={`map-wrapper ${selectedForest ? 'panel-open' : ''}`}>
        <BackButton />
        <MapContainer center={[16.5, 107.5]} zoom={6} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapEffects forest={selectedForest} />

          {forests.map(forest => (
            <Marker
              key={forest.id}
              position={[forest.lat, forest.lng]}
              ref={ref => {
                if (ref) markerRefs.current[forest.id] = ref;
              }}
            >
              <Popup>
                <strong>{forest.name}</strong><br />
                <img src={forest.image_url} alt={forest.name} className="popup-image" />
                <div>{forest.description}</div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenModal(forest)}
                  style={{ marginTop: '5px' }}
                >
                  Xem chi tiết
                </Button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Panel chi tiết, chỉ hiện khi có selectedForest */}
      {selectedForest && (
        <DetailPanel forest={selectedForest} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ForestsMap;