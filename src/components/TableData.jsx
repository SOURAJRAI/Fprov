import React, { useState } from "react";
import { FaLongArrowAltDown, FaLongArrowAltUp, FaTrash } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import axios from "axios";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function TableData() {
  const companies = [{ name: "1" }, { name: "2" }, { name: "3" }];

  const locations = [
    { name: "A", companyId: "1" },
    { name: "B", companyId: "1" },
    { name: "C", companyId: "1" },
    { name: "D", companyId: "2" },
    { name: "E", companyId: "2" },
    { name: "F", companyId: "2" },
    { name: "G", companyId: "3" },
    { name: "H", companyId: "3" },
    { name: "I", companyId: "3" },
  ];

  const navigate = useNavigate();
  const location=useLocation();
  const [dataArr, setDataArr] = useState([]);
  const [data, setData] = useState({
    companyId: "",
    locationId: "",
    isGlobal: false,
    values:""
  });
  const [isUpdated, SetIsUpdated] = useState(false);

  const [Show, setShow] = useState(false);
  const [filterLocation, setFilteredLocation] = useState([]);
  const [DisplayData, SetDisplayData] = useState([...dataArr]);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/Company/getAllCompanies")
      .then((res) => {
        setDataArr(res.data.data);
        SetDisplayData(res.data.data);
        SetIsUpdated(false);
        // console.log(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          navigate("/");
        }
        console.error(err);
      });
  }, [isUpdated]);


//     useEffect(()=>{
//  axios.get("http://localhost:5000/api/Auth/isAuthenticated")
//    .then((res) =>{
//      if(res.data.authenticated)
//        {
//       navigate('/');
//        }
   
// })
//    .catch((err)=> 
//    { 
//     console.log(err);
    
