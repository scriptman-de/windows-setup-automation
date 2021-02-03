import { useRouter } from "next/router";
import { Formik, ErrorMessage } from "formik";
import axios from "axios";
import { computerSchema } from "../validation/schema";


export default function AddComputer() {
  const router = useRouter();

  function createComputer(values, { setSubmitting }) {
    axios
      .post("/api/v1/enable", values)
      .then((res) => {
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

  return (
    <div className={"sm:mx-auto sm:max-w-lg"}>
      <h2 className={"text-2xl mx-2 p-2 mb-2"}>
        Neuen Computer hinzufügen
      </h2>
      <Formik
        initialValues={{ name: "", mac: "", comment: "" }}
        validationSchema={computerSchema}
        onSubmit={createComputer}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col">
              <input
                type={"text"}
                name={"name"}
                placeholder={"Computername"}
                className={
                  "block border rounded mx-2 p-2 mb-2 sm:max-w-lg"
                }
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <ErrorMessage name="name" />
              <input
                type={"text"}
                name={"mac"}
                placeholder={"00:00:00:00:00:00"}
                className={
                  "block border rounded mx-2 p-2 mb-2 sm:max-w-lg"
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
                  "block border rounded mx-2 p-2 mb-2 sm:max-w-lg"
                }
                value={values.comment}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <ErrorMessage name="comment" />
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
        )}
      </Formik>
    </div>
  );
}
