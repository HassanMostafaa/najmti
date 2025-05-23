/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const InternalEndpointLoginRequest = async (formData: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      email: formData.email,
      password: formData.password,
    });
    return res;
  } catch (error: any) {
    return error;
  }
};
