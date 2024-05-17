import {Route, Routes} from "react-router-dom";
import {logout} from "./actions/auth";
import AuthVerify from "./common/AuthVerify";
import {useDispatch} from "react-redux";
import Box from "@mui/material/Box";
// Barre de navigation
import Navbar from "./components/Navbar";
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

function App() {

    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(logout());
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Navbar/>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/categories" element={<Categories/>}/>
                <Route path="/category/:categoryId" element={<Category/>}/>
                <Route path="/product/:productId" element={<Product/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
            <AuthVerify logOut={logOut}/>
            <Footer/>
        </Box>
    );
}

export default App;
