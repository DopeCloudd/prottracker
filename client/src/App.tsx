import Box from "@mui/material/Box";
import { Route, Routes } from "react-router-dom";
// Barre de navigation
import Navbar from "./components/Navbar";
// Breadcrumb
// Footer
import Footer from "./components/Footer";
// Pages
import ProtectedRoute from "./components/routing/ProtectedRoute";
import Subscription from "./components/stripe/Subscription";
import Success from "./components/stripe/Success";
import Alertes from "./pages/Alertes";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Conditions from "./pages/Conditions";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Verification from "./pages/Verification";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      {/* <Breadcrumb /> */}
      <Box
        sx={{
          flex: "1 0 auto",
          minHeight: "calc(100vh - 100px)",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verification/:token" element={<Verification />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/alertes" element={<Alertes />} />
            <Route path="/subscription/:productId" element={<Subscription />} />
            <Route path="/success" element={<Success />} />
          </Route>
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
