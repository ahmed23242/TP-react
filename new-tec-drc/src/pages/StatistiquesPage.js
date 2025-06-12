import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { getAllPlaques } from '../services/dbService';
import './StatistiquesPage.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

function StatistiquesPage() {
  const [plaques, setPlaques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statsParProvince, setStatsParProvince] = useState([]);
  const [statsParVillage, setStatsParVillage] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('all');

  useEffect(() => {
    const fetchPlaques = async () => {
      try {
        const data = await getAllPlaques();
        setPlaques(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    };

    fetchPlaques();
  }, []);

  useEffect(() => {
    if (plaques.length > 0) {
      // Statistiques par province
      const provinceStats = plaques.reduce((acc, plaque) => {
        acc[plaque.province] = (acc[plaque.province] || 0) + 1;
        return acc;
      }, {});

      const provinceData = Object.entries(provinceStats).map(([name, value]) => ({
        name,
        value
      }));

      setStatsParProvince(provinceData);

      // Statistiques par village
      const villageStats = plaques
        .filter(plaque => selectedProvince === 'all' || plaque.province === selectedProvince)
        .reduce((acc, plaque) => {
          acc[plaque.village] = (acc[plaque.village] || 0) + 1;
          return acc;
        }, {});

      const villageData = Object.entries(villageStats)
        .map(([name, value]) => ({
          name,
          value
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10); // Top 10 villages

      setStatsParVillage(villageData);
    }
  }, [plaques, selectedProvince]);

  if (loading) {
    return <div className="loading">Chargement des statistiques...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="statistiques-container">
      <h1>Statistiques des Plaques</h1>

      <div className="stats-section">
        <h2>Distribution par Province</h2>
        <div className="chart-container">
          <PieChart width={500} height={300}>
            <Pie
              data={statsParProvince}
              cx={250}
              cy={150}
              labelLine={true}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {statsParProvince.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      <div className="stats-section">
        <h2>Distribution par Village</h2>
        <div className="filter-container">
          <label htmlFor="province-filter">Filtrer par province : </label>
          <select
            id="province-filter"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="province-select"
          >
            <option value="all">Toutes les provinces</option>
            {statsParProvince.map(({ name }) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="chart-container">
          <BarChart
            width={800}
            height={400}
            data={statsParVillage}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 100
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Nombre de plaques" fill="#8884d8" />
          </BarChart>
        </div>
      </div>

      <div className="stats-summary">
        <div className="summary-card">
          <h3>Total des plaques</h3>
          <p className="summary-value">{plaques.length}</p>
        </div>
        <div className="summary-card">
          <h3>Nombre de provinces</h3>
          <p className="summary-value">{statsParProvince.length}</p>
        </div>
        <div className="summary-card">
          <h3>Nombre de villages</h3>
          <p className="summary-value">
            {Object.keys(plaques.reduce((acc, plaque) => {
              acc[plaque.village] = true;
              return acc;
            }, {})).length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StatistiquesPage; 