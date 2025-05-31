// registerHelper.ts
import axios from "axios";

export const registerUser = async (form: {
  email: string;
  password: string;
  fullName: string;
}) => {
  const response = await axios.post("/api/register", form);
  return response.data;
};

// clear out all fields
export const clearFields = (
  setters: React.Dispatch<React.SetStateAction<string>>[]
) => {
  setters.forEach((setter) => setter(""));
};
