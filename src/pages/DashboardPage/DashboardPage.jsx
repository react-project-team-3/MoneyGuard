import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import Balance from '../../components/Balance/Balance';
import HomeTab from './HomeTab';
import StatisticsTab from './StatisticsTab';
import CurrencyTab from './CurrencyTab';
import styles from './DashboardPage.module.css';


const DashboardPage = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Header />

      <div className={styles.mainContent}>
        {/* SIDEBAR - Navigation and Balance */}
        <aside className={styles.sidebar}>
          <Navigation />
          <Balance />
          {/* 
            DESKTOP İÇİN CURRENCY TAB
          */}
        </aside>

        <main className={styles.content}>
          <Routes>
            <Route path="home" element={<HomeTab />} />
            <Route path="statistics" element={<StatisticsTab />} />
            <Route path="currency" element={<CurrencyTab />} />
            <Route path="/" element={<Navigate to="home" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;