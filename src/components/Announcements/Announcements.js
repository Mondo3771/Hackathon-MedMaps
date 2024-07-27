import "./Announcements.css"
import { clinics,announcements } from "../../MockData/Arrays"
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { formatDateTime } from "../../Helpers/helpers";

const Announcements = ({id}) => {
    const ID = 101;
    formatDateTime(announcements[0].time)

  return (
    <section className="announcements">
        {announcements.map((announcement,index) => 
        (
        <div className="announcementCard" key={index}>
            <UserCircleIcon width={75}/>
            <div className="announcementInfo">
                <h3>{announcement.title}</h3>
                <p>{announcement.details}</p>
            </div>
            <p className="announcementTime">{formatDateTime(announcement.time)}</p>
        </div>
        ))
    }
        

    </section>
  )
}

export default Announcements