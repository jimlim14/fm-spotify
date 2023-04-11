import AuthForm from '../components/authForm';
import { NextPageContext } from 'next';

const Signin = () => {
	return <AuthForm mode='signin' />;
};

Signin.authPage = true;

export default Signin;
