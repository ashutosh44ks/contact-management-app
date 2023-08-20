import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { addContact } from "../../redux/contactsSlice";
import ContactFormBody from "./ContactFormBody";

// Form for adding a new contact
const ContactForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [status, setStatus] = useState("");

  return (
    <div className="min-h-screen p-8 bg-[#f4f4f4]">
      <h1 className="header-1">Create a new contact</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            addContact({
              firstName: fName,
              lastName: lName,
              status: status,
            })
          );
          navigate("/contact-management-app/contacts");
        }}
      >
        <ContactFormBody
          fName={fName}
          setFName={setFName}
          lName={lName}
          setLName={setLName}
          status={status}
          setStatus={setStatus}
        />
        <div className="flex justify-end gap-8 mt-4">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setFName("");
              setLName("");
              setStatus("");
            }}
          >
            Reset
          </button>
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
