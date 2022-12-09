import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Datatable from "react-data-table-component";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [userlist, setuserlist] = useState([]);
  const [filteruserlist, setFilteruserlist] = useState([]);
  const [fetcheddata, setFetcheddata] = useState();

  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const columns = [
    {
      name: "Username",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email Id",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.dob,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => <button onClick={() => handleView(row.id)}>View</button>,
    },
  ];
  const handleView = (id) => {
    const fetchuser = userlist.filter((data) => {
      return data.id == id;
    });
    setFetcheddata(fetchuser);
    setModalOpen(true);
  };
  useEffect(() => {
    getusers();
  }, []);

  function getusers() {
    const usersref = collection(db, "users");
    getDocs(usersref)
      .then((res) => {
        const users = res.docs.map((doc) => ({
          name: doc.data().name,
          dob: doc.data().dob,
          email: doc.data().email,
          id: doc.id,
        }));
        const allusers = users.filter((data) => {
          return data.id != localStorage.getItem("profile");
        });
        setuserlist(allusers);
        setFilteruserlist(allusers);
        const user = users.filter((d) => {
          return d.id == localStorage.getItem("profile");
        });
        setUsername(user[0].name);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    const profile = localStorage.getItem("profile");
  }, [userlist]);

  useEffect(() => {
    const result = userlist.filter((data) => {
      return data.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteruserlist(result);
  }, [search, userlist]);

  const handlelogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      {modalOpen ? (
        <Modal setOpenModal={setModalOpen} data={fetcheddata} />
      ) : (
        <>
          <div className="splitleft">
            <div className="centeR">
              <Datatable
                columns={columns}
                data={filteruserlist}
                pagination
                fixedHeader
                fixedHeaderScrollHeight="300px"
                highlightOnHover
                subHeader
                subHeaderComponent={
                  <input
                    type="text"
                    placeholder="Search here"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                }
              />
            </div>
          </div>

          <div className="splits rights">
            <img
              src="https://th.bing.com/th/id/OIP.Iuj4Ep5jsj29Az6Y3xQU1AHaE6?w=286&h=189&c=7&r=0&o=5&pid=1.7"
              style={{ borderRadius: "200px", width: "40px", height: "40px" }}
            />
            <p>{username}</p>
            <br />

            <button onClick={handlelogout}>logout</button>
          </div>
        </>
      )}
    </div>
  );
};
