import { Link } from "react-router-dom";

const AuthLayouts = (props) => {
  const { children, tittle, type } = props;
  return (
    <div className="flex justify-center gap-3 items-center min-h-screen ">
      <div className="w-full max-w-md bg-[#1b1b1bdc] p-8 rounded-2xl text-white space-y-6 mx-auto">
        <h1 className="text-white-500 font-bold text-3xl mb-3">{tittle}</h1>
        <p className="mb-4">Welcome, Please enter your details</p>
        {children}
        <p className="text-sm text-center mt-2">
          {type === "login"
            ? "Don't have an account? "
            : "Already an account? "}
          {type === "login" && (
            <Link to="/register" className="font-bold text-blue-600">
              Register
            </Link>
          )}
          {type === "register" && (
            <Link to="/login" className="font-bold text-blue-600">
              Login
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthLayouts;
