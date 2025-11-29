import AuthLayouts from "../components/Layout/AuthLayouts";
import FormRegister from "../components/Fragments/FormRegister.jsx";
import NavBar from "../components/Layout/NavBar.jsx";

const RegisterPage = () => {
  return (
    <div className="bg-movie-2 bg-cover bg-center h-screen">
      <NavBar></NavBar>
      <AuthLayouts tittle="Register" type="register">
        <FormRegister />
      </AuthLayouts>
    </div>
  );
};

export default RegisterPage;
