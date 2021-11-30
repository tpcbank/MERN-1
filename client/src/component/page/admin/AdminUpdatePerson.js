import React, { useState, useEffect } from "react";
import AdminNav from "../../layout/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatePerson, getPersons } from "../../functions/person.function";

const AdminUpdatePerson = ({ history, match }) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileOld, setFileOld] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadPerson(match.params.id, user.token);
  }, []);

  // load data from back-end
  const loadPerson = (id, authtoken) => {
    getPersons(id, authtoken)
      .then((res) => {
        //
        setFileOld(res.data.pic);
        setFileName(res.data.pic);
        setName(res.data.name);
        console.log(res);
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
    formData.append("fileName", fileName);
    formData.append("fileOld", fileOld);
    formData.append("data", name);

    updatePerson(formData, match.params.id, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        toast.success("Crate " + res.data.name + " success");
        loadPerson(user.token);
        history.push("/admin/create-person");
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err.response);
        setLoading(false);
      });
  };

  // remove row data and send data to back-end

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {!loading ? <h4>Admin Update Person</h4> : <h4>Loading...</h4>}

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>ชื่อ</label>
              <input
                type="text"
                className="form-control"
                value={name}
                autoFocus
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="custom-file mb-4">
              <input
                type="file"
                className="custom-file-input"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setFileName(e.target.files[0].name);
                }}
              />
              <label className="custom-file-label" htmlFor="customfile">
                {fileName}
              </label>
            </div>
            <button className="btn btn-outline-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdatePerson;
