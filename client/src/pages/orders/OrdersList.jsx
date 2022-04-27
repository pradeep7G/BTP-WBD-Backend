import "./ordersList.css"
import { DataGrid } from "@material-ui/data-grid"
import { DeleteOutline } from "@material-ui/icons"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { useState } from "react"

export default function OrdersList() {
  const [orders, setOrders] = useState([])
  const user = useSelector((state) => state.user)

  //useEffect for retrieving orders from the databse
  useEffect(() => {
    const headers = {
      token: `Bearer ${user.currentUser.accessToken}`
    }
    const getOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders`, {
          headers
        })
        console.log(res)
        setOrders(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getOrders()
  }, [])
  console.log(orders)

  //handling deletion of specific order
  const handleDelete = async (id) => {
    console.log(id)
    const headers = {
      token: `Bearer ${user.currentUser.accessToken}`
    }

    try {
      const res = await axios.delete(`http://localhost:5000/api/orders/${id}`, {
        headers
      })
      console.log(res)
      const filteredOrders = orders.filter((ord) => ord._id !== id)
      setOrders(filteredOrders)
    } catch (err) {
      console.log(err)
    }
  }

  //columns field information and rendering the datagrid
  const columns = [
    { field: "_id", headerName: "Order ID", width: 220 },
    {
      field: "userId",
      headerName: "User ID",
      width: 200
    },
    {
      field: "products",
      headerName: "Products",
      width: 200,
      renderCell: (params) => {
        return <div>quantity - {params.row.products.length}</div>
      }
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 220,
      renderCell: (params) => {
        return <div>Rs. {params.row.amount}</div>
      }
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 160,
      renderCell: (params) => {
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric"
        }
        const date = new Date(params.row.createdAt)
        return <div>{date.toLocaleDateString(undefined, options)}</div>
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        )
      }
    }
  ]

  return (
    <div className="productList">
    {/* rendering row fields through material ui datagrid */}
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  )
}
