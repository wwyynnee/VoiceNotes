import { BrowserRouter, Routes, Route } from 'react-router'
import Main from './components/pages/Main';
import Note from './components/pages/Note';
import Nav from './components/UI/Nav';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>
          <Route index element={<Main />} />
          <Route path="/note" element={<Note />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
