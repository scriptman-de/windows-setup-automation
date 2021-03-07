import {useRouter} from 'next/router';
import {Formik, ErrorMessage} from 'formik';
import axios from 'axios';
import {computerSchema} from '../validation/schema';
import ComputerForm from '../components/ComputerForm';

export default function AddComputer() {
  const router = useRouter();

  function createComputer(values, {setSubmitting}) {
    axios.post('/api/v1/enable', values).then((res) => {
      if (res.data.success) {
        return router.push('/');
      } else {
        alert(res.data.message);
      }
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  return (
      <div className={'sm:mx-auto sm:max-w-lg'}>
        <h2 className={'text-2xl mx-2 p-2 mb-2'}>
          Neuen Computer hinzufügen
        </h2>
        <ComputerForm computerInformation={{name: '', mac: '', comment: ''}}
                      submitFunction={createComputer}/>
      </div>
  );
}
