import "./HomePage.css";
import { useState } from "react";
import Maps from "../Components/Maps/Maps";

import Header from "../Components/Header/Header";
import { CheckIcon } from "@heroicons/react/24/solid";
// import { fetchLocalStorage } from "../helpers/helpers.js";
import { fetchLocalStorage } from "../helpers/helpers.js";
// import ProfileComp from "../Components/ProfileComp/ProfileComp";

const HomePage = () => {
  const clinicInfo = fetchLocalStorage({ key: "User" }) ?? [];
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    time: null,
    details: "",
    id: clinicInfo.id ? clinicInfo.id : 108,
  });


  return (
    <>
    <Header></Header>
    <main className="homepage">
      <Maps></Maps>
      {/*clinics only */}
      {/* <section className="announcementSection">
        <h3>Announcements</h3>
        <textarea
          className="announcementInput"
          onChange={(event) =>
            setNewAnnouncement({
              title: newAnnouncement.title,
              time: newAnnouncement.time,
              details: event.target.value,
              id: newAnnouncement.id,
            })
          }
        >
          {newAnnouncement.details}
        </textarea>
        <div className="secondDiv">
          <input
            placeholder="Announcement title"
            className="announcementTitle"
            value={newAnnouncement.title}
            onChange={(event) =>
              setNewAnnouncement({
                title: event.target.value,
                time: newAnnouncement.time,
                details: newAnnouncement.details,
                id: newAnnouncement.id,
              })
            }
          ></input>
          <button
            className="addButton"
            onClick={() => {
              setNewAnnouncement({
                title: newAnnouncement.title,
                time: new Date().toLocaleDateString(),
                details: newAnnouncement.details,
                id: newAnnouncement.id,
              });
       
            }}
          >
            <CheckIcon width={24} />
          </button>
        </div>
      </section> */}
    </main>    </>

  );
};

export default HomePage;