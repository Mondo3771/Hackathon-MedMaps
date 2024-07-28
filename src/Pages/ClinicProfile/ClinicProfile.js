//components
import Header from "../../Components/Header/Header";
//styled components
import "./ClinicProfile.css";
import { fetchLocalStorage } from "../../helpers/helpers";

import { useState } from "react";
import { clinics } from "../../MockData/Arrays";

const ClinicProfile = () => {

  let temp = fetchLocalStorage({ key: "Clinic" }) ?? clinics[2];

  const clinicFetch = temp

  const [clinic, setClinic] = useState(clinicFetch);
  const [specialties, setSpecialties] = useState(
    clinicFetch.Specialties
  );
  const [editSp, setEditSp] = useState(false);
  const [editCt, setEditCt] = useState(false);

  const [anyChange, setAnyChange] = useState(false);

  const [emergency, setEmergency] = useState(clinicFetch.emergency);


  const UpdateAHospital = (data) => {
    fetch('/api/Hospitals',{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch((error)=> console.error('Error:',error));
    }



 const UpdateClinic = (data) => {
  fetch(`/api/DailyUpdates`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch((error)=> {
      console.error("Error:",error);
  })
  }

  return (
    <section className="clinicProfilePage">
      <Header />
      <div className="titleSection">
        <svg
          fill="#808080"
          className="clinicIcon"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
        >
          <path d="M11,12v1H10a1,1,0,0,0,0,2h1v1a1,1,0,0,0,2,0V15h1a1,1,0,0,0,0-2H13V12a1,1,0,0,0-2,0Zm10.66406-1.74756-9-8a.99893.99893,0,0,0-1.32812,0l-9,8a.99991.99991,0,0,0,1.32812,1.49512L4,11.449V21a.99974.99974,0,0,0,1,1H19a.99974.99974,0,0,0,1-1V11.449l.33594.29859a.99991.99991,0,0,0,1.32812-1.49512ZM18,20H6V9.6712l6-5.33331L18,9.6712Z" />
        </svg>
        <div>
          <h1 className="clinicName">{clinic.name}</h1>
          {clinic.public && clinic.isClinic && (
            <label className="typeInfo">Government clinic</label>
          )}
          {!clinic.public && clinic.isClinic && (
            <label className="typeInfo">Private clinic</label>
          )}
          {!clinic.public && !clinic.isClinic && (
            <label className="typeInfo">Private hospital</label>
          )}
          {clinic.public && !clinic.isClinic && (
            <label className="typeInfo">Government clinic</label>
          )}
        </div>
      </div>

      <div className="padder">
        <p>
          <strong>Address: </strong>
          {clinic.address}
        </p>

        <h2>Work Hours</h2>
        {!clinic.open24Hours && (
          <>
            <p>
              <strong>{`Opening Time: `}</strong>
              {clinic.openingTime}
            </p>
            <p>
              <strong>{`Closing Time: `}</strong>
              {clinic.closingTime}
            </p>
            <p>
              <strong>{`Days: `}</strong>
              {`Mon - Fri`}
            </p>
          </>
        )}

        {clinic.open24Hours && <strong>Open 24/7</strong>}

        <section className="specialtiesContainer">
          <h2>Specialties</h2>
          {editSp ? (
            <section className="editSpecialties">
              <textarea
                className="specialtiesTextarea"
                onChange={(event) => setSpecialties(event.target.value)}
              >
                {specialties}
              </textarea>
              <button
                className="doneButton"
                onClick={() => {
                  setClinic(() => {
                    let temp = clinic;
                    temp.Specialties = specialties
                    console.log(temp);
                    return temp;
                  });
                  setEditSp(false);
                }}
              >
                Done
              </button>
            </section>
          ) : (
            <ul className="list">
              {clinic.Specialties.split(",").map((s, index) => (
                <li key={index}>{s}</li>
              ))}
              <button
                onClick={() => {
                  setEditSp(true);
                  setAnyChange(true);
                }}
              >
                Edit
              </button>
            </ul>
          )}
        </section>

        <section className="notifications">
          <h2>Real-Time notifications</h2>
          <h4>Are there emergency rooms available</h4>
          <div>
            <button
              className={emergency ? "emergencyBtn down" : "emergencyBtn "}
              disable={emergency}
              onClick={() => {
                setEmergency(true);
                setAnyChange(true);
              }}
            >
              Yes
            </button>
            <button
              className={!emergency ? "emergencyBtn down" : "emergencyBtn "}
              disable={!emergency}
              onClick={() => {

                setEmergency(false);
                setAnyChange(true);
              }}
            >
              No
            </button>
          </div>

          <h4>What is the current capacity level?</h4>
          <input
            placeholder="0 %"
            className="capacitiesInput"
            list="capacities"
            name="capacity"
            onChange={(e) => {
              setAnyChange(true)
              setClinic(() => {
                let temp = clinic;
                temp.capacity = e.target.value;
                return temp;
              });
            }}
          />
          <datalist id="capacities">
            <option> 0 % </option>
            <option> 25 % </option>
            <option> 50 % </option>
            <option> 75 % </option>
            <option> 100 % </option>
          </datalist>
        </section>

        <section className="contactContainer">
          <h2>Contact Details</h2>

          <ul>
            <strong>{`Tel: `}</strong>
            {!editCt ? (
              clinic.tel.split(",").map((number, index) => (
                <li key={index} className="tels">
                  {number}
                </li>
              ))
            ) : (
              <textarea
                className="telTextarea"
                onChange={(e) => {
                  let temp = clinic;
                  temp.tel = e.target.value;
                  return temp;
                }}
              >
                {clinic.tel}
              </textarea>
            )}
          </ul>
          <p>
            <strong>Website: </strong>
            <input
              value={clinic.webiste}
              placeholder={clinic.webiste}
              editable={editCt}
              type="text"
              className={!editCt ? "input inputInEdit" : "input"}
              onChange={(e) =>
                setClinic(() => {
                  let temp = clinic;
                  temp.website = e.target.value;
                  return temp;
                })
              }
            ></input>
          </p>
          <p>
            <strong>Email: </strong>
            <input
              value={clinic.email}
              placeholder={clinic.email}
              editable={editCt}
              type="email"
              className={!editCt ? "input inputInEdit" : "input"}
              onChange={(e) =>
                setClinic(() => {
                  let temp = clinic;
                  temp.email = e.target.value;
                  return temp;
                })
              }
            ></input>
          </p>

          {!editCt && (
            <button
              className="btnContact"
              onClick={() => {
                setEditCt(true);
                setAnyChange(true);
              }}
            >
              Edit
            </button>
          )}
          {editCt && (
            <button
              className="btnContact"
              onClick={() => {
                setEditCt(false);
              }}
            >
              Done
            </button>
          )}
        </section>
      </div>
      <div>
        {anyChange && (
          <button
            className="saveButton"
            onClick={() => {
              setClinic(() => {
                let temp = clinic;
                temp.emergency = emergency;
                temp.Specialties = specialties
                return temp;
              });
              setEditCt(false);
              setEditSp(false);
              setAnyChange(false);
          
              console.log(clinic)
              UpdateAHospital(clinic);
              UpdateClinic({
                clinicId: clinic.id,
                  Capacity: clinic.capacity,
                  Beds: 100,
                  EmergencyRooms: emergency,
                  Ailment: "Nothing"

              })
            }}
          >
            Save
          </button>
        )}
        {anyChange && (
          <button
            className="saveButton"
            onClick={() => {
              setEditCt(false);
              setEditSp(false);
              setAnyChange(false);

            }}
          >
            Cancel
          </button>
        )}
      </div>
    </section>
  );
};

export default ClinicProfile;
