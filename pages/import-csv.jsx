import React, { useState, Fragment } from "react";
import PapaParse from "papaparse";

export default function ImportCsv() {
  const [csvParsed, setCsvParsed] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOnFileInputChange = (e) => {
    const _file = e.target.files;
    const reader = new FileReader();

    if (0 < _file.length) {
      setLoading(true);
      const onError = (e) => {
        console.log(e);
      };

      reader.onload = (e) => {
        let csvData = PapaParse.parse(reader.result, {
          error: onError,
          header: true,
          skipEmptyLines: true,
        });

        // set imported marker
        for (let entry in csvData.data) {
          if (csvData.data.hasOwnProperty(entry)) {
            csvData.data[entry].imported = false;
          }
        }

        csvData.data = csvData.data.filter(
          (item) => item.SERIALNUMBER !== "" && item.MAC !== ""
        );

        console.log(csvData);

        setCsvParsed(csvData);
        setLoading(false);
      };

      reader.readAsText(_file[0], "UTF-8");
    }
  };

  const executeImport = () => {
    // noop
  };

  return (
    <div className="sm:container sm:mx-auto">
      <h2 className="text-2xl mx-2 p-2 mb-2">CSV-Import</h2>
      <div>
        <button
          className="bg-blue-700 hover:bg-blue-600 p-1 text-white rounded m-1 border border-black-800"
          onClick={executeImport}
        >
          Importieren
        </button>
        <input
          type="file"
          multiple={false}
          accept=".csv, text/csv"
          onChange={handleOnFileInputChange}
        />
      </div>
      <div className="overflow-x-scroll">
        {!csvParsed.data ? (
          <p className="text-red-900">
            Bitte Datei zum einlesen auswählen&hellip;
          </p>
        ) : (
          <table className="table-auto border border-gray-800">
            <thead>
              <tr>
                {csvParsed.meta.fields.map((field) => (
                  <td key={field} className="border border-gray-800">
                    {field}
                  </td>
                ))}
                <td>Importiert</td>
              </tr>
            </thead>
            <tbody>
              {csvParsed.data.map((row) => (
                <tr key={row.MAC} className="border border-gray-800">
                  <td className="border border-gray-800">{row.NAME}</td>
                  <td className="border border-gray-800">{row.MAC}</td>
                  <td className="border border-gray-800">
                    {row.BIOSSERIALNUMBER}
                  </td>
                  <td className="border border-gray-800">
                    {row.CMPHERSTELLER}
                  </td>
                  <td className="border border-gray-800">{row.CMPMODELL}</td>
                  <td className="border border-gray-800">
                    {row.imported ? "JA" : "NEIN"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
