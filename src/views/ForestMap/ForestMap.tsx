import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ForestMap.css'


const ForestsMap = () => {
  // Fix icon marker mặc định
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

  interface Forest {
    id: number;
    name: string;
    lat: number;
    lng: number;
    description: string;
    image_url: string;
  }

  const [forests, setForests] = useState<Forest[]>([]);
  const [selectedForest, setSelectedForest] = useState<Forest | null>(null);

  const markerRefs = useRef<Record<number, L.Marker>>({});

  useEffect(() => {
    axios.get('/api/forests-map')
      .then(res => setForests(res.data))
      .catch(err => console.error('Lỗi khi load forests:', err));
  }, []);

  const handleOpenModal = (forest: Forest) => {
    setSelectedForest(forest);
    const marker = markerRefs.current[forest.id];
    if (marker) marker.closePopup();
  };

  const handleCloseModal = () => {
    setSelectedForest(null);
  };

  const MapEffects = ({ forest }: { forest: Forest | null }) => {
    const map = useMap();

    useEffect(() => {
      setTimeout(() => map.invalidateSize(), 300); // Resize bất kể mở hay đóng panel
      if (forest) map.flyTo([forest.lat, forest.lng], 13, { duration: 1.5 });
    }, [forest]);

    return null;
  };

  const navigate = useNavigate();


  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex' }}>
      {/* Bản đồ chiếm 100% hoặc 45% khi mở panel */}
      <div style={{ width: selectedForest ? '45%' : '100%', height: '100%' }}>
          {/* Nút quay lại */}
  <button
    onClick={() => navigate('/')}
    style={{
      position: 'absolute',
      top: 20,
      right: 20,
      zIndex: 1000,
      padding: '8px 12px',
      backgroundColor: '#ffffff',
      border: '1px solid #ccc',
      borderRadius: '4px',
      cursor: 'pointer',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
    }}
  >
    ← Quay lại
  </button>
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
                if (ref && ref instanceof L.Marker) {
                  markerRefs.current[forest.id] = ref;
                }
              }}
            >
              <Popup>
                <strong>{forest.name}</strong><br />
                <img
                  src={forest.image_url}
                  alt={forest.name}
                  style={{
                    width: '100%',
                    maxHeight: '120px',
                    objectFit: 'cover',
                    margin: '5px 0'
                  }}
                />
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

      {/* Panel chi tiết */}
      {selectedForest && (
        <div className={`detail-panel show`}>
          <h3>{selectedForest.name}</h3>
          <img
            src={selectedForest.image_url}
            alt={selectedForest.name}
            style={{
              width: '100%',
              maxHeight: '300px',
              objectFit: 'cover',
              marginBottom: '15px'
            }}
          />
          <p>{selectedForest.description}</p>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </div>
      )}
    </div>
  );
};

export default ForestsMap;
