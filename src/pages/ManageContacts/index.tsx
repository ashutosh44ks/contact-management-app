import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { removeContact } from "../../redux/contactsSlice";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import { CiSquareAlert } from "react-icons/ci";
import "./styles.css"

const ManageContacts = () => {
  const navigate = useNavigate();
  const contacts = useAppSelector((state) => state.contacts);
  // or const contacts = useAppSelector(selectContacts);

  const dispatch = useAppDispatch();
  return (
    <div className="min-h-screen p-8 bg-[#f4f4f4]">
      <div className="flex justify-between items-center gap-4">
        <h2 className="text-lg font-medium">
          Saved Contacts : {contacts.length}
        </h2>
        <button
          className="btn-primary"
          onClick={() => navigate("./add_contact")}
        >
          Create
        </button>
      </div>
      {contacts.length > 0 ? (
        <div className="contacts-grid mt-2">
          {contacts.map((contact) => (
            <div className="card">
              <div className="flex gap-2 justify-between items-center">
                <span className="font-medium">{`${contact.firstName} ${contact.lastName}`}</span>
                <div className="flex gap-2">
                  <RiEditLine
                    className="cursor-pointer"
                    onClick={() => navigate(`./edit_contact/${contact.id}`)}
                  />
                  <RiDeleteBinLine
                    className="cursor-pointer"
                    onClick={() =>
                      dispatch(
                        removeContact({
                          id: contact.id,
                        })
                      )
                    }
                  />
                </div>
              </div>
              <p>{contact.status === "active" ? "Active" : "Inactive"}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-5 items-center bg-white border rounded p-4 mt-4">
          <CiSquareAlert 
            className="text-4xl text-[#ee564f]"
          />
          <div>
            <p>No contact found</p>
            <p>Please add a contact using the button above</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageContacts;
