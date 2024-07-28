import "./Announcements.css";
// import { clinics, announcements } from "../../MockData/Arrays";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { formatDateTimeDatabase } from "../../helpers/helpers";
import { useEffect, useState } from "react";

const Announcements = ({ id }) => {
  const [announcementsDB, setAnnouncemntsDB] = useState(null);

  useEffect(() => {
    const GetNotification = (id) => {
      fetch(`/api/Notifications?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          let temp = data;
          temp.sort((a, b) => {
            let time1 = new Date(a.time);
            let time2 = new Date(b.time);
            return time1 - time2
          });
          setAnnouncemntsDB(temp);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    GetNotification(id);
  }, []);

  if (announcementsDB) {
    return (
      <section className="announcements">
        {announcementsDB.map((announcement, index) => (
          <div className="announcementCard" key={index}>
            <UserCircleIcon width={75} />
            <div className="announcementInfo">
              <h3>{announcement.title}</h3>
              <p>{announcement.details}</p>
            </div>
            <p className="announcementTime">
              {formatDateTimeDatabase(announcement.time)}
            </p>
          </div>
        ))}
      </section>
    );
  } else {
    <div></div>;
  }
};

export default Announcements;
