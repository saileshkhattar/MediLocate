import AuthForm from "../../Components/AuthForm";

const UserAuth = () => (
  <AuthForm
    title="MediLocate – User Portal"
    subtitle="Login / Signup as a User"
    signupFields={[{ label: "Name", name: "name" }]}
    apiEndpoints={{
      login: "http://localhost:5000/auth/user/login",
      signup: "http://localhost:5000/auth/user/register",
    }}
    redirect="/home"
    switchText="Are you a pharmacy?"
    switchLink="/pharmacy-auth"
  />
);

export default UserAuth;
