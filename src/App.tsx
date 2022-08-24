import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext'
import { CreateDaoContextProvider } from './context/CreateDaoContext'
import { CreateProposalContextProvider } from './context/CreateProposalContext'
import { DaoProposalProvider } from './context/DaoProposalContext'
import { DeployDaoProvider } from './context/DeployDaoContext'
import { Main, Vote, Governance, Create, Discover, Faq, AboutUs, UserProfile, DaoProfile } from './pages';
import { Navbar, Footer } from './components';


const App: React.FC = () => {
  return (
    <ProfileProvider>
      {/* <CreateDaoContextProvider> */}
                    <DaoProposalProvider>
        <BrowserRouter>
          <div>
            <Navbar/>
            <Routes>
              <Route path="/"
                element={
                  <>
                    <Main />
                    <ToastContainer pauseOnFocusLoss newestOnTop autoClose={10000} />
                  </>
                }
              />
              <Route path="/Create"
                element={
                  <>
                    <CreateDaoContextProvider>
                      <DeployDaoProvider>
                        <Create />
                        <ToastContainer pauseOnFocusLoss newestOnTop autoClose={10000} />
                        
                    </DeployDaoProvider>
                    </CreateDaoContextProvider>
                  </>
                }
              />
              <Route path="/Governance"
                element={
                  <CreateProposalContextProvider>
                      <Governance />
                      <ToastContainer pauseOnFocusLoss newestOnTop autoClose={10000} />
                  </CreateProposalContextProvider>
                }
              />
              <Route path="/Vote"
                element={
                  <>
                    <Vote />
                    <ToastContainer pauseOnFocusLoss newestOnTop autoClose={10000} />
                  </>
                }
              />
              <Route path="/Discover"
                element={
                  <>
                    <Discover />
                    <ToastContainer pauseOnFocusLoss newestOnTop autoClose={10000} />
                  </>
                }
              />
              <Route path="/Faq"
                element={
                  <>
                    <Faq />
                    <ToastContainer pauseOnFocusLoss newestOnTop autoClose={10000} />
                  </>
                }
              />
              <Route path="/AboutUs"
                element={
                  <>
                    <AboutUs />
                    <ToastContainer pauseOnFocusLoss newestOnTop autoClose={10000} />
                  </>
                }
              />
              <Route path="/Profile"
                element={
                  <>
                    <UserProfile />
                    <ToastContainer pauseOnFocusLoss newestOnTop autoClose={10000} />
                  </>
                }
              />
              <Route path="/DaoProfile"
                element={
                  <>
                    <DaoProfile />
                    <ToastContainer pauseOnFocusLoss newestOnTop autoClose={10000} />
                  </>
                }
              />
            </Routes>
            <Footer/>
          </div>
        </BrowserRouter>
        </DaoProposalProvider>
      {/* </CreateDaoContextProvider> */}
    </ProfileProvider>
  );
};

export default App;
