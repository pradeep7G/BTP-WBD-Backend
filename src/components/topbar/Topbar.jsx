import React from "react"
import "./topbar.css"
import { NotificationsNone, Language, Settings, Dashboard } from "@material-ui/icons"
import { useHistory } from "react-router-dom"

// Topbar navigation menu in admin Dashboard, contains options to go to home page 

export default function Topbar({ setToggleAdmin }) {
  const history = useHistory() //history hook to navigate to different pages
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">AirShop Admin Dashboard</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            {/* icon badge for topbar menu items */}
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            {/* icon badge for topbar menu items */}
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            {/* icon badge for topbar menu items */}
            <Settings />
          </div>
          {/* navigation to home from admin dashboard */}
          <div
            className="topbarIconContainer"
            onClick={() => {
              setToggleAdmin(false)
              history.push("/")
            }}
          >
            Goto Home
          </div>
          {/* profile image of admin user */}
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  )
}
