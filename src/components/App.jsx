import React, { useEffect, useState } from "react";
import Map from "./Map";
import { io } from "socket.io-client";
import axios from "axios";
// const socket = io.connect("http://127.0.0.1:1111");
const socket = io.connect("https://quakebot-production.up.railway.app/");

export default function App() {
  // const [aided, setAided] = useState([[[36.65, 36.3], "Complete Request: Received NGO food payload", "01424dfk"]]);
  // const [reqAid, setReqAid] = useState([[[37, 36], "Pending Request: Need shelter and medical supplies for 3000 injured", "53u8y2o0"]]);
  const [aided, setAided] = useState([]);
  const [reqAid, setReqAid] = useState([]);

  const loadSave = async function () {
    const response = await axios({ url: "https://quakebot-production.up.railway.app/boot", method: "GET" });
    // const response = await axios.get("http://127.0.0.1:1111/boot");
    const data = await response.data;
    console.log("loadSave received:", data);
    setAided(
      data.aided.map(({ longitude, latitude, message, identifier }) => [
        [latitude, longitude],
        message ? `Complete Request: ${message}` : "Awaiting message input...",
        identifier,
      ])
    );
    setReqAid(
      data.reqAid.map(({ longitude, latitude, message, identifier }) => [
        [latitude, longitude],
        message ? `Pending Request: ${message}` : "Awaiting message input...",
        identifier,
      ])
    );
  };

  // const savePin = async function ({}) {
  //   const response = await axios.post("http://127.0.0.1:1111/addPin", { data: {} });
  //   const data = await response.data;
  //   console.log("savePin received:", data);
  // };

  useEffect(() => {
    loadSave();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("addComplete", ({ location, message, identifier }) => {
      console.log("Location (addComplete)", location);
      setAided([...aided, [[location.latitude, location.longitude], message, identifier]]);
    });
    socket.on("addRequest", ({ location, message, identifier }) => {
      console.log("Location (addRequest)", location, identifier, JSON.stringify(identifier));
      setReqAid([...aided, [[location.latitude, location.longitude], message, identifier]]);
    });
    socket.on("reqFilled", ({ location, message, identifier }) => {
      console.log("Location (reqFilled)", location);
      if (reqAid.some((request) => request[2] === identifier)) setAided(reqAid.filter((request) => request[2] !== identifier));
      setAided([...aided, [[location.latitude, location.longitude], message, identifier]]);
    });
    socket.on("pinUpdate", ({ identifier, latitude, longitude, pinType, message }) => {
      console.log("pin:", pin);
      const toPin = [[latitude, longitude], message, identifier];
      if (pinType === "aided") {
        if (aided.length > 0) {
          const foundIdx = aided.find((pinObj) => pinObj.identifier === identifier);
          if (foundIdx > -1) {
            const aidedReference = [...aided];
            aidedReference[foundIdx] = toPin;
            setAided(aidedReference);
          } else {
            setAided([...aided, toPin]);
          }
        } else {
          setAided([toPin]);
        }
      } else if (pinType === "reqAid") {
        if (reqAid.length > 0) {
          const foundIdx = reqAid.find((pinObj) => pinObj.identifier === pin.identifier);
          if (foundIdx > -1) {
            const reqAidReference = [...reqAid];
            reqAidReference[foundIdx] = toPin;
            setReqAid(reqAidReference);
          } else {
            setReqAid([...reqAid, toPin]);
          }
        } else {
          setReqAid([toPin]);
        }
      }
    });
    // eslint-disable-next-line
  }, [socket]);

  // useEffect(() => {
  //   savePin({});
  //   // eslint-disable-next-line
  // }, [aided]);

  // useEffect(() => {
  //   savePin({});
  //   // eslint-disable-next-line
  // }, [reqAid]);

  return (
    <div className="">
      <Map aided={aided} reqAid={reqAid} />
    </div>
  );
}
