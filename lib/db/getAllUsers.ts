export const getAllUsers = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-users`);
  //   const data = await response.json();
  console.log("All users data from fn:", { response });
  return response;
};
