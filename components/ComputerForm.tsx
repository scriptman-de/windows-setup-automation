import {Formik, ErrorMessage} from 'formik';
import {computerSchema} from '../validation/schema';

export default function ComputerForm({computerInformation, submitFunction, editMode = false}) {
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
                <ErrorMessage name="name">
                    {(msg) => (
                        <div
                            className={
                                "text-white bg-red-600 border-1 border-red rounded p-1 mx-2 mb-2"
                            }
                        >
                            Kein gültiger Name: {msg}
                        </div>
                    )}
                </ErrorMessage>
                <input
                    type="text"
                    name="serial"
                    placeholder="Seriennummer"
                    className="block border rounded mx-2 p-2 mb-2 sm:max-w-lg dark:text-black disabled:bg-gray-50 disabled:text-gray-300"
                    value={values.serial}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={editMode}
                />
                <ErrorMessage name="serial">
                    {(msg) => (
                        <div
                            className={
                                "text-white bg-red-600 border-1 border-red rounded p-1 mx-2 mb-2"
                            }
                        >
                            Seriennummer überprüfen: {msg}
                        </div>
                    )}
                </ErrorMessage>
                <input
                    type="text"
                    name="manufacturer"
                    placeholder="Hersteller"
                    className="block border rounded mx-2 p-2 mb-2 sm:max-w-lg dark:text-black disabled:bg-gray-50 disabled:text-gray-300"
                    value={values.manufacturer}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={editMode}
                />
                <ErrorMessage name="manufacturer" />
                <input
                    type="text"
                    name="model"
                    placeholder="Modellbezeichnung"
                    className="block border rounded mx-2 p-2 mb-2 sm:max-w-lg dark:text-black disabled:bg-gray-50 disabled:text-gray-300"
                    value={values.model}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={editMode}
                />
                <ErrorMessage name="model" />
                <input
                    type={"text"}
                    name={"mac"}
                    placeholder={"00:00:00:00:00:00"}
                    className={
                        "block border rounded mx-2 p-2 mb-2 sm:max-w-lg dark:text-black disabled:bg-gray-50 disabled:text-gray-300"
                    }
                    value={values.mac}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={editMode}
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
