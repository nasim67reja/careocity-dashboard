import React from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
// import { UpdateDate } from "../Other/Reuse";
import { useParams } from "react-router-dom";

const Chart = ({ aspect, title, filterBy }) => {
  const params = useParams();

  let Orders = useSelector((state) => state.Orders.orders);

  if (filterBy) {
    if (filterBy === "user")
      Orders = Orders?.filter((el) => el.user._id === params.userId);
    else if (filterBy === "product")
      Orders = Orders?.filter((el) => el.product._id === params.productId);
  }
  const orderDateUpdate = Orders?.map((el) => {
    const date = new Date(el.createdAt);
    const options = {
      month: "long",
    };
    const local = navigator.language;

    const formatDate = new Intl.DateTimeFormat(local, options).format(date);
    return { ...el, month: formatDate, indexMonth: date.getMonth() };
  });

  let January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December = [];

  orderDateUpdate?.forEach((order) => {
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

  const monthRevenue = (month) => {
    return month && month.length > 0
      ? month.map((el) => el.price).reduce((acc, cur) => acc + cur)
      : 0;
  };

  const januaryRevenue = monthRevenue(January);
  const februaryRevenue = monthRevenue(February);
  const marchRevenue = monthRevenue(March);
  const aprilRevenue = monthRevenue(April);
  const mayRevenue = monthRevenue(May);
  const juneRevenue = monthRevenue(June);
  const julyRevenue = monthRevenue(July);
  const augustRevenue = monthRevenue(August);
  const septemberRevenue = monthRevenue(September);
  const octoberRevenue = monthRevenue(October);
  const novemberRevenue = monthRevenue(November);
  const decemberRevenue = monthRevenue(December);

  const data = [
    { name: "January", Total: januaryRevenue },
    { name: "February", Total: februaryRevenue },
    { name: "March", Total: marchRevenue },
    { name: "April", Total: aprilRevenue },
    { name: "May", Total: mayRevenue },
    { name: "June", Total: juneRevenue },
    { name: "July", Total: julyRevenue },
    { name: "August", Total: augustRevenue },
    { name: "September", Total: septemberRevenue },
    { name: "October", Total: octoberRevenue },
    { name: "November", Total: novemberRevenue },
    { name: "December", Total: decemberRevenue },
  ];

  let date = new Date();
  date = date.getMonth();
  // date = 2;

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
        <AreaChart
          width={730}
          height={250}
          data={dataUpdate}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
