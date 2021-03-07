import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import { faPen, faTimes, faFileCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ComputersTable = ({ computers, deleteComputer }) => {
  const tableEntries = computers.map((computer) => (
    <tr key={computer.serial}>
      <td className="border border-black px-1">{computer.name}</td>
      <td className="border border-black px-1">{computer.serial}</td>
      <td className="border border-black px-1">{computer.manufacturer}</td>
      <td className="border border-black px-1">{computer.model}</td>
      <td className="border border-black px-1">{computer.mac}</td>
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
    <table className="border border-black border-collapse">
      <thead>
        <tr>
          <th className="border border-black px-1 bg-blue-300">Name</th>
          <th className="border border-black px-1 bg-blue-300">Seriennr.</th>
          <th className="border border-black px-1 bg-blue-300">Hersteller</th>
          <th className="border border-black px-1 bg-blue-300">Modell</th>
          <th className="border border-black px-1 bg-blue-300">MAC</th>
          <th className="border border-black px-1 bg-blue-300">Optionen</th>
        </tr>
      </thead>
      <tbody>{tableEntries}</tbody>
    </table>
  );
};

ComputersTable.propTypes = {
  computers: PropTypes.array.isRequired,
  deleteComputer: PropTypes.func.isRequired,
};

export default ComputersTable;
