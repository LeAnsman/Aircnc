import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register";
import SinglePlace from "./pages/SinglePlace";
import { UserContextProvider } from "./context/UserContext";
import Places from "./pages/Profile/Places/Places";
import PlaceForm from "./pages/Profile/Places/PlaceForm";
import SingleBooking from "./pages/Profile/Bookings/SingleBooking";
import Bookings from "./pages/Profile/Bookings/Bookings";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/place/:id" element={<SinglePlace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/places" element={<Places />} />
          <Route path="/profile/places/new" element={<PlaceForm />} />
          <Route path="/profile/places/:id" element={<PlaceForm />} />
          <Route path="/profile/bookings" element={<Bookings />} />
          <Route path="/profile/bookings/:id" element={<SingleBooking />} />
        </Route>
      </Routes>
      <ToastContainer
        className={"w-[400px]"}
        position="top-center"
        pauseOnHover={false}
        newestOnTop
        draggable
        autoClose={3000}
        toastClassName={
          "rounded-xl shadow-lg shadow-gray-400 transition duration-300"
        }
        bodyClassName={"text-center text-lg mx-10"}
      />
    </UserContextProvider>
  );
}

export default App;
