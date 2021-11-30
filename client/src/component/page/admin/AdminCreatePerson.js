import React, { useState, useEffect } from "react";
import AdminNav from "../../layout/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createPerson,
  getPerson,
  removePerson,
} from "../../functions/person.function";
import moment from "moment/min/moment-with-locales";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Progress, Avatar, Image } from "antd";
import { Link } from "react-router-dom";

const AdminCreatePerson = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState([]);
  const [filename, setFilename] = useState("Choose file");
  const [file, setFile] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const [uploadPerscentage, setUploadPerscentage] = useState(0);

  useEffect(() => {
    loadPerson(user.token);
  }, []);

  // load data from back-end
  const loadPerson = (authtoken) => {
    getPerson(authtoken)
      .then((res) => {
        setPerson(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // crate and add data to back-end
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", name);
    createPerson(formData, user.token, setUploadPerscentage)
      .then((res) => {
        setLoading(false);
        setUploadPerscentage(0);
        setFilename("Choose file");
        setName("");
        loadPerson(user.token);
        toast.success("Crate " + res.data.name + " success");
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err.response);
        setLoading(false);
      });
  };

  // remove row data and send data to back-end
  const handleRemove = (id) => {
    console.log(id);
    if (window.confirm("Are you sure Delete !!!!")) {
      setLoading(true);
      removePerson(id, user.token)
        .then((res) => {
          setLoading(false);
          loadPerson(user.token);
          toast.success("remove " + res.data.name + " success");
        })
        .catch((err) => {
          console.log("err", err);
          toast.error(err.response);
          setLoading(false);
        });
    }
  };

  const columns = [
    {
      title: "ชื่อ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "วันที่",
      render: (record) => (
        <>{moment(record.date).locale("th").format("dddd DD MMM YYYY")}</>
      ),
    },
    {
      title: "ไฟล์",
      render: (record) => (
        <>
          <Avatar
            src={<Image src={`http://localhost:8000/uploads/${record.pic}`} />}
          />
        </>
      ),
    },
    {
      title: "Action",
      render: (record) => (
        <>
          <span
            className="btn btn-sm float-right"
            onClick={() => handleRemove(record._id)}
          >
            <DeleteOutlined className="text-danger" />
          </span>
          <Link to={"/admin/update-person/" + record._id}>
            <span className="btn btn-sm float-right">
              <EditOutlined className="text-warning" />
            </span>
          </Link>
        </>
      ),
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {!loading ? <h4>Admin CreatePerson</h4> : <h4>Loading...</h4>}

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>ชื่อ</label>
              <input
                type="text"
                className="form-control"
                autoFocus
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="custom-file mb-4">
              <input
                type="file"
                className="custom-file-input"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setFilename(e.target.files[0].name);
                }}
              />
              <label className="custom-file-label" htmlFor="customfile">
                {filename}
              </label>
              <Progress
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                percent={uploadPerscentage}
              />
            </div>

            <button className="btn btn-outline-primary">Save</button>
          </form>
          <hr />
          <Table columns={columns} dataSource={person} rowKey="_id" />
        </div>
      </div>
    </div>
  );
};

export default AdminCreatePerson;
