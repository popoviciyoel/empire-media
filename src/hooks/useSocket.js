import { useEffect, useState } from "react";

import { formatDataToPercentage } from "./../utils";

let socket = new WebSocket("wss://wstest.fxempire.com?token=btctothemoon");

const useSocket = () => {
  const [time, setTime] = useState();
  const [last, setLast] = useState();
  const [change, setChange] = useState();
  const [percentChange, setPercentChange] = useState();
  useEffect(() => {
    // subsribe to socket server
    socket.onopen = (ev) => {
      const msg = { type: "SUBSCRIBE", instruments: ["s-aapl"] };
      socket.send(JSON.stringify(msg));
      console.log(socket);
    };

    socket.onmessage = (ev) => {
      const result = JSON.parse(ev.data);
      const stock = result["s-aapl"];

      setTime(new Date(stock["lastUpdate"]).toUTCString());
      setLast(formatDataToPercentage(stock["last"]));
      setChange(formatDataToPercentage(stock["change"]));
      setPercentChange(formatDataToPercentage(stock["percentChange"]));
    };
  }, []);
  return { time, last, change, percentChange };
};

export default useSocket;
