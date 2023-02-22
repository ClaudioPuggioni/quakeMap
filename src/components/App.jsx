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
        [Number(latitude), Number(longitude)],
        message ? `Complete Request: ${message}` : "Awaiting message input...",
        identifier,
      ])
    );
    setReqAid(
      data.reqAid.map(({ longitude, latitude, message, identifier }) => [
        [Number(latitude), Number(longitude)],
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
    socket.on("addRequest", ({ location, message, identifier }) => {
      console.log("Location (addRequest)", location, identifier, JSON.stringify(identifier));
      setReqAid([...aided, [[location.latitude, location.longitude], message, identifier]]);
    });

    socket.on("pinDelete", ({ identifier, pinType }) => {
      if (pinType === "reqAid") {
        setReqAid(reqAid.filter((pin) => pin[2] !== identifier));
      } else if (pinType === "aided") {
        setAided(aided.filter((pin) => pin[2] !== identifier));
      }
    });

    socket.on("pinUpdate", (pin) => {
      const { identifier, latitude, longitude, pinType, message } = pin;
      console.log("pin:", pin);
      const toPin = [[Number(latitude), Number(longitude)], message, identifier];

      const idxReqAid = reqAid.findIndex((pin) => {
        console.log("idxReqAid MAP:", pin, pin[2], pin[2] === identifier);
        return pin[2] === identifier;
      });
      const idxAided = aided.findIndex((pin) => {
        console.log("idxAided MAP:", pin, pin[2], pin[2] === identifier);
        return pin[2] === identifier;
      });

      // Wrong:
      // const foundIdx =
      //   command === "/arrived"
      //     ? reqAid.find((pinObj) => pinObj.identifier === identifier)
      //     : command === "/message"
      //     ? aided.find((pinObj) => pinObj.identifier === identifier)
      //     : -1;
      console.log("idxReqAid:", idxReqAid);
      console.log("idxAided:", idxAided);

      if (pinType === "aided") {
        if (idxReqAid > -1) setReqAid(reqAid.filter((pin) => pin[2] !== identifier));
        if (idxAided > -1) {
          const aidedReference = [...aided];
          aidedReference[idxAided] = toPin;
          setAided(aidedReference);
        } else {
          setAided([...aided, toPin]);
        }
      } else if (pinType === "reqAid") {
        if (idxReqAid > -1) {
          const reqAidReference = [...reqAid];
          reqAidReference[idxReqAid] = toPin;
          setReqAid(reqAidReference);
        } else {
          setReqAid([...reqAid, toPin]);
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
