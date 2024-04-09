import styled from "styled-components";
import {Route, Routes} from "react-router-dom";
import {logout} from "./actions/auth";
import AuthVerify from "./common/AuthVerify";
import {useDispatch} from "react-redux";
// Barre de navigation
import Navbar from "./components/Navbar";
// Footer
import Footer from "./components/Footer";
// Pages
import Home from "./pages/Home";
import Filtres from "./pages/Filtres";
import Category from "./pages/Category";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

function App() {

    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(logout());
    };

    return (
        <Container>
            <Navbar/>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/filtres" element={<Filtres/>}/>
                <Route path="/category/:categoryId" element={<Category/>}/>
                <Route path="/product/:productId" element={<Product/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
            <AuthVerify logOut={logOut}/>
            <Footer/>
        </Container>
    );
}

export default App;
