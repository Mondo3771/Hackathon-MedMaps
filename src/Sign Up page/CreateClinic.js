import React, { useState } from 'react';
import './CreateClinic.css';

const CreateClinic = () => {
  const [formState, setFormState] = useState({
    Name: '',
    Address: '',
    tel: '',
    OpeningTime: '',
    ClosingTime: '',
    Website: '',
    Specialties:'',
    Email: '',
    Open24Hours: false,
    isClinic: false,
    public: false,
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formState["key"] = "Key124";
    console.log(formState);
  };

 return (
    <form onSubmit={handleSubmit} className="form">
      {Object.keys(formState).map((field, index) => (
        <div key={index} className="form-field">
         <input
        type={field === 'isClinic' || field === 'public' || field === 'Open24Hours' ? 'checkbox' : 'text'}
        name={field}
        value={formState[field]}
        onChange={handleChange}
        placeholder={field}
        className="input"
        required
/>
          {(field === 'isClinic' || field === 'public' || field === 'Open24Hours') && <label className="label">{field}</label>}
        </div>
      ))}
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default CreateClinic;