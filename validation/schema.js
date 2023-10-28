import * as Yup from 'yup';

export const computerSchema = Yup.object().shape({
  name: Yup.string().trim().required().min(5).max(12),
  serial: Yup.string().when("uuid", {
    is: "",
    then: Yup.string().min(1, "Seriennummer darf nicht leer sein"),
    otherwise: Yup.string()
  }),
  uuid: Yup.string().uuid().when("serial", {
    is: "",
    then: Yup.string().uuid().required("UUID darf nicht leer sein"),
    otherwise: Yup.string().uuid()
  }),
  manufacturer: Yup.string().required(),
  model: Yup.string().min(3),
  mac: Yup.string()
  .matches("[0-9a-fA-F]{2}([-:]?)[0-9a-fA-F]{2}(\\1[0-9a-fA-F]{2}){4}$"),
  comment: Yup.string()
}, [["serial", "uuid"]]);
