import * as Yup from 'yup';

export const computerSchema = Yup.object().shape({
  name: Yup.string().required().min(5).max(12),
  serial: Yup.string().required().min(3),
  manufacturer: Yup.string().min(3),
  model: Yup.string().min(3),
  mac: Yup.string()
  .matches("[0-9a-fA-F]{2}([-:]?)[0-9a-fA-F]{2}(\\1[0-9a-fA-F]{2}){4}$"),
  comment: Yup.string()
});
