import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/NotesState';
import Alert from './components/Alert';
import Login from './components/Login'; // Import Login component
import Signup from './components/Signup'; // Import Signup component
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <NoteState>
      <Router>
        <Navbar />
        {alert && <Alert message={alert.message} type={alert.type} />}
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} /> {/* Pass showAlert to Login */}
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} /> {/* Pass showAlert to Signup */}
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
