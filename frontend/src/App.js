import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Homepage } from './components/Homepage.js';
import { CreateForm } from './components/CreateForm.js';
import { EditForm } from './components/EditForm.js';
import 'bootstrap/dist/css/bootstrap.css';


export default function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<CreateForm />} />
          <Route path="/edit/:id" element={<EditForm />} />
        </Routes>
      </Router>
    </div>
  )
}