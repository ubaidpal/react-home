import React, { useEffect, useReducer, useState } from "react";
import Front from "../Layouts/Front";

import topbar from "topbar";
import axios from "axios";
import _ from "underscore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = (props) => {
  const [getData, setData] = useState(props);
  const [getUser, setUser] = useState(
    props && props.auth ? props.auth.user.username : null
  );
  const [getRedirectPage, setRedirectPage] = useState("");

  useEffect(() => {
    let isSubscribed = true;
    resetToDefaults();
    topbar.show();
    getDashboard();

    let counter = localStorage.getItem("refresh")
      ? localStorage.getItem("refresh")
      : 5000;
    counter = parseInt(counter);
    if (_.isNumber(counter)) {
      var myFunction = function () {
        clearInterval(interval);
        counter = localStorage.getItem("refresh")
          ? localStorage.getItem("refresh")
          : 5000;
        if (isSubscribed) {
          getDashboard();
          interval = setTimeout(myFunction, counter);
        }
      };
      var interval = setTimeout(myFunction, counter);
    }
    return () => (isSubscribed = false);
  }, [1]);

  function getDashboard() {
    topbar.show();
    axios
      .get("/" + getUser + "/sme/api")
      .then(function (response) {
        // handle success
        const data = _.clone(getData);
        data.report_data = response.data.report_data;
        setData(data);
        topbar.hide();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  const notify = () => {
    const url = getData.report_data.report.latest_report_template_url;
    if (!url) {
      toast.error("No report found!", {
        limit: 1,
      });
    }
  };

  function resetToDefaults() {
    topbar.config({
      autoRun: true,
      barThickness: 5,
      barColors: {
        0: "rgba(26,  188, 156, .9)",
        ".25": "rgba(52,  152, 219, .9)",
        ".50": "rgba(241, 196, 15,  .9)",
        ".75": "rgba(230, 126, 34,  .9)",
        "1.0": "rgba(211, 84,  0,   .9)",
      },
      shadowBlur: 10,
      shadowColor: "rgba(0,   0,   0,   .6)",
    });
  }

  function dispatchAction(url) {
    setRedirectPage(url);
    setTimeout(() => {
      setRedirectPage("");
    }, 500);
  }

  return (
    <Front getRedirectPage={getRedirectPage}>
      <ToastContainer />
      <div className="container-fluid w-100">
        <h1 className="color-text">Welcome {getData.user_name},</h1>

        <div className="bg-dark margin-bottom-half text-center text-white font-34 font-bold">
          {getData.message}
        </div>
        <div className=" d-inline-block w-100 m-b-20 p-l-4 p-r-4">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-sm-12 info-card-block">
              <div className="info-cards">
                <div className="card box-shadow ">
                  <div className="text-center card-icon">
                    <img
                      src={require("../../img/web1.png")}
                      alt="Web Threat Protection"
                      width="100px"
                      height="100px"
                      className="light-mode"
                    />
                    <img
                      src={require("../../img/web2.png")}
                      alt="Web Threat Protection"
                      width="100px"
                      height="100px"
                      className="dark-mode"
                    />
                  </div>
                  <h2 className="text-center first-heading">
                    <span
                      className="pointer"
                      onClick={() =>
                        dispatchAction("/" + getUser + "/sme/widget/webThreat")
                      }
                    >
                      <b>
                        Web Threat
                        <br /> Protection{" "}
                      </b>{" "}
                    </span>
                  </h2>
                  <div className="digit text-center">
                    <div className="green-circle">
                      <div className="cell">
                        <span className="active">
                          {getData.report_data.website.available}
                        </span>
                        <div>
                          <strong>Available</strong>
                        </div>
                      </div>
                      <div className="cell">
                        <span
                          className={
                            getData &&
                            getData.report_data.website.protection == 0
                              ? "not-active"
                              : "active"
                          }
                        >
                          {getData.report_data.website.protection}
                        </span>
                        <div>
                          <strong>Protected</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className=" text-center">
                    <a
                      className="pointer"
                      onClick={() =>
                        dispatchAction("/" + getUser + "/sme/widget/webThreat")
                      }
                    >
                      <strong>Live analytics </strong>
                    </a>
                  </p>
                </div>
                <a
                  className="bottom-line"
                  href="mailto: info@blockapt.com"
                  target="_blank"
                >
                  + more websites
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12 info-card-block">
              <div className="info-cards">
                <div className="card box-shadow ">
                  <div className="text-center card-icon">
                    <img
                      src={require("../../img/endpoint1.png")}
                      alt="Web Threat Protection"
                      width="100px"
                      height="100px"
                      className="light-mode"
                    />
                    <img
                      src={require("../../img/endpoint2.png")}
                      alt="Web Threat Protection"
                      width="100px"
                      height="100px"
                      className="dark-mode"
                    />
                  </div>

                  <h2 className="text-center first-heading">
                    <span
                      className="pointer"
                      onClick={() =>
                        dispatchAction("/" + getUser + "/sme/widget/endPoint")
                      }
                    >
                      <b>
                        Endpoint
                        <br /> Security
                      </b>{" "}
                    </span>
                  </h2>
                  <div className="digit text-center">
                    <div className="green-circle">
                      <div className="cell">
                        <span className="active">
                          {getData.report_data.endpoint.available}
                        </span>
                        <div>
                          <strong>Available</strong>
                        </div>
                      </div>
                      <div className="cell">
                        <span
                          className={
                            getData &&
                            getData.report_data.endpoint.protection == 0
                              ? "not-active"
                              : "active"
                          }
                        >
                          {getData.report_data.endpoint.protection}
                        </span>
                        <div>
                          <strong>Protected</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className=" text-center">
                    <a
                      className="pointer"
                      onClick={() =>
                        dispatchAction("/" + getUser + "/sme/widget/endPoint")
                      }
                    >
                      <strong> Device health</strong>{" "}
                    </a>
                  </p>
                </div>
                <a
                  className="bottom-line"
                  href="mailto: info@blockapt.com"
                  target="_blank"
                >
                  + more endpoints
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12 info-card-block">
              <div className="info-cards">
                <div className="card box-shadow ">
                  <div className="text-center card-icon ">
                    <img
                      src={require("../../img/email1.png")}
                      alt="Web Threat Protection"
                      width="100px"
                      height="100px"
                      className="light-mode"
                    />
                    <img
                      src={require("../../img/email2.png")}
                      alt="Web Threat Protection"
                      width="100px"
                      height="100px"
                      className="dark-mode"
                    />
                  </div>

                  <h2 className="text-center first-heading">
                    <span
                      className="pointer"
                      onClick={() =>
                        dispatchAction("/" + getUser + "/sme/widget/emailGuard")
                      }
                    >
                      <b>
                        Email
                        <br /> Guard{" "}
                      </b>
                    </span>
                  </h2>
                  <div className="digit text-center">
                    <div className="green-circle">
                      <div className="cell">
                        <span className="active">
                          {getData.report_data.email.available}
                        </span>
                        <div>
                          <strong>Available</strong>
                        </div>
                      </div>
                      <div className="cell">
                        <span
                          className={
                            getData && getData.report_data.email.protection == 0
                              ? "not-active"
                              : "active"
                          }
                        >
                          {getData.report_data.email.protection}
                        </span>
                        <div>
                          <strong>Protected</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-center">
                    <a
                      className="pointer"
                      onClick={() =>
                        dispatchAction("/" + getUser + "/sme/widget/emailGuard")
                      }
                    >
                      <strong>Threat intelligence</strong>
                    </a>
                  </p>
                </div>
                <a
                  className="bottom-line"
                  href="mailto: info@blockapt.com"
                  target="_blank"
                >
                  + more emails
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12 info-card-block">
              <div className="info-cards">
                <div className="card box-shadow ">
                  <div className="text-center card-icon ">
                    <img
                      src={require("../../img/vulnerability1.png")}
                      alt="Web Threat Protection"
                      width="100px"
                      className="light-mode pointer"
                    />
                    <img
                      src={require("../../img/vulnerability2.png")}
                      alt="Web Threat Protection"
                      width="100px"
                      className="dark-mode pointer"
                    />
                  </div>

                  <div className="title-status">
                    <h2
                      className="pointer  "
                      onClick={() =>
                        dispatchAction(
                          "/" + getUser + "/sme/widget/vulnerability"
                        )
                      }
                    >
                      <b>
                        Vulnerability
                        <br />
                        Management
                      </b>
                    </h2>

                    <span
                      className={
                        "server-status glowing-icon  " +
                        (getData &&
                        getData.report_data.report.device_status === "is_active"
                          ? "active green"
                          : "not-active red")
                      }
                    ></span>
                  </div>
                  <div className=" mrgn">
                    <h2>Your next scan:&nbsp;&nbsp;&nbsp;</h2>
                    <div className="date-picker bg-white">
                      {
                        getData.report_data.report
                          .next_execution_time_for_report
                      }
                    </div>
                  </div>

                  <p className="latest-report">
                    <a
                      href={
                        getData.report_data.report.latest_report_template_url
                          ? getData.report_data.report
                              .latest_report_template_url
                          : "#"
                      }
                      onClick={notify}
                    >
                      <i className="material-icons pull-left">text_snippet</i>
                    </a>{" "}
                    &nbsp;&nbsp;
                    <span
                      className="pointer"
                      onClick={() =>
                        dispatchAction(
                          "/" + getUser + "/sme/reports/vulnerability"
                        )
                      }
                    >
                      {" "}
                      Latest report
                    </span>
                  </p>
                </div>
                <a
                  className="bottom-line m-t-5"
                  href="mailto: info@blockapt.com"
                  target="_blank"
                >
                  + more scans
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Front>
  );
};

export default Home;
