import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/provider/Dashboard"
import Services from "./pages/provider/Services";
import Bookings from "./pages/provider/Booking";
import Wallet from "./pages/provider/Wallet";
import Ratings from "./pages/provider/Ratings";
import KYC from "./pages/provider/KYC";
import Profile from "./pages/provider/Profile";
import Availability from "./pages/provider/Availability";
import Support from "./pages/provider/Support";
import DonorDashboard from "./pages/donor/Dashboard";
import DonateFood from "./pages/donor/DonateFood";
import MyDonations from "./pages/donor/MyDonations";
import DonationHistory from "./pages/donor/History";
import DonorProfile from "./pages/donor/profile";
import DonorRatings from "./pages/donor/Ratings";
import DonorSupport from "./pages/donor/Support";
import DonorKYC from "./pages/donor/KYC";
// 🔹 CUSTOMER PAGES
import CustomerDashboard from "./pages/customer/Dashboard";
import CustomerServices from "./pages/customer/Services";
import BookService from "./pages/customer/BookService";
import MyBookings from "./pages/customer/MyBookings";
import FoodFeed from "./pages/customer/FoodFeed";
import MyFoodClaims from "./pages/customer/MyFoodClaims";
import CustomerProfile from "./pages/customer/Profile";
import CustomerRatings from "./pages/customer/Ratings";
import CustomerSupport from "./pages/customer/Support";
import Payments from "./pages/customer/Payments";
import Message from "./pages/customer/Message";
import Settings from "./pages/customer/Settings";
import CustomerLayout from "./layouts/CustomerLayout";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminProviders from "./pages/admin/Providers";
import AdminCustomers from "./pages/admin/Customers";
import AdminDonors from "./pages/admin/Donors";
import AdminServices from "./pages/admin/Services";
import AdminFoodDonations from "./pages/admin/FoodDonations";
import AdminBookings from "./pages/admin/Bookings";
import AdminRatings from "./pages/admin/Ratings";
import AdminKYC from "./pages/admin/KYC";
import AdminPayments from "./pages/admin/Payments";
import AdminReports from "./pages/admin/Reports";
import AdminSupport from "./pages/admin/Support";
import AdminSettings from "./pages/admin/Settings";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/provider/dashboard" element={<Dashboard />} />
<Route path="/provider/services" element={<Services />} />
<Route path="/provider/bookings" element={<Bookings />} />
<Route path="/provider/wallet" element={<Wallet />} />
<Route path="/provider/ratings" element={<Ratings />} />
<Route path="/provider/kyc" element={<KYC />} />
<Route path="/provider/profile" element={<Profile />} />
<Route path="/provider/availability" element={<Availability />} />
<Route path="/provider/support" element={<Support />} />
<Route path="/donor/dashboard" element={<DonorDashboard />} />
<Route path="/donor/donate" element={<DonateFood />} />
<Route path="/donor/my-donations" element={<MyDonations />} />
<Route path="/donor/history" element={<DonationHistory />} />
<Route path="/donor/profile" element={<DonorProfile />} />
<Route path="/donor/ratings" element={<DonorRatings />} />
<Route path="/donor/kyc" element={<DonorKYC />} />
<Route path="/donor/support" element={<DonorSupport />} />
{/* 🔹 CUSTOMER ROUTES */}
<Route path="/customer/dashboard" element={<CustomerDashboard />} />

<Route path="/customer/services" element={<CustomerServices />} />
<Route path="/customer/book-service" element={<BookService />} />

<Route path="/customer/bookings" element={<MyBookings />} />

<Route path="/customer/food" element={<FoodFeed />} />
<Route path="/customer/food-claims" element={<MyFoodClaims />} />

<Route path="/customer/profile" element={<CustomerProfile />} />

<Route path="/customer/ratings" element={<CustomerRatings />} />

<Route path="/customer/support" element={<CustomerSupport />} />

<Route path="/customer/payments" element={<Payments />} />
<Route path="/customer/message" element={<Message />} />
<Route path="/customer/settings" element={<Settings />} />
<Route path="/customer" element={<CustomerLayout />}></Route>


<Route path="/admin/dashboard" element={<AdminDashboard />} />
<Route path="/admin/providers" element={<AdminProviders />} />
<Route path="/admin/customers" element={<AdminCustomers />} />
<Route path="/admin/donors" element={<AdminDonors />} />
<Route path="/admin/services" element={<AdminServices />} />
<Route path="/admin/food" element={<AdminFoodDonations />} />
<Route path="/admin/bookings" element={<AdminBookings />} />
<Route path="/admin/ratings" element={<AdminRatings />} />
<Route path="/admin/kyc" element={<AdminKYC />} />
<Route path="/admin/payments" element={<AdminPayments />} />
<Route path="/admin/reports" element={<AdminReports />} />
<Route path="/admin/support" element={<AdminSupport />} />
<Route path="/admin/settings" element={<AdminSettings />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
