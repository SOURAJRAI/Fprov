import React, { useEffect, useState } from "react";
import axios from "axios";
import HighCharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [CompanyData, setCompanyData] = useState({ categories: [], data: [] });
  const [LocationData, setLocationData] = useState({
    categories: [],
    data: [],
  });


  const [graphType, setGraphType] = useState("column");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/Company/getAllCompanies")
      .then((res) => {
        const data1 = res.data.data;
        const data = [...data1];
        console.log("orgial Data", data);

        const companyWise = {};
        data.forEach((company) => {
          const companyId = company.companyId;
          const values = parseInt(company.values);
          console.log("company id", companyId);
          console.log("Company values", values);

          if (companyWise[companyId]) {
            companyWise[companyId] += values;
          } else {
            companyWise[companyId] = values;
          }
        });
        const companyName = Object.keys(companyWise);
        const CompanyValues = Object.values(companyWise);
        // console.log("companyName", companyName);
        // console.log("companyValues", CompanyValues);
        // console.log("CompanyWise", companyWise);
        setCompanyData({ categories: companyName, data: CompanyValues });

        const locationWise = {};
        data.forEach((company) => {
          const locationId = company.locationId;
          const values = parseInt(company.values);
          console.log("company id", locationId);
          console.log("Company values", values);

          if (locationWise[locationId]) {
            locationWise[locationId] += values;
          } else {
            locationWise[locationId] = values;
          }
        });

        const locationName = Object.keys(locationWise);
        const locationValues = Object.values(locationWise);
        // console.log("locationName", locationName);
        // console.log("locationValues", locationValues);
        // console.log("locationWise", locationWise);
        setLocationData({ categories: locationName, data: locationValues });
      })
      .catch((err) => console.log(err));
  }, []);

  const companyOptionBar = {
    chart: { type: "column" },
    credits: { enabled: false },
    title: {
      text: "Total Growth by Company",
    },
    xAxis: {
      title: {
        text: "Companies",
      },
      categories: CompanyData.categories,
    },
    yAxis: { title: { text: "Values" } },
    series: [
      {
        name: "Company",
        data: CompanyData.data,
        negativeColor: "red",
      //      color: {
      //   linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
      //   stops: [
      //     [0, "#00c6ff"],  // Top
      //     [1, "#0072ff"]   // Bottom
      //   ]
      // }
      },
    ],
  };

  const companyOptionLine = {
    chart: { type: "line" },
    credits: { enabled: false },
    title: {
      text: "Total Growth by Company",
    },
    xAxis: {
      title: {
        text: "Companies",
      },
      categories: CompanyData.categories,
    },
    yAxis: { title: { text: "Values" } },
    series: [
      {
        name: "Company",
        data: CompanyData.data,
        
        
      },
    ],
  };
  
  const locationOptionBar = {
    chart: { type: "column" },
    credits: { enabled: false },
    title: { text: "Total Growth by Location" },
    xAxis: {
      title: { text: "Locations" },
      categories: LocationData.categories,
    },
    yAxis: { title: { text: "Values" } },
    series: [
      {
        name: "Location",
        data: LocationData.data,
        negativeColor:'red',
     
      },
    ],
  };
  const locationOptionLine = {
    chart: { type: "line" },
    credits: { enabled: false },
    title: { text: "Total Growth by Location" },
    xAxis: {
      title: { text: "Locations" },
      categories: LocationData.categories,
    },
    yAxis: { title: { text: "Values" } },
    series: [
      { 
        name: "Location", 
        data: LocationData.data,
  
      }
    ],
  };

  return (
    <>
      <div className="container-fluid mt-3">
        <div className="d-flex align-items-center gap-3">
          <div className="btn-group" role="group">
            <button
              className={`btn ${graphType === "column" ? "btn-primary" : "btn-outline-primary"
                }`}
              onClick={() => setGraphType("column")}
            >
              Bar Graph
            </button>
            <button
              className={`btn ${graphType === "line" ? "btn-primary" : "btn-outline-primary"
                }`}
              onClick={() => setGraphType("line")}
            >
              Line Graph
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-3">
        <div className="row">
          {graphType === "column" ? (
            <>
              <div className="col-6">
                <div className="card shadow m-5">
                  <HighchartsReact
                    highcharts={HighCharts}
                    options={companyOptionBar}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="card shadow m-5">
                  <HighchartsReact
                    highcharts={HighCharts}
                    options={locationOptionBar}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-6">
                <div className="card shadow m-5">
                  <HighchartsReact
                    highcharts={HighCharts}
                    options={companyOptionLine}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="card shadow m-5">
                  <HighchartsReact
                    highcharts={HighCharts}
                    options={locationOptionLine}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
