import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid
} from "@material-ui/icons"
import { Link, useLocation, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { updateUser } from "../../redux/apiCalls"
import "./user.css"

//individual user page in admin dashboard, where admin can access , delete and edit existing user
const User = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()
  const userId = location.pathname.split("/")[2]
  const [user, setUser] = useState(
    useSelector((state) =>
      state.users.users.find((user) => user._id === userId)
    )
  )
  const adminUser = useSelector((state) => state.user)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(user)
    updateUser(userId, user, dispatch, adminUser)
    history.push(`/user/${userId}`)
  }

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newuser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={
                user.img
                  ? user.img
                  : "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              }
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.fullname}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phonenumber}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={user.username}
                  onChange={handleInput}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="fullname"
                  value={user.fullname}
                  onChange={handleInput}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Profile Pic Link</label>
                <input
                  type="text"
                  placeholder="img"
                  name="img"
                  value={user.img}
                  onChange={handleInput}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phonenumber"
                  value={user.phonenumber}
                  onChange={handleInput}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={user.address}
                  onChange={handleInput}
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img className="userUpdateImg" src={user.img} alt="userImage" />
              </div>
              <button className="userUpdateButton" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default User
