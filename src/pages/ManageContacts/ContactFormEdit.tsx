import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { editContact } from "../../redux/contactsSlice";
import ContactFormBody from "./ContactFormBody";

const ContactForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const contact = useAppSelector((state) => state.contacts);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (contact.length !== 0 && id) {
      let myContact = contact.find((item) => item.id === +id);
      if (!myContact) return;
      setFName(myContact.firstName);
      setLName(myContact.lastName);
      setStatus(myContact.status);
    }
  }, [contact, id]);

  return (
    <div className="min-h-screen p-8 bg-[#f4f4f4]">
      <h1 className="header-1">Edit existing contact</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (id) {
            dispatch(
              editContact({
                id: +id,
                firstName: fName,
                lastName: lName,
                status: status,
              })
            );
            navigate("/contacts");
          }
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
        <div className="flex justify-end mt-4">
          <button type="submit" className="btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
