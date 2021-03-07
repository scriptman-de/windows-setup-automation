import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import ComputersTable from "../components/ComputersTable"

function Home() {
  const [loading, setLoading] = useState(false);
  const [comps, setComps] = useState([]);

  function loadComputers() {
    try {
      axios
        .get("/api/v1/enabled")
        .then((result) => {
          if (result.status === 200) {
            setComps(result.data.computers);
          }
          setLoading(false);
        })
        .catch((err) => {
          setComps([]);
          setLoading(false);
          console.error(err.message);
        });
    } catch (e) {
      setComps([]);
    }
  }

  function deleteComputer({ name, serial }) {
    if (confirm(`${name} wirklich löschen?`)) {
      axios
        .delete(`/api/v1/${serial}/delete`)
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
    setLoading(true);
    loadComputers();
  }, []);

  if(loading) {
    return <Fragment>
      <h2 className={"text-2xl mx-2 p-2 mb-2"}>
        Registrierte Computer
      </h2>
      <p>Lade&hellip;</p>
      </Fragment>;
  }

  if (comps.length < 1) {
    return <Fragment>
      <h2 className={"text-2xl mx-2 p-2 mb-2"}>Registrierte Computer</h2>
      <p>Keine Computer vorhanden</p>
    </Fragment>;
  }

  return (
    <Fragment>
      <h2 className={"text-2xl mx-2 p-2 mb-2"}>
        Registrierte Computer
      </h2>
      <ComputersTable computers={comps} deleteComputer={deleteComputer} />
    </Fragment>
  );
}

export default Home;
