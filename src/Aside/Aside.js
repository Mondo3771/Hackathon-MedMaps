import { MapPinIcon } from "@heroicons/react/24/solid";
import "./Aside.css";

import { clinics } from "../MockData/Arrays";
import ProfileComp from "../Components/ProfileComp/ProfileComp";
import { useState } from "react";


const Aside = ({routes,calculate,checked}) => {
  console.log(<MapPinIcon />);
  const[clicked,setClicked]=useState(null);
  const button=(addy)=>{
    calculate(addy.address);
    setClicked(addy)

  }
  return (
    <>
    <aside className="hello">
                      <h1>{checked?'Hospitals near me':'Clinics near me'}</h1>

      {routes.map((clinic, index) => (
         <>
        <div
          key={index}
          className="clinicCard"
          // Onclick go to profile page with input parameter clinic
          // onClick={() => console.log(clinic)}
          onClick={()=>button(clinic)}

     
        >
          <svg
            fill="#808080"
            className="clinicPic"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
          >
            <path d="M11,12v1H10a1,1,0,0,0,0,2h1v1a1,1,0,0,0,2,0V15h1a1,1,0,0,0,0-2H13V12a1,1,0,0,0-2,0Zm10.66406-1.74756-9-8a.99893.99893,0,0,0-1.32812,0l-9,8a.99991.99991,0,0,0,1.32812,1.49512L4,11.449V21a.99974.99974,0,0,0,1,1H19a.99974.99974,0,0,0,1-1V11.449l.33594.29859a.99991.99991,0,0,0,1.32812-1.49512ZM18,20H6V9.6712l6-5.33331L18,9.6712Z" />
          </svg>
          <section className="infoSection">
            <section className="textSection">
              <h4>{clinic.name}</h4>
              {console.log(clinic.Public)}
              {clinic.Public ? <p>Public</p> : <p>Private</p>}
            </section>

            <div className="distanceContainer">
              <MapPinIcon width={24} className="mapPin" />
              <p>{clinic.Distance}</p>
            </div>
          </section>
        </div>
       </>
      ))}
    </aside>
            {clicked?<ProfileComp clinic={clicked}></ProfileComp>:null}
            </>
  );
};

export default Aside;
