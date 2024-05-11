import { Box } from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

let url = import.meta.env.VITE_DEPLOYED_URL + "/recipes";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const res = await Axios.get(url);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <Box></Box>;
};

export default Dashboard;
