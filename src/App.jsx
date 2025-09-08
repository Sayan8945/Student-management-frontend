import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchStudent from "./SearchStudent";
import AdminPanel from "./AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchStudent />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
