import PageMeta from "../../components/common/PageMeta";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="SmartEDU"
        description="SmartEdu plateforme educative"
      />
        <SignInForm />
    </>
  );
}
