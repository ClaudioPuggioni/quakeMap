import React, { useEffect, useRef, useState } from "react";
import Map from "./Map";
import { io } from "socket.io-client";
import axios from "axios";
// const socket = io.connect("http://127.0.0.1:1111");
const socket = io.connect("https://terminalbot-production.up.railway.app/");

export default function App() {
  // const [aided, setAided] = useState([[[36.65, 36.3], "Complete Request: Received NGO food payload", "01424dfk"]]);
  // const [reqAid, setReqAid] = useState([[[37, 36], "Pending Request: Need shelter and medical supplies for 3000 injured", "53u8y2o0"]]);
  const [aided, setAided] = useState([]);
  const [reqAid, setReqAid] = useState([]);
  const [language, setLanguage] = useState("tr");

  const aidedRef = useRef([]);
  const reqAidRef = useRef([]);

  const handleSelect = function (selected) {
    console.log(selected);
    setLanguage(selected);
  };

  const loadSave = async function () {
    const response = await axios({ url: "https://terminalbot-production.up.railway.app/boot", method: "GET" });
    // const response = await axios.get("http://127.0.0.1:1111/boot");
    const data = await response.data;
    console.log("loadSave received:", data);
    setAided(
      data.aided.map(({ longitude, latitude, aidAmount, aidType, identifier }) => [
        [Number(latitude), Number(longitude)],
        aidAmount,
        aidType,
        identifier,
        // aidAmount && aidType
        //   ? `\n${language === "tr" ? "Tamamlanan İstek" : language === "en" ? "Completed Request" : "ERROR"}: ${
        //       amntTable[language][aidAmount]
        //     } ${aidType} ${language === "tr" ? "TEDARİK EDİLEN" : language === "en" ? "PROVIDED" : "ERROR"}.`
        //   : "ERROR",
      ])
    );
    setReqAid(
      data.reqAid.map(({ longitude, latitude, aidAmount, aidType, identifier }) => [
        [Number(latitude), Number(longitude)],
        aidAmount,
        aidType,
        identifier,
        // message ? `Pending Request: ${message}` : "Awaiting message input...",
        // aidAmount && aidType
        //   ? `\n${language === "tr" ? "Bekleyen İstek" : language === "en" ? "Pending Request" : "ERROR"}: ${amntTable[language][aidAmount]} ${aidType} ${
        //       language === "tr" ? "TALEP EDİLEN" : language === "en" ? "REQUESTED" : "ERROR"
        //     }.`
        //   : "ERROR",
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
    console.log("USEEFFECT-REQAID:", reqAid);
    reqAidRef.current = reqAid;
    // eslint-enable-next-line
  }, [reqAid]);
  useEffect(() => {
    console.log("USEEFFECT-AIDED:", aided);
    aidedRef.current = aided;
    // eslint-enable-next-line
  }, [aided]);

  useEffect(() => {
    // socket.on("addRequest", ({ location, message, identifier }) => {
    socket.on("addRequest", ({ identifier, longitude, latitude, aidAmount, aidType, pinType }) => {
      console.log("Location (addRequest)", longitude, latitude, aidAmount, aidType, identifier);
      if (pinType === "reqAid") setReqAid([...reqAid, [[Number(latitude), Number(longitude)], aidAmount, aidType, identifier]]);
      if (pinType === "aided") setAided([...aided, [[Number(latitude), Number(longitude)], aidAmount, aidType, identifier]]);
    });

    socket.on("pinDelete", ({ identifier, pinType }) => {
      if (pinType === "reqAid") {
        setReqAid(reqAid.filter((pin) => pin[2] !== identifier));
      } else if (pinType === "aided") {
        setAided(aided.filter((pin) => pin[2] !== identifier));
      }
    });

    socket.on("pinUpdate", (pin) => {
      const { latitude, longitude, pinType, aidAmount, aidType, identifier } = pin;
      console.log("pin:", pin);
      const toPin = [[Number(latitude), Number(longitude)], aidAmount, aidType, identifier];

      // idxReqAid - reqAid
      console.log("reqAid-pinUpdate:", [...reqAidRef.current]);
      const idxReqAid = [...reqAidRef.current].findIndex((pinElement) => {
        console.log("ping idxReqAid");
        console.log("idxReqAid MAP:", pinElement, pinElement[2], pinElement[2] === identifier);
        return pinElement[2] === identifier;
      });
      console.log("idxReqAid:", idxReqAid);

      // idxAided - aided
      console.log("aided-pinUpdate:", [...aidedRef.current]);
      const idxAided = [...aidedRef.current].findIndex((pinElement) => {
        console.log("ping idxAided");
        console.log("idxAided MAP:", pinElement, pinElement[2], pinElement[2] === identifier);
        return pinElement[2] === identifier;
      });
      console.log("idxAided:", idxAided);
      // Wrong:
      // const foundIdx =
      //   command === "/arrived"
      //     ? reqAid.find((pinObj) => pinObj.identifier === identifier)
      //     : command === "/message"
      //     ? aided.find((pinObj) => pinObj.identifier === identifier)
      //     : -1;

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
      <Map aided={aided} reqAid={reqAid} language={language} handleSelect={handleSelect} />
    </div>
  );
}
