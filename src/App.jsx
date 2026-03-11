import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import DashboardPage from './pages/DashboardPage';
import DirectorPage from './pages/DirectorPage';
import GeneroPage from './pages/GeneroPage';
import MediaPage from './pages/MediaPage';
import ProductoraPage from './pages/ProductoraPage';
import TipoPage from './pages/TipoPage';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/generos" element={<GeneroPage />} />
        <Route path="/directores" element={<DirectorPage />} />
        <Route path="/productoras" element={<ProductoraPage />} />
        <Route path="/tipos" element={<TipoPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
