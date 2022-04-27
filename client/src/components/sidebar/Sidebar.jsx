import "./sidebar.css"
import {
  LineStyle,
  PermIdentity,
  Storefront,
  AttachMoney
} from "@material-ui/icons"
import { Link } from "react-router-dom"

/* Sidebar navigation menu page in admin dashboard */

export default function Sidebar() {
  return (
    <div className="sidebar"> 
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
        {/* Quick Menu for navigation to users, products, orders pages */}
          <h3 className="sidebarTitle">Quick Menu</h3> 
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
              {/* sidebar icon for menu item */}
                <PermIdentity className="sidebarIcon" /> 
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
              {/* sidebar icon for menu item */}
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/adminOrders" className="link">
              <li className="sidebarListItem">
              {/* sidebar icon for menu item */}
                <AttachMoney className="sidebarIcon" />
                Transactions
              </li>
            </Link>
            <Link to="/newproduct" className="link">
              {/* sidebar icon for new product menu item */}
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                New Product
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}
