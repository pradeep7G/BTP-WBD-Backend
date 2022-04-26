import "./userList.css"
import { DataGrid } from "@material-ui/data-grid"
import { DeleteOutline } from "@material-ui/icons"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsers, deleteUser } from "../../redux/apiCalls"

//userlist page where we list all users in the database and also we have access to do crud operation on users

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    getUsers(dispatch, user)
  }, [dispatch, user])
  console.log("users: ", users)
  const handleDelete = (id) => {
    deleteUser(id, dispatch, user)
  }
  //columns field information and rendering the datagrid
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        )
      }
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        )
      }
    }
  ]

  return (
    <div className="userList">
    {/* rendering row fields through material ui datagrid */}
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  )
}

export default UserList
