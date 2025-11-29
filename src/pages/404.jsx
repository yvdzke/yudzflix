import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError;
  return (
    <div className="flex justify-center flex-col items-center min-h-screen">
      <h1 className="text-3xl font-bold">Oppss!!!</h1>
      <p className="my-5 text-xl">Sorry, an unexpected has accored</p>
      <p>{error.statustext || error.message}</p>
    </div>
  );
};

export default ErrorPage;
