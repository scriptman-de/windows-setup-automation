import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";

import {faPen, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function Home() {
  const [comps, setComps] = useState([]);

  function loadComputers() {
    try {
      axios
        .get("/api/v1/enabled")
        .then((result) => {
          if (result.status === 200) {
            setComps(result.data.computers);
          }
        })
        .error((err) => {
          setComps([]);
          console.error(err.message);
        });
    } catch (e) {
      setComps([]);
    }
  }

  function deleteComputer({ name, mac }) {
    if (confirm(`${name} wirklich löschen?`)) {
      axios
        .delete(`/api/v1/${mac}/delete`)
        .then((result) => {
          if (result.status === 200) {
            loadComputers();
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }

  useEffect(() => {
    loadComputers();
  }, []);

  if (comps.length < 1) {
    return <div>Keine Computer vorhanden</div>;
  }

  return (
    <Fragment>
      <h2 className={"text-2xl mx-2 p-2 mb-2"}>
        Registrierte Computer
      </h2>
      {comps.map((computer) => (
        <div
          key={computer.id}
          className={
            "relative border rounded border-blue-500 bg-blue-200 text-gray-600 mx-4 p-2 mb-2  sm:max-w-lg sm:mx-auto"
          }
        >
          <p className={"text-lg"}>
            {computer.name} ({computer.mac})
          </p>
          <p className={"text-sm text-gray-400"}>
            {computer.comment}
          </p>
          <span
            className={
              "absolute bottom-0 right-0 m-2 cursor-pointer p-0"
            }
            onClick={() => deleteComputer({
              mac: computer.mac,
              name: computer.name
            })}
          ><a><FontAwesomeIcon icon={faTimes} /></a></span>
          <span className="absolute top-0 right-0 m-2 cursor-pointer p-0">
            <Link href={`/edit/${computer.mac}`}><a><FontAwesomeIcon icon={faPen} /></a></Link>
          </span>
        </div>
      ))}
    </Fragment>
  );
}

export default Home;
