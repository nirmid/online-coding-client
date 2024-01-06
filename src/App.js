
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CodeTitles from './components/codeTitles';
import CodeEdit from './components/codeEdit';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CodeTitles />} />
          <Route path="/:title" element={<CodeEdit />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
