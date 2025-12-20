import AuthLayouts from "../components/Layout/AuthLayouts";
import FormLogin from "../components/Fragments/FormLogin.jsx";
import NavBar from "../components/Layout/NavBar.jsx";

const LoginPage = () => {
  return (
    <div className="bg-login bg-cover bg-center h-screen">
      <NavBar></NavBar>
      <AuthLayouts tittle="Login" type="login">
        <FormLogin />
      </AuthLayouts>
    </div>
  );
};

export default LoginPage;
