import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {setIn} from "formik";

function EditInformation() {
  const router = useRouter();
  const {mac} = router.query;
  const [information, setInformation] = useState({});

  const getInformation = () => {
    try {
      const _infos = axios.get(`/api/v1/get-config?mac=${mac}`);
      console.log(_info);
      setInformation(_info)
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getInformation();
  }, []);


  if(!information) {
    return <div><p>Loading...</p></div>
  }

  return (
    <div>
      <h1>This is the edit from {mac}</h1>
    </div>
  );
}

export default EditInformation;
