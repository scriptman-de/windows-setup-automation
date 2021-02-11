import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';

import ComputerForm from '../../components/ComputerForm';

function EditInformation() {
  const router = useRouter();
  const {mac} = router.query;
  const [information, setInformation] = useState({});

  function getInformation() {
    if (mac === undefined) return;

    axios.get(`/api/v1/${mac}`).
        then(res => setInformation(res.data.computer)).
        catch(err => {
          console.log(err);
          return alert(err.message);
        });
  };

  useEffect(() => {
    getInformation();
  }, [mac]);

  function editComputer(values, {setSubmitting}) {
    setSubmitting(true);

    axios.post(`/api/v1/${mac}/edit`, values).then((res) => {
      setSubmitting(false);
      if (res.data.success) {
        return router.push('/');
      } else {
        alert(res.data.message);
      }
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  if (!information.hasOwnProperty('mac') || mac === undefined) {
    return <div><p>Laden...</p></div>;
  }

  return (
      <div className={'sm:mx-auto sm:max-w-lg'}>
        <h2 className={'text-2xl mx-2 p-2 mb-2'}>
          Computer bearbeiten
        </h2>
        <ComputerForm
            computerInformation={information}
            submitFunction={editComputer}/>
      </div>
  );
}

export default EditInformation;
