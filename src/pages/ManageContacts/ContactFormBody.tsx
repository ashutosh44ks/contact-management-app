import { Dispatch, SetStateAction } from "react";

// Props for ContactFormBody
export interface formElementsProps {
  fName: string;
  setFName: Dispatch<SetStateAction<string>>;
  lName: string;
  setLName: Dispatch<SetStateAction<string>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
}

// Common form-body for adding and editing a contact
const ContactFormBody = ({
  fName,
  setFName,
  lName,
  setLName,
  status,
  setStatus,
}: formElementsProps) => {
  return (
    <div className="contact-form-body">
      <div className="form-group">
        <label className="hide-on-mobile">First Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter first name"
          value={fName}
          onChange={(e) => setFName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="hide-on-mobile">Last Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter last name"
          value={lName}
          onChange={(e) => setLName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Status</label>
        <div className="flex gap-4 flex-wrap">
          <span className="flex items-center gap-2">
            <input
              type="radio"
              name="status"
              id="inactive"
              value="inactive"
              onChange={(e) => setStatus(e.target.value)}
              checked={status === "inactive"}
              required
            />
            <label htmlFor="inactive">Inactive</label>
          </span>
          <span className="flex items-center gap-2">
            <input
              type="radio"
              name="status"
              value="active"
              id="active"
              onChange={(e) => setStatus(e.target.value)}
              checked={status === "active"}
              required
            />
            <label htmlFor="active">Active</label>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactFormBody;
