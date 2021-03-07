import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import ComputerForm from "../../components/ComputerForm";

function EditInformation() {
  const router = useRouter();
  const { serial } = router.query;
  const [information, setInformation] = useState({});

  function getInformation() {
    if (serial === undefined) return;

    axios
      .get(`/api/v1/${serial}`)
      .then((res) => setInformation(res.data.computer))
      .catch((err) => {
        console.log(err);
        return alert(err.message);
      });
  }

  useEffect(() => {
    getInformation();
  }, [serial]);

  function editComputer(values, { setSubmitting }) {
    setSubmitting(true);

    axios
      .post(`/api/v1/${serial}/edit`, values)
      .then((res) => {
        setSubmitting(false);
        if (res.data.success) {
          return router.push("/");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }

  if (!information.hasOwnProperty("serial") || serial === undefined) {
    return (
      <div className={"sm:mx-auto sm:max-w-lg"}>
        <h2 className={"text-2xl mx-2 p-2 mb-2"}>Computer bearbeiten</h2>
        <p>Laden...</p>
      </div>
    );
  }

  return (
    <div className={"sm:mx-auto sm:max-w-lg"}>
      <h2 className={"text-2xl mx-2 p-2 mb-2"}>Computer bearbeiten</h2>
      <ComputerForm
        computerInformation={information}
        submitFunction={editComputer}
        editMode={true}
      />
    </div>
  );
}

export default EditInformation;
