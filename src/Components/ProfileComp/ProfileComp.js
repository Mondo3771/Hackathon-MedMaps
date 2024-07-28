import React from "react";
import {
  UserCircleIcon,
  BellIcon,
  IdentificationIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { clinics } from "../../MockData/Arrays.js";
import {
  Container,
  Section,
  SectionTitle,
  Icon,
  List,
  ListItem,
} from "./ProfileComp.styles.js";

const ProfileComp = ({clinic}) => {
  const getColorForCapacity = (capacity) => {
    const percentage = parseInt(capacity);
    if (percentage <= 25) return "green";
    if (percentage <= 50) return "orange";
    if (percentage <= 75) return "red";
    return "darkred";
  };

  function handleSectionClick() {
    // Handle the click event, e.g., navigate to the announcements page
    console.log("Section clicked");
  }
  return (
    <div>
      {/* {clinics
        // .filter((clinic) => clinic.id === 4)
        .map((clinic) => ( */}
          <Container key={clinic.id}>
            <h1>{clinic.name}</h1>
            <p></p>
            <Section>
              <SectionTitle
                style={{
                  cursor: "pointer",
                  color: "#333",
                  transition: "color 0.3s ease",
                }}
                onClick={() => handleSectionClick()}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#a3bb97")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
              >
                <div className="title">
                  <InboxIcon width={35} />
                  <h3>Announcements</h3>
                </div>
              </SectionTitle>
            </Section>
            <Section>
              <SectionTitle>
                <div className="title">
                  <IdentificationIcon width={40} />
                  <h3>Specialisations</h3>
                </div>
              </SectionTitle>
              <List>
                {clinic.Specialties.length > 0 ? (
                  clinic.Specialties.map((specialty, idx) => (
                    <ListItem key={idx}>{specialty}</ListItem>
                  ))
                ) : (
                  <ListItem>No specializations listed</ListItem>
                )}
              </List>
            </Section>
            <Section>
              <SectionTitle>
                <div className="title">
                  <UserCircleIcon width={40} />
                  <h3>Contact Details</h3>
                </div>
              </SectionTitle>
              <List>
                {clinic.tel.length > 0 ? (
                  clinic.tel.map((tel, idx) => (
                    <ListItem key={idx}>{tel}</ListItem>
                  ))
                ) : (
                  <ListItem>No specializations listed</ListItem>
                )}
              </List>
            </Section>
            <Section>
              <SectionTitle>
                <div className="title">
                  <BellIcon width={40} />
                  <h3>Real Time Notifications</h3>
                </div>
              </SectionTitle>
              <List>
                <ListItem
                  style={{ color: getColorForCapacity(clinic.capacity) }}
                >
                  Capacity: {clinic.capacity}
                </ListItem>
                <ListItem>
                  Emergency Rooms: {clinic.emergencyRooms ? "Yes" : "No"}
                </ListItem>
              </List>
            </Section>
          </Container>
    </div>
  );
};

export default ProfileComp;
