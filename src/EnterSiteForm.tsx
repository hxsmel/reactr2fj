import LoginForm from './LoginForm/LoginForm.tsx';
import RegisterForm from './RegisterForm/RegisterForm.tsx';


function Form({ formType }: { formType: "login" | "register" }) {
    return (
        <>
            {formType === "login" ? <LoginForm /> : <RegisterForm />}
        </>
    );
}


export default function EnterSiteForm() {
    return (
        <section>
            <Form formType="register" />
        </section>
    );
}