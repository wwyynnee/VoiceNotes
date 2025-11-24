import Search from './components/notes/Search.jsx';
import Notes from './components/notes/Notes.jsx';
import Nav from './components/UI/Nav.jsx';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Nav />
      <Search type="mobile" />
      <Notes />
    </div>
  )
}

export default App
