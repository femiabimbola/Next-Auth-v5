export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    console.log(body);
  } catch (error) {}
};
