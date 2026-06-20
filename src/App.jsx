import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Components/Layouts/Footer";
import Navbar from "./Components/Layouts/Navbar";
import { AppProvider } from "./Context/AppContext";
import { AuthProvider } from "./Context/AuthContext";
import AppRoutes from "./Routes/AppRoutes";
import { AdminProvider } from "./Context/AdminContext";
import ScrollToTop from "./Components/ScrollToTop"; // 🚀 Import it here

const App = () => {
  return (
    <AuthProvider>
      <AdminProvider>
        <AppProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen">
              <Navbar />
              <div className="">
                <AppRoutes />
              </div>
              <Footer />
            </div>
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </Router>
        </AppProvider>
      </AdminProvider>
    </AuthProvider>
  );
};

export default App;
