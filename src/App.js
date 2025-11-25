import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router'
import Main from './components/pages/Main';
import Note from './components/pages/Note';
import Nav from './components/UI/Nav';
import Sort from './components/modals/Sort';
import './App.scss';

function App() {
  const [sortOpen, setSortOpen] = useState(false)

  const toggleSortModal = () => setSortOpen(!sortOpen);
  const closeSortModal = () => setSortOpen(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Nav onOpenSort={toggleSortModal} isSortActive={sortOpen} />
        <Routes>
          <Route index element={<Main onOpenSort={toggleSortModal} isSortActive={sortOpen} />} />
          <Route path="/note" element={<Note />} />
        </Routes>

        {sortOpen && <Sort onCloseSort={closeSortModal} />}
      </div>
    </BrowserRouter>
  )
}

export default App
