import { Dispatch, SetStateAction, useState } from "react";

import { mutateFormData } from "utils/mutate";

import { Form, FormData } from "utils/types";

const useForm = (
  state: Form
): [Form, Dispatch<SetStateAction<Form>>, FormData] => {
  const [form, setForm] = useState<Form>(state);
  const data: FormData = mutateFormData(form);
  return [form, setForm, data];
};

export default useForm;
