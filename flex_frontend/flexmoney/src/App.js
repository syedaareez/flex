
import Main from './pages/main';
import AuthForms from "./pages/authForms";

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import ProtectedRoutes from './helpers/ProtectedRoutes';
 


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact index path="/signin" element={<AuthForms />} />
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/" element={<Main />} />
        </Route>
      </Routes>
    </Router>


    {/* <AuthForms />
    <Main /> */}
    </>
  );
}

export default App;
