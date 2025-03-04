/*
Question:
The Problem statement included three tabs: Profile, Interest and Settings, with specific field requirement like:
- Age Field: Only numeric Value required
- Email Field: Validation to ensure to correct format

Had to incorporate dropdowns,radio button, checkboxes and implements:
- Validation for mandatory fields.
- Data persistance across the tabs
- Submit button that submitted the entire form only on the last tab.



*/
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Profile from "./Profile";
import Interests from "./Interests";
import Settings from "./Settings";

const TabForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      name: "Profile",
      component: Profile,
    },
    {
      name: "Interest",
      component: Interests,
    },
    {
      name: "Settings",
      component: Settings,
    },
  ];

  const ActiveTabComponent = tabs[activeTab].component;
  return (
    <div>
      <div className="heading-container">
        {tabs.map((e, i) => (
          <div className="heading" key={i}>
            {e.name}
          </div>
        ))}
      </div>
      <div className="tab-body">
        <ActiveTabComponent />
      </div>
    </div>
  );
};

export default TabForm;
