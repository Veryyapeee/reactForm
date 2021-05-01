import { Dispatch, SetStateAction, useState } from "react";

import { mutateToAxios } from "utils/onChangeForm";

import { Form, FormData } from "utils/types";

const useForm = (
  state: Form
): [Form, Dispatch<SetStateAction<Form>>, FormData] => {
  const [form, setForm] = useState<Form>(state);
  const data: FormData = mutateToAxios(form);
  return [form, setForm, data];
};

export default useForm;
