import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ManageContacts from "./pages/ManageContacts";
import ContactForm from "./pages/ManageContacts/ContactForm";
import ContactFormEdit from "./pages/ManageContacts/ContactFormEdit";
import ChartsMaps from "./pages/ChartsMaps";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  // Define the routes of the app and common components
  return (
    <BrowserRouter>
      <Sidebar />
      <div className="main-body">
        <Routes>
          <Route path="/contact-management-app/" element={<Navigate replace to="/contact-management-app/contacts" />} />
          <Route path="/contact-management-app/contacts" element={<ManageContacts />} />
          <Route path="/contact-management-app/contacts/add_contact" element={<ContactForm />} />
          <Route path="/contact-management-app/contacts/edit_contact/:id" element={<ContactFormEdit />} />
          <Route path="/contact-management-app/charts_and_maps" element={<ChartsMaps />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
