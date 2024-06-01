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
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

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
          <Route path="/" exact element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/subscription/:productId" element={<Subscription />} />
            <Route path="/success" element={<Success />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
