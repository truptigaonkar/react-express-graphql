import React, { useEffect, useState } from "react";

const CustomerList = () => {
  const LAUNCHES_QUERY = `
  {
    customers {
      id
      name
      age
    }
  }
`;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: LAUNCHES_QUERY }),
  };

  const [customers, setCustomers] = useState<any[]>([]);
  // const [launches, setLaunches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2000/graphql", requestOptions)
      .then((response) => response.json())
    //   .then((data) => console.log(data.data.customers));
      .then((data) => setCustomers(data.data.customers));
  }, []);

  return (
    <div>
      <h4>Customer List</h4>
      {customers.map((launch) => (
        <ul key={launch.id}>
          <li>
            {launch.id} - {launch.name} - {launch.age}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default CustomerList;
