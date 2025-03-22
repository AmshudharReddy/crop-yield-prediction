import React, { useState } from 'react';
import { ChevronRight, Plane as Plant, Calendar, MapPin, Scale, Droplets, FlaskRound as Flask, Bug, AlertCircle } from 'lucide-react';

const sampleData = {
  2024: {
    'Wheat': {
      year: 2024,
      cropName: 'Wheat',
      season: 'rabi',
      state: 'Punjab',
      area: '10',
      rainfall: '1200',
      fertilizer: '100',
      pesticide: '2.5',
      hasPreviousDiseases: true,
      diseases: ['Leaf Rust', 'Powdery Mildew']
    },
    'Rice': {
      year: 2024,
      cropName: 'Rice',
      season: 'kharif',
      state: 'West Bengal',
      area: '8',
      rainfall: '2000',
      fertilizer: '120',
      pesticide: '3',
      hasPreviousDiseases: false,
      diseases: []
    }
  },
  2023: {
    'Cotton': {
      year: 2023,
      cropName: 'Cotton',
      season: 'kharif',
      state: 'Gujarat',
      area: '15',
      rainfall: '800',
      fertilizer: '150',
      pesticide: '4',
      hasPreviousDiseases: true,
      diseases: ['Bacterial Blight']
    }
  }
};

function History() {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<any>(null);

  const years = Object.keys(sampleData).sort((a, b) => Number(b) - Number(a));

  const handleYearClick = (year: string) => {
    setSelectedYear(year);
    setSelectedCrop(null);
  };

  const handleCropClick = (crop: any) => {
    setSelectedCrop(crop);
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container">
        <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 0' }}>
          <h1 className="page-title">
            <Plant className="h-8 w-8" />
            Crop History Records
          </h1>

          <div className="card">
            {!selectedYear ? (
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-gray-800)', marginBottom: '1rem' }}>
                  Select Year
                </h2>
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => handleYearClick(year)}
                    className="history-item"
                  >
                    <span style={{ fontSize: '1.125rem', fontWeight: '500' }}>{year}</span>
                    <ChevronRight className="h-5 w-5" style={{ color: 'var(--color-gray-400)' }} />
                  </button>
                ))}
              </div>
            ) : !selectedCrop ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-gray-800)' }}>
                    Crops in {selectedYear}
                  </h2>
                  <button
                    onClick={() => setSelectedYear(null)}
                    className="button-link"
                  >
                    Back to Years
                  </button>
                </div>
                {Object.entries(sampleData[selectedYear]).map(([cropName, data]) => (
                  <button
                    key={cropName}
                    onClick={() => handleCropClick(data)}
                    className="history-item"
                  >
                    <span style={{ fontSize: '1.125rem', fontWeight: '500' }}>{cropName}</span>
                    <ChevronRight className="h-5 w-5" style={{ color: 'var(--color-gray-400)' }} />
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-gray-800)' }}>
                    {selectedCrop.cropName} Details
                  </h2>
                  <button
                    onClick={() => setSelectedCrop(null)}
                    className="button-link"
                  >
                    Back to Crops
                  </button>
                </div>
                <div className="detail-grid">
                  <div className="detail-item">
                    <Calendar className="h-5 w-5" style={{ color: 'var(--color-gray-500)' }} />
                    <div>
                      <p className="detail-label">Year</p>
                      <p className="detail-value">{selectedCrop.year}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <Calendar className="h-5 w-5" style={{ color: 'var(--color-gray-500)' }} />
                    <div>
                      <p className="detail-label">Season</p>
                      <p className="detail-value" style={{ textTransform: 'capitalize' }}>{selectedCrop.season}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <MapPin className="h-5 w-5" style={{ color: 'var(--color-gray-500)' }} />
                    <div>
                      <p className="detail-label">State</p>
                      <p className="detail-value">{selectedCrop.state}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <Scale className="h-5 w-5" style={{ color: 'var(--color-gray-500)' }} />
                    <div>
                      <p className="detail-label">Area</p>
                      <p className="detail-value">{selectedCrop.area} hectares</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <Droplets className="h-5 w-5" style={{ color: 'var(--color-gray-500)' }} />
                    <div>
                      <p className="detail-label">Annual Rainfall</p>
                      <p className="detail-value">{selectedCrop.rainfall} mm</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <Flask className="h-5 w-5" style={{ color: 'var(--color-gray-500)' }} />
                    <div>
                      <p className="detail-label">Fertilizer</p>
                      <p className="detail-value">{selectedCrop.fertilizer} kg/ha</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <Bug className="h-5 w-5" style={{ color: 'var(--color-gray-500)' }} />
                    <div>
                      <p className="detail-label">Pesticide</p>
                      <p className="detail-value">{selectedCrop.pesticide} L/ha</p>
                    </div>
                  </div>
                  {selectedCrop.hasPreviousDiseases && (
                    <div style={{ gridColumn: 'span 2' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <AlertCircle className="h-5 w-5" style={{ color: 'var(--color-red-500)' }} />
                        <p style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--color-red-500)' }}>
                          Previous Diseases
                        </p>
                      </div>
                      <ul className="disease-list">
                        {selectedCrop.diseases.map((disease: string) => (
                          <li key={disease} className="disease-item">{disease}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;