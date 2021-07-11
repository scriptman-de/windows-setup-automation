import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect, Fragment } from "react";

import ComputersTable from "components/ComputersTable";
import { HttpResponseComputerDeleteMany } from "interfaces"

function Home() {
  const [loading, setLoading] = useState(false);
  const [comps, setComps] = useState([]);

  /**
   * Load Computers
   */
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

  /**
   * Delete single computer
   * @param param0 Array of computername and serial
   */
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

  /**
   * Delete Multiple Computers by serial number
   * @param computerSerial Array of computer serial
   */
  async function multiDeleteComputer(computerSerial: string[]) {
    try {
      const res: AxiosResponse<HttpResponseComputerDeleteMany> = await axios.post("/api/v1/delete", {
        computers: computerSerial,
      });

      if (res.status === 200 && res.data.success) {
        alert(`Es wurden ${res.data.deleted.length} Computer gelöscht!`);
        setLoading(true);
        loadComputers();
      } else {
        alert(`Es sind fehler bei folgenden Computern aufgetreten\n${res.data.errors.join(",")}`);
      }
    } catch (_err) {
      alert(_err.message);
    }
  }

  useEffect(() => {
    setLoading(true);
    loadComputers();
  }, []);

  if (loading) {
    return (
      <Fragment>
        <h2 className={"text-2xl mx-2 p-2 mb-2"}>Registrierte Computer</h2>
        <p>Lade&hellip;</p>
      </Fragment>
    );
  }

  if (comps.length < 1) {
    return (
      <Fragment>
        <h2 className={"text-2xl mx-2 p-2 mb-2"}>Registrierte Computer</h2>
        <p>Keine Computer vorhanden</p>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <h2 className={"text-2xl mx-2 p-2 mb-2"}>Registrierte Computer</h2>
      <ComputersTable
        computers={comps}
        deleteComputer={deleteComputer}
        deleteMultiple={multiDeleteComputer}
      />
    </Fragment>
  );
}

export default Home;
