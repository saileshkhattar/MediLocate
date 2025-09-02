import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHome from "./Screens/User/UserHome";
import UserAuth from "./Screens/User/UserLogin";
import PharmacyAuth from "./Screens/Pharamcy/PharmacyLogin";
import Add from "./Screens/Admin/Add";
import Pharmacyhome from "./Screens/Pharamcy/PharamcyHome";
import AddProductForm from "./Components/AddMedicine";
import ProfileCard from "./Components/CompleteProfileCard";
import { AuthProvider } from "./Context/AuthContext";
import AllProducts from "./Screens/Pharamcy/allProducts"
import ProductSearch from "./Screens/User/ProductSearch"
import PharmactSearch from "./Screens/User/PharamcySearch"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="user-auth" element={<UserAuth />} />
          <Route path="pharmacy-auth" element={<PharmacyAuth />} />
          <Route path="user-home" element={<UserHome />} />
          <Route path="admin" element={<Add />} />
          <Route path="pharmacy-home" element={<Pharmacyhome />} />
          <Route path="all-products" element={<AllProducts />} />
          <Route path="search/product/:id" element={<ProductSearch />} />
          <Route path = "search/pharmacy/:id" element={<PharmactSearch />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
