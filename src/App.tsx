import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Article from './pages/Article';
import Create from './pages/Create';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article/:id" element={<Article />} />
      <Route path="/create" element={<Create />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
