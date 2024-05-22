import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  return (
    <div>
      <h1>Oops!!</h1>
      <h1>Something went worng!!</h1>
      <h3>
        {err.status}: {err.statusText}
      </h3>
    </div>
  );
};

export default Error;