//     navigate('/login');
//     })
//    },[]);

  useEffect(()=>{
    const message=location.state?.toastMsg;
    console.log(message);
    if(message){
      toast.success(message,{
        autoClose:1500
      })
      navigate(location.pathname,{replace:true});
    }
  },[navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // const updatedData = [...dataArr, data];

    // setDataArr([...dataArr, data]);
    // SetDisplayData([...dataArr, data]);
    // setDataArr(updatedData);
    // SetDisplayData(updatedData);

    axios
      .post("http://localhost:5000/api/Company/add", data)
      .then(() => {
        SetIsUpdated(true);
      })
      .catch((err) => console.log(err));

    setData({ companyId: "", locationId: "", isGlobal: false , values:""});
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value.toUpperCase(),
    });

    if (name === "companyId") {
      const relatedloc = locations.filter((loc) => loc.companyId === value);
      console.log("locations", locations);
      setFilteredLocation(relatedloc);

      console.log("Filtered location", filterLocation);
    }
    console.log("value", value);
  };

  const [asc, setAsc] = useState(false);

  function Sort(field) {
    const sortedData = [...DisplayData].sort((a, b) => {
      let value1 = a[field];
      let value2 = b[field];
      if (asc) {
        return value1.localeCompare(value2);
      } else {
        return value2.localeCompare(value1);
      }
    });
    setAsc(!asc);
    // setDataArr(sortedData);
    SetDisplayData(sortedData);
    console.log(AvailableCompany);
    console.log(dataArr);
  }

  const [selectedCompany, setSelectedCompany] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);

  const toggleSelect = (value, selectedData, setSelectedData) => {
    const isSelected = selectedData.includes(value);
    const selectedCheckbox = isSelected
      ? selectedData.filter((v) => v !== value)
      : [...selectedData, value];
    setSelectedData(selectedCheckbox);

    if (selectedData === selectedCompany && isSelected) {
      const relatedLocation = locations
        .filter((v) => v.companyId === value)
        .map((l) => l.name);
      setSelectedLocation((prev) =>
        prev.filter((loc) => !relatedLocation.includes(loc))
      );
    }
    console.log("Selected", isSelected);
    console.log("SelectedCompanes", selectedCompany);
    console.log("selectedCheckbox", selectedCheckbox);
    console.log("location", locations);
  };

  const AvailableLocation = [
    ...new Set(
      dataArr
        .filter(
          (id) =>
            selectedCompany.length === 0 ||
            selectedCompany.includes(id.companyId)
        )
        .map((item) => item.locationId)
    ),
  ];

  const AvailableCompany = [
    ...new Set(
      dataArr
        .filter(
          (id) =>
            selectedLocation.length === 0 ||
            selectedLocation.includes(id.locationId)
        )
        .map((item) => item.companyId)
    ),
  ];

  const [filterApplied, setFilterApplied] = useState([...dataArr]);

  const ApplyFilter = () => {
    const FilterData = dataArr.filter((item) => {
      const company =
        selectedCompany.length === 0 ||
        selectedCompany.includes(item.companyId);
      const location =
        selectedLocation.length === 0 ||
        selectedLocation.includes(item.locationId);

      console.log("selected location", typeof item.companyId);
      return company && location;
    });

    console.log("selected company", selectedCompany);
    setFilterApplied(FilterData);
    SetDisplayData(FilterData);
    console.log("Filtered Data", FilterData);
  };

  const DeleteItem = async (id) => {
    console.log("dlete", id);
    await axios
      .delete(`http://localhost:5000/api/Company/delete/${id}`)
      .then(() => SetIsUpdated(true))
      .catch((err) => console.log(err));
  };

  const [searchInput, setSearchInput] = useState();

  const SearchData = (e) => {
    const searchValue = e.target.value.toUpperCase();
    setSearchInput(searchValue);

    console.log("inside search", filterApplied);
    if (searchValue.trim() === "") {
      SetDisplayData([...filterApplied]);
      return;
    }

    const searched = DisplayData.filter(
      (item) =>
        item.companyId.includes(searchValue) ||
        item.locationId.includes(searchValue)
    );

    console.log("inside search display data", DisplayData);
    console.log("inside search data", searched);
    SetDisplayData(searched);
  };

  const HandleClear = () => {
    setSelectedCompany([]);
    setSelectedLocation([]);
    setSearchInput("");

    setAsc(false);
    setFilterApplied([...dataArr]);
    // setFilterApplied([...DisplayData]);
    SetDisplayData([...dataArr]);
  };

  // const HandleLogout = () => {
  //   axios
  //     .post("http://localhost:5000/api/Auth/logout")
  //     .then(() => {
  //       // toast.success("Logged oout Successfully")
  //       navigate("/login", { state: { toastMsg: "logged out Successfully" } });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error("Logout Failed");
  //     });
  // };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid mt-3">
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-success  m-2"
            onClick={() => setShow(true)}
          >
            Add
          </button>
          {/* //company Filter */}
          {/* filtering using checkbox*/}

          <div className="dropdown">
            <button
              className="btn btn-info dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filter
            </button>

            <div className="dropdown-menu p-3">
              {/* Company Filter (Left Panel) */}
              <div className="d-flex">
                <div style={{ minWidth: "80px" }}>
                  <h6 className="dropdown-header p-0 mb-2">Company</h6>
                  {AvailableCompany.map((company) => (
                    <div className="form-check ms-2" key={company}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedCompany.includes(company)}
                        onChange={() =>
                          toggleSelect(
                            company,
                            selectedCompany,
                            setSelectedCompany
                          )
                        }
                      />
                      <label className="form-check-label">{company}</label>
                    </div>
                  ))}
                </div>

                {/* Location Filter (Right Panel, only if company is selected) */}
                {selectedCompany.length > 0 && (
                  <div style={{ minWidth: "80px" }}>
                    <h6 className="dropdown-header p-0 mb-2">Location</h6>
                    {AvailableLocation.map((location) => (
                      <div className="form-check ms-2" key={location}>
                        <input
                          className="form-check-input "
                          type="checkbox"
                          checked={selectedLocation.includes(location)}
                          onChange={() =>
                            toggleSelect(
                              location,
                              selectedLocation,
                              setSelectedLocation
                            )
                          }
                        />
                        <label className="form-check-label">{location}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Clear and apply filter Filter Button */}

          <button
            disabled={
              selectedCompany.length === 0 && selectedLocation.length === 0
            }
            className="btn btn-warning"
            onClick={() => {
              ApplyFilter();
            }}
          >
            Apply Filter
          </button>
          <button className="btn btn-danger" onClick={HandleClear}>
            Clear
          </button>
          <input
            className="form-control w-25"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchInput || ""}
            onChange={SearchData}
            required
          />
          {/* <RiLogoutCircleRLine
            size={30}
            color="red"
            className="ms-auto"
            onClick={HandleLogout}
          /> */}

          {/* <MdOutlineExit */}
        </div>
      </div>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col">
            <table className="table table-hover table-responsive">
              <thead className="bg-primary">
                <tr>
                  <th
                    scope="col"
                    style={{ cursor: "default" }}
                    className="bg-primary text-white"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    onClick={() => Sort("companyId")}
                    style={{ cursor: "default" }}
                    className="bg-primary text-white"
                  >
                    Company
                    {asc ? (
                      <FaLongArrowAltDown style={{ color: "white" }} />
                    ) : (
                      <FaLongArrowAltUp style={{ color: "white" }} />
                    )}
                  </th>
                  <th
                    scope="col"
                    onClick={() => Sort("locationId")}
                    style={{ cursor: "default" }}
                    className="bg-primary text-white"
                  >
                    Location
                    {asc ? (
                      <FaLongArrowAltDown style={{ color: "white" }} />
                    ) : (
                      <FaLongArrowAltUp style={{ color: "white" }} />
                    )}
                  </th>
                   <th scope="col" className="bg-primary text-white">
                    Values
                  </th>
                  <th scope="col" className="bg-primary text-white">
                    IsGlobal
                  </th>
                  <th className="bg-primary text-white"></th>
                </tr>
              </thead>
              <tbody>
                {DisplayData.length === 0 ? (
                  <tr>
                    <td>No Records Found</td>
                  </tr>
                ) : (
                  DisplayData.map((data, index) => (
                    <tr key={index}>
                      <td key={index}>{index + 1}</td>
                      <td>{data.companyId}</td>
                      <td>{data.locationId}</td>
                      <td>{data.values}</td>
                      <td
                        className={`text-${
                          data.isGlobal === false ? "danger" : "success"
                        } font-weight-bold`}
                      >
                        {data.isGlobal ? "Global" : "Local"}
                      </td>
                      <td>
                        <FaTrash
                          style={{ color: "red" }}
                          onClick={() => DeleteItem(data._id)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Modal to add Data  */}
      {Show && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Data</h5>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setShow(false)} // Close modal
                >
                  <IoCloseOutline />
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <select
                    className="form-select"
                    name="companyId"
                    value={data.companyId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Company</option>
                    {companies.map((comp, index) => (
                      <option
                        className="form-select"
                        value={comp.name}
                        key={index}
                      >
                        {comp.name}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-select mt-3"
                    name="locationId"
                    value={data.locationId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Company</option>
                    {filterLocation.map((loc) => (
                      <option
                        className="form-select "
                        value={loc.name}
                        key={loc.id}
                      >
                        {loc.name}
                      </option>
                    ))}
                  </select>
                 <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="values"
                      value={data.values}
                      onChange={handleChange}
                      placeholder="Enter the Values"
                    />
                    {/* <label className="form-check-label ms-2">Values</label> */}
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="isGlobal"
                      checked={data.isGlobal}
                      onChange={handleChange}
                    />
                    <label className="form-check-label ms-2">Is Global</label>
                  </div>

                  <button type="submit" className="btn btn-warning mt-2">
                    Add
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TableData;
