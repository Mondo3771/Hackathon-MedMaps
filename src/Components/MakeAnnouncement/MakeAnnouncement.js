import { CheckIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const MakeAnnouncement = ({clinic, ID}) => {
    console.log(clinic)
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    time: null,
    details: "",
    clinicId: ID ? ID : 4,
  });

  // this is what it should look like
  // data = {
  //   title:"Tuesday Notification",
  //   details:"We have the pills",
  //   time : '2022-04-01 08:00:12',
  //   clinicId:4
  // };
  const PostNotification = (data) => {
    fetch(`/api/Notifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
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
              id: ID,
            })
          }
        ></input>
        <button
          className="addButton"
          onClick={() => {
            console.log(
                {
                    title: newAnnouncement.title,
                    time: new Date().toLocaleDateString(),
                    details: newAnnouncement.details,
                    clinicId: newAnnouncement.id,
                }
            )
            PostNotification({
                title: newAnnouncement.title,
                time: new Date().toLocaleDateString(),
                details: newAnnouncement.details,
                clinicId: ID,
            })
            setNewAnnouncement({
                title: "",
                time: null,
                details: "",
                id: ID,
              });
          }}
        >
          <CheckIcon width={24} />
        </button>
      </div>
    </section>
  );
};

export default MakeAnnouncement;
