import { Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "./components/layout/Layout";
import { ContactPage } from "./pages/ContactPage";
import { HomeVisitsPage } from "./pages/HomeVisitsPage";
import { HomePage } from "./pages/HomePage";
import { HospitalPage } from "./pages/HospitalPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PatientInformationPage } from "./pages/PatientInformationPage";
import { ServicesPage } from "./pages/ServicesPage";
import { AboutPage } from "./pages/AboutPage";
import { DoctorsPage } from "./pages/DoctorsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/departments" element={<Navigate to="/services/" replace />} />
        <Route path="/hospital" element={<HospitalPage />} />
        <Route path="/facilities" element={<Navigate to="/hospital/" replace />} />
        <Route path="/home-visits" element={<HomeVisitsPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/patient-information" element={<PatientInformationPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
