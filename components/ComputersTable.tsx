import React, { useState, useEffect, ChangeEvent, Fragment } from "react";
import Link from "next/link";

import { faPen, faTimes, faFileCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Checkbox from "../components/Checkbox";
import { IComputersTable, IComputer } from "../interfaces";
import { exec } from "child_process";

const ComputersTable = ({
  computers,
  deleteComputer,
  deleteMultiple,
}: IComputersTable) => {
  const [isChecked, setIsChecked] = useState({});

  function getIsChecked() {
    if (computers.length === 0) return;
    const _checked = {};
    for (let cmp of computers) {
      _checked[cmp.serial] = false;
    }

    setIsChecked(_checked);
  }

  useEffect(() => {
    getIsChecked();
  }, [computers]);

  function handleChecked(e: React.ChangeEvent<HTMLInputElement>) {
    const { name } = e.target;

    let serial = name.replace("check-", "");

    setIsChecked({
      ...isChecked,
      [serial]: !isChecked[serial],
    });
  }

  function executeDelete() {
    const _toDelete: string[] = [];
    for (let i in isChecked) {
      if (isChecked[i]) _toDelete.push(i);
    }

    deleteMultiple(_toDelete);
  }

  const tableEntries = computers.map((computer: IComputer) => (
    <tr key={computer.serial}>
      <td className="border border-black px-1">
        <Checkbox
          isSelected={isChecked[computer.serial] ?? false}
          onCheckboxChange={handleChecked}
          label={computer.serial}
        />
      </td>
      <td className="border border-black px-1">{computer.name}</td>
      <td className="border border-black px-1">{computer.serial}</td>
      <td className="border border-black px-1">{computer.manufacturer}</td>
      <td className="border border-black px-1">{computer.model}</td>
      <td className="border border-black px-1">{computer.mac}</td>
      <td className="border border-black px-1">{computer.comment}</td>
      <td className="border border-black px-1">
        <span className="cursor-pointer px-1">
          <Link href={`/edit/${computer.serial}`}>
            <a>
              <FontAwesomeIcon icon={faPen} />
            </a>
          </Link>
        </span>
        <span
          className={"cursor-pointer px-1"}
          onClick={() =>
            deleteComputer({
              serial: computer.serial,
              name: computer.name,
            })
          }
        >
          <a>
            <FontAwesomeIcon icon={faTimes} />
          </a>
        </span>
        <span className="cursor-pointer px-1">
          <a
            href={`/api/v1/unattend?serial=${computer.serial}`}
            target="_blank"
          >
            <FontAwesomeIcon icon={faFileCode} />
          </a>
        </span>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <button
        className="rounded bg-red-600 border-red-300 border-2 text-white hover:bg-red-500 my-2 p-1"
        onClick={executeDelete}
      >
        Markierte Löschen
      </button>
      <table className="border border-black border-collapse">
        <thead>
          <tr>
            <th className="border border-black px-1 bg-blue-300">C</th>
            <th className="border border-black px-1 bg-blue-300">Name</th>
            <th className="border border-black px-1 bg-blue-300">Seriennr.</th>
            <th className="border border-black px-1 bg-blue-300">Hersteller</th>
            <th className="border border-black px-1 bg-blue-300">Modell</th>
            <th className="border border-black px-1 bg-blue-300">MAC</th>
            <th className="border border-black px-1 bg-blue-300">Kommentar</th>
            <th className="border border-black px-1 bg-blue-300">Optionen</th>
          </tr>
        </thead>
        <tbody>{tableEntries}</tbody>
      </table>
    </Fragment>
  );
};

export default ComputersTable;
