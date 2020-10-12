import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import runner from "./assets/runner1.png";

function App() {
  //states for initialisation
  const [data, setData] = useState([]);
  const [sortName, setsortName] = useState("sort");
  const [sortByAgeName, setSortByAgeName] = useState("Age");
  const [sortOption, setSortOption] = useState("");
  const [ageOption, setAgeOption] = useState("");

  useEffect(() => {
    //get data from express backend
    Axios.get(`http://localhost:3001/api/get/avg_pace`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
    //default sort by avg_pace
    setSortOption("avg_pace");
  }, []);

  //to get sorted data from express server by SQL statements
  const getSortedData = (sortBy) => {
    Axios.get(`http://localhost:3001/api/get/${sortBy}`)
      .then((response, err) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };

  //divided into small function to get rid of mess code
  const menuToggle = () => {
    const toggleMenu = document.querySelector(".toggleMenu");
    const navigation = document.querySelector(".navigation");

    toggleMenu.classList.toggle("active");
    navigation.classList.toggle("active");
  };

  //divided into small function to get rid of mess code
  const header = () => {
    return (
      <header data-testid="header">
        <a href="/#" className="logo">
          HEROGİ
        </a>
        <div className="toggleMenu" onClick={() => menuToggle()}></div>
        <ul className="navigation">
          <li>
            <a href="/#">Home</a>
          </li>
          <li>
            <a href="/#">About me</a>
          </li>
          <li>
            <a href="/#">Work</a>
          </li>
          <li>
            <a href="/#">Contact</a>
          </li>
        </ul>
      </header>
    );
  };

  //divided into small function to get rid of mess code
  const background = () => {
    return (
      <div data-testid="background" className="custom-shape-divider-bottom-1602259178">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    );
  };

  //divided into small function to get rid of mess code
  const tableMenu = () => {
    return (
      <div data-testid="tableMenu">
        <nav id="navigation">
          <ul className="links" style={{ float: "left" }}>
            <li className="dropdown">
              <a href="/#" className="trigger-drop">
                RunnersLeaderboard<i className="arrow"></i>
              </a>
            </li>
          </ul>

          <ul className="links">
            <li className="dropdown">
              <a href="/#" className="trigger-drop">
                {sortName}
                <i className="arrow"></i>
              </a>
              <ul className="drop">
                <li>
                  <a
                    href="/#"
                    onClick={() => {
                      setSortOption("avg_pace");
                      getSortedData(`avg_pace,${ageOption}`);
                      setsortName("Avg Pace");
                    }}
                  >
                    Avg Pace
                  </a>
                </li>

                <li>
                  <a
                    href="/#"
                    onClick={() => {
                      setSortOption("distance");
                      getSortedData(`distance,${ageOption}`);
                      setsortName("Distance");
                    }}
                  >
                    Distance
                  </a>
                </li>
                <li>
                  <a
                    href="/#"
                    onClick={() => {
                      
                      setSortOption("total_time");
                      getSortedData(`total_time,${ageOption}`);
                      setsortName("Total Time");
                    }}
                  >
                    Total Time
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <nav id="navigation">
          <ul className="links">
            <li className="dropdown">
              <a href="/#" className="trigger-drop">
                {sortByAgeName}
                <i className="arrow"></i>
              </a>
              <ul className="drop">
                <li
                  onClick={() => {
                    setAgeOption("");
                    getSortedData(`avg_pace,`);
                    setSortByAgeName("Age");
                  }}
                >
                  <a href="/#">Remove</a>
                </li>
                <li
                  onClick={() => {
                    setAgeOption("20-30");
                    getSortedData(`${sortOption},20-30`);
                    setSortByAgeName("20-30");
                  }}
                >
                  <a href="/#">20-30</a>
                </li>
                <li
                  onClick={() => {
                    setAgeOption("30-40");
                    getSortedData(`${sortOption},30-40`);
                    setSortByAgeName("30-40");
                  }}
                >
                  <a href="/#">30-40</a>
                </li>
                <li
                  onClick={() => {
                    setAgeOption("40-60");
                    getSortedData(`${sortOption},40-60`);
                    setSortByAgeName("40-60");
                  }}
                >
                  <a href="/#">40-60</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    );
  };

  return (
    <div data-testid="mainReturn">
      <div>
        <section className="sec">
          {/* render header  function*/}
          {header()}

          <div className="content">
            {/* render header  function*/}
            {tableMenu()}

            <table className="rwd-table">
              <tbody>
                <tr>
                  <th>Username</th>
                  <th>age</th>
                  <th>distance</th>
                  <th>avg-pace</th>
                  <th>total time</th>
                </tr>
            

              {/* return data to table */}
              {Object.values(data).map((item, index) => (
                <tr key={index}>
                  <td data-th="Username">{item.username} </td>
                  <td data-th="age">{item.age}</td>
                  <td data-th="distance">{item.distance}</td>
                  <td data-th="avg-pace">{item.avg_pace.toFixed(2)}</td>
                  <td data-th="total-time">{item.total_time}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>

          {/* background render function */}
          {background()}
          <img alt='runner_girl' className="girl" src={runner}></img>
        </section>
      </div>
    </div>
  );
}

export default App;
