import "./HomePage.css";
import { useState } from "react";
import Maps from "../Components/Maps/Maps";

import Header from "../Components/Header/Header";
import { CheckIcon } from "@heroicons/react/24/solid";
import { fetchLocalStroge } from "../Helpers/helpers";

const HomePage = () => {
  const clinicInfo = fetchLocalStroge({ key: "User" }) ?? [];
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    time: null,
    details: "",
    id: clinicInfo.id ? clinicInfo.id : 108,
  });
  // messageID: 8,
  // title: "Blood Donation Camp",
  // details: "Join us for our annual blood donation camp on August 10th from 9:00 AM to 4:00 PM. Your participation can save lives!",
  // time: "2024-08-01 12:01:01",
  // id: 108,

  return (
    <main className="homepage">
      <Header />
      <Maps></Maps>
      <section className="announcementSection">
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
              console.log(newAnnouncement);
            }}
          >
            <CheckIcon width={24} />
          </button>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
