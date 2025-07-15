import React, { useEffect, useState } from "react";
import { FaLongArrowAltDown, FaLongArrowAltUp, FaTrash } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";

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

  const [dataArr, setDataArr] = useState([
    { companyId: "1", locationId: "A", isGlobal: false },
    { companyId: "2", locationId: "D", isGlobal: true },
  ]);
  const [data, setData] = useState({
    companyId: "",
    locationId: "",
    isGlobal: false,
  });

  const [Show, setShow] = useState(false);
  const [filterLocation, setFilteredLocation] = useState([]);
  const [DisplayData, SetDisplayData] = useState([...dataArr]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = [...dataArr, data];
    // setDataArr([...dataArr, data]);
    // SetDisplayData([...dataArr, data]);
    setDataArr(updatedData);
    SetDisplayData(updatedData);

    setData({ companyId: "", locationId: "", isGlobal: false });
  };

  useEffect(() => {
    console.log("display Data", DisplayData);
  }, [DisplayData]);

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
      if (a[field] < b[field]) return asc ? -1 : 1;
      if (a[field] > b[field]) return asc ? 1 : -1;
      return 0;
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
    setSelectedData([...selectedData, value]);
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

  const DeleteItem = (companyId, locationId, isGlobal) => {
    const filterDelete = filterApplied.filter(
      (item) =>
        item.companyId !== companyId ||
        item.locationId !== locationId ||
        item.isGlobal !== isGlobal
    );

    console.log("filter Data", filterApplied);
    console.log("Company ID", companyId);
    console.log("Location ID", locationId);
    console.log("Global", isGlobal);
    console.log("Global", filterDelete);
    // setFilterApplied(filterDelete);
    SetDisplayData(filterDelete);
    setDataArr(filterDelete);
  };

  const [searchInput, setSearchInput] = useState();

  const SearchData = (e) => {
    const searchValue = e.target.value.toUpperCase();
    setSearchInput(searchValue);
    //this is becasue i am initial setting the filter 
    // state with while data so that after filter checkboc 
    // is applied and cleared it stores the whole data in the filter 
    // applied before 
    // searchin is done other wise older filter data will be considered
    setFilterApplied([...DisplayData]);
    if (searchValue.trim() === "") {
      SetDisplayData([...filterApplied]);
      return;
    }

    const searched = DisplayData.filter(
      (item) =>
        item.companyId.includes(searchValue) ||
        item.locationId.includes(searchValue)
    );

    SetDisplayData(searched);
  };

  const HandleClear = () => {
    setSelectedCompany([]);
    setSelectedLocation([]);
    setSearchInput("");

    setAsc(false);
    // setFilterApplied([...dataArr]);
    SetDisplayData([...dataArr]);
  };

  return (
    <>
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
              Filter By company
            </button>
            <ul className="dropdown-menu">
              {AvailableCompany.map((company) => (
                <li key={company}>
                  <div className="form-check">
                    <input
                      className="form-check-input m-1"
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
                </li>
              ))}
            </ul>
          </div>

          <div className="dropdown">
            <button
              className="btn btn-info dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filter By Location
            </button>
            <ul className="dropdown-menu">
              {AvailableLocation.map((location) => (
                <li key={location}>
                  <div className="form-check">
                    <input
                      className="form-check-input m-1"
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
                </li>
              ))}
            </ul>
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
        </div>
      </div>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col">
            <table className="table">
              <thead className="bg-primary">
                <tr>
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
                      {/* <th key={index}>{index + 1}</th> */}
                      <td>{data.companyId}</td>
                      <td>{data.locationId}</td>
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
                          onClick={() =>
                            DeleteItem(
                              data.companyId,
                              data.locationId,
                              data.isGlobal
                            )
                          }
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
                        className="form-select text-white"
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
                        className="form-select text-white"
                        value={loc.name}
                        key={loc.id}
                      >
                        {loc.name}
                      </option>
                    ))}
                  </select>
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
