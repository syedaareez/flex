
import Main from './pages/main';
import AuthForms from "./pages/authForms";

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import ProtectedRoutes from './helpers/ProtectedRoutes';
import BLogs from './pages/blogs';
 
import { RecoilRoot } from 'recoil';
import CharacterCounter from './components/CharacterCounter';

import Landing from "./pages/landing";


function App() {
  return (
    <>
    <RecoilRoot> {/* Recoil Parent wrap */}
      <Router>
        <Routes>
        <Route exact index path="/" element={<Landing />} />
          <Route exact index path="/signin" element={<AuthForms />} />
          <Route exact path="/test" element={<CharacterCounter />} />
          <Route element={<ProtectedRoutes />}>
            <Route exact path="/dashboard" element={<Main />} />
            <Route exact path="/blogs" element={<BLogs />} />
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>


    {/* <AuthForms />
    <Main /> */}
    </>
  );
}

export default App;
