import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext'
import { CreateDaoContextProvider } from './context/CreateDaoContext'
import { Main, Vote, Propose, Create, Discover, Faq, AboutUs } from './pages';
import { Navbar, Footer } from './components';


const App: React.FC = () => {
  return (
    <ProfileProvider>
      {/* <CreateDaoContextProvider> */}
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
                      <Create />
                      <ToastContainer pauseOnFocusLoss newestOnTop autoClose={10000} />
                    </CreateDaoContextProvider>
                  </>
                }
              />
              <Route path="/Propose"
                element={
                  <>
                    <Propose />
                    <ToastContainer pauseOnFocusLoss newestOnTop autoClose={10000} />
                  </>
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
            </Routes>
            <Footer/>
          </div>
        </BrowserRouter>
      {/* </CreateDaoContextProvider> */}
    </ProfileProvider>
  );
};

export default App;
