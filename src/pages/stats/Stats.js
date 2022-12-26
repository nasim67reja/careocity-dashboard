import React from "react";
import { useSelector } from "react-redux";

import {
  CartesianGrid,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import Chart from "../../components/chart/Chart";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./stats.scss";

const UserStats = ({ aspect, title }) => {
  const users = useSelector((state) => state.Users.users);

  const usersUpdateDate = users?.map((el) => {
    const date = new Date(el.createdAt);
    const options = {
      month: "long",
    };
    const local = navigator.language;

    const formatDate = new Intl.DateTimeFormat(local, options).format(date);
    return { ...el, month: formatDate, indexMonth: date.getMonth() };
  });

  let January = [];
  let February = [];
  let March = [];
  let April = [];
  let May = [];
  let June = [];
  let July = [];
  let August = [];
  let September = [];
  let October = [];
  let November = [];
  let December = [];

  usersUpdateDate?.forEach((order) => {
    order.indexMonth === 0
      ? January.push(order)
      : order.indexMonth === 1
      ? February.push(order)
      : order.indexMonth === 2
      ? March.push(order)
      : order.indexMonth === 3
      ? April.push(order)
      : order.indexMonth === 4
      ? May.push(order)
      : order.indexMonth === 5
      ? June.push(order)
      : order.indexMonth === 6
      ? July.push(order)
      : order.indexMonth === 7
      ? August.push(order)
      : order.indexMonth === 8
      ? September.push(order)
      : order.indexMonth === 9
      ? October.push(order)
      : order.indexMonth === 10
      ? November.push(order)
      : December.push(order);
  });

  const data = [
    { Month: "January", user: January.length },
    { Month: "February", user: February.length },
    { Month: "March", user: March.length },
    { Month: "April", user: April.length },
    { Month: "May", user: May.length },
    { Month: "June", user: June.length },
    { Month: "July", user: July.length },
    { Month: "August", user: August.length },
    { Month: "September", user: September.length },
    { Month: "October", user: October.length },
    { Month: "November", user: November.length },
    { Month: "December", user: December.length },
  ];
  let date = new Date();
  date = date.getMonth();

  let dataUpdate = data.filter((el, i) => {
    if (date > 5) return i <= date && date - 6 < i;
    else {
      return date + 6 < i;
    }
  });
  if (date < 6)
    data.forEach((el, i) => {
      if (date + 1 > i) dataUpdate.push(el);
    });

  return (
    <div className="chart">
      <div className="title">{title}</div>

      <ResponsiveContainer width="100%" aspect={aspect}>
        <LineChart
          width={730}
          height={250}
          data={dataUpdate}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="user" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const ProductStats = ({ title, aspect }) => {
  const data = [
    {
      name: "Page A",
      pv: 2400,
    },
    {
      name: "Page B",
      pv: 1398,
    },
    {
      name: "Page C",
      pv: 9800,
    },
    {
      name: "Page D",
      pv: 3908,
    },
    {
      name: "Page E",
      pv: 4800,
    },
    {
      name: "Page F",
      pv: 3800,
    },
    {
      name: "Page G",
      pv: 4300,
    },
  ];

  return (
    <div className="chart">
      <div className="title">{title}</div>

      <ResponsiveContainer width="100%" aspect={aspect}>
        <BarChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="pv" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const Stats = () => {
  return (
    <div className="stats">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="charts">
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
          <UserStats title="Last 6 Months User stats" aspect={2 / 1} />
        </div>
        <div className="charts">
          <ProductStats
            title="Last 6 Months Product stats (top rated)"
            aspect={2 / 1}
          />
          <ProductStats title="Last 6 Months User stats" aspect={2 / 1} />
        </div>
      </div>
    </div>
  );
};

export default Stats;
