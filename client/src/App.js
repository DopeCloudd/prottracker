import {Route, Routes} from "react-router-dom";
import Box from "@mui/material/Box";
// Barre de navigation
import Navbar from "./components/Navbar";
// Breadcrumb
import Breadcrumb from "./components/Breadcrumb";
// Footer
import Footer from "./components/Footer";
// Pages
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routing/ProtectedRoute";

function App() {

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Navbar/>
            <Breadcrumb/>
            <Box
                sx={{
                    flex: "1 0 auto",
                    minHeight: 'calc(100vh - 100px)',
                }}
            >
                <Routes>
                    <Route path="/" exact element={<Home/>}/>
                    <Route path="/categories" element={<Categories/>}/>
                    <Route path="/category/:categoryId" element={<Category/>}/>
                    <Route path="/product/:productId" element={<Product/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/profile" element={<Profile/>}/>
                    </Route>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </Box>
            <Footer/>
        </Box>
    );
}

export default App;