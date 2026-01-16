import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Article from './pages/Article';
import Admin from './pages/Admin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article/:id" element={<Article />} />
      <Route path="/:category/:slug" element={<Article />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
