import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { addContact } from "../../redux/contactsSlice";
import ContactFormBody from "./ContactFormBody";

const ContactForm = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useAppDispatch();

  return (
    <div className="min-h-screen p-8 bg-[#f4f4f4]">
      <h1 className="header-1">Create a new contact</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(fName, lName, status);
          dispatch(
            addContact({
              firstName: fName,
              lastName: lName,
              status: status,
            })
          );
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
