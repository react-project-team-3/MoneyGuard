import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';
import HomeTab from './HomeTab/HomeTab';
import StatisticsTab from './StatisticsTab/StatisticsTab';
import CurrencyTab from './CurrencyTab/CurrencyTab';

const DashboardPage = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<HomeTab />} />
        <Route path="statistics" element={<StatisticsTab />} />
        <Route path="currency" element={<CurrencyTab />} />
      </Route>
    </Routes>
  );
};

export default DashboardPage;
