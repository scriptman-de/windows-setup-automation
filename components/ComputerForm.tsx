import {Formik, ErrorMessage} from 'formik';
import {computerSchema} from '../validation/schema';

export default function ComputerForm({computerInformation, submitFunction}) {
    return (<Formik initialValues={computerInformation} validationSchema={computerSchema}
                    onSubmit={submitFunction}>{({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
      }) => (
        <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col">
                <input
                    type={"text"}
                    name={"name"}
                    placeholder={"Computername"}
                    className={
                        "block border rounded mx-2 p-2 mb-2 sm:max-w-lg dark:text-black "
                    }
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                <ErrorMessage name="name"/>
                <input
                    type={"text"}
                    name={"mac"}
                    placeholder={"00:00:00:00:00:00"}
                    className={
                        "block border rounded mx-2 p-2 mb-2 sm:max-w-lg dark:text-black "
                    }
                    value={values.mac}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                <ErrorMessage name="mac">
                    {(msg) => (
                        <div
                            className={
                                "text-white bg-red-600 border-1 border-red rounded p-1 mx-2 mb-2"
                            }
                        >
                            Keine gültige MAC
                        </div>
                    )}
                </ErrorMessage>
                <input
                    type={"text"}
                    name={"comment"}
                    placeholder={"Kommentar (optional)"}
                    className={
                        "block border rounded mx-2 p-2 mb-2 sm:max-w-lg dark:text-black"
                    }
                    value={values.comment}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                <ErrorMessage name="comment"/>
                <button
                    type={"submit"}
                    className={
                        "rounded bg-blue-500 border-blue-300 border-2 text-gray-50 hover:bg-blue-400 mx-2 p-2 sm:max-w-lg"
                    }
                >
                    Speichern
                </button>
            </div>
        </form>
    )}</Formik>)
}
