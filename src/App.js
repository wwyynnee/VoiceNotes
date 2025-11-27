import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import NotesContext from './context/NotesContext'

import Nav from './components/UI/Nav'

// Страницы
import Main from './components/pages/Main'
import Note from './components/pages/Note'

// Модальные окна
import Sort from './components/modals/Sort'
import Settings from './components/modals/Settings'
import Download from './components/modals/Download'
import Delete from './components/modals/Detete'
import Password from './components/modals/Password'

import './App.scss'

function App() {
  const [sortOpen, setSortOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [downloadOpen, setDownloadOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [passwordOpen, setPasswordOpen] = useState(false)

  const toggleSortModal = () => setSortOpen(!sortOpen)
  const closeSortModal = () => setSortOpen(false)

  const toggleSettingsModal = () => setSettingsOpen(!settingsOpen)
  const closeSettingsModal = () => setSettingsOpen(false)

  const toggleDownloadModal = () => setDownloadOpen(!downloadOpen)
  const closeDownloadModal = () => setDownloadOpen(false)

  const toggleDeleteModal = () => setDeleteOpen(!deleteOpen)
  const closeDeleteModal = () => setDeleteOpen(false)

  const togglePasswordModal = () => setPasswordOpen(!passwordOpen)
  const closePasswordModal = () => setPasswordOpen(false)

  const contextValue = {
    onOpenSort: toggleSortModal,
    onCloseSort: closeSortModal,
    onOpenSettings: toggleSettingsModal,
    onCloseSettings: closeSettingsModal,
    onOpenDownload: toggleDownloadModal,
    onCloseDownload: closeDownloadModal,
    onOpenDelete: toggleDeleteModal,
    onCloseDelete: closeDeleteModal,
    onOpenPassword: togglePasswordModal,
    onClosePassword: closePasswordModal,
    isSortActive: sortOpen,
    isSettingsActive: settingsOpen,
    isDownloadActive: downloadOpen,
    isDeleteActive: deleteOpen
  }

  return (
    <NotesContext.Provider value={contextValue}>
      <BrowserRouter>
          <div className="App">
            <Nav />
            
            <Routes>
              <Route index element={<Main />} />
              <Route path="/note" element={<Note />} />
            </Routes>

            {sortOpen && <Sort />}
            {settingsOpen && <Settings />}
            {downloadOpen && <Download />}
            {deleteOpen && <Delete />}
            {passwordOpen && <Password />}
          </div>
      </BrowserRouter>
    </NotesContext.Provider>
  )
}

export default App
