import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./Components/Layouts/Footer";
import Navbar from "./Components/Layouts/Navbar";
import { AppProvider } from "./Context/AppContext";
import { AuthProvider } from "./Context/AuthContext";
import AppRoutes from "./Routes/AppRoutes";
import { AdminProvider } from "./Context/AdminContext";

const App = () => {
  return (
    <AuthProvider>
      <AdminProvider>
        <AppProvider>
          <Router>
            <div className="min-h-screen">
              <Navbar />
              <div className="">
                <AppRoutes />
              </div>
              <Footer />
            </div>
          </Router>
        </AppProvider>
      </AdminProvider>
    </AuthProvider>
  );
};

export default App;
