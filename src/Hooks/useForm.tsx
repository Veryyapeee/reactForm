import { useState } from "react";

import {
  mutateToAxios,
  onChangeForm,
  mutateState,
  wholeFormValidity,
  validation,
} from "utils/onChangeForm";

const useForm = (state: any) => {
  const [form, setForm] = useState(state);
  const data: any = mutateToAxios(form);
  return [form, setForm, data];
};

export default useForm;
