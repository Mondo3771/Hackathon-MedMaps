import React from "react";
import {
  UserCircleIcon,
  BellIcon,
  IdentificationIcon,
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

const ProfileComp = () => {
  return (
    <div>
      {clinics
        .filter((clinic) => clinic.id === 3)
        .map((clinic) => (
          <Container key={clinic.id}>
            <Section>
              <SectionTitle>
                <div className="title">
                  <BellIcon width={35} />
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
          </Container>
        ))}
    </div>
  );
};

export default ProfileComp;
