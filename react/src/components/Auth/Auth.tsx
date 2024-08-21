import AuthForm from "./AuthForm.tsx";

const Auth = () => {
	return (
		<div>
			<div className='flex justify-center items-center min-h-screen bg-slate-100'>
				<div className='absolute inset-0 flex flex-col'>
					<div className='h-2/5 bg-slate-800' />
				</div>
				<div className='relative flex justify-center items-center min-h-screen'>
					<AuthForm />
				</div>
			</div>
		</div>
	);
};

export default Auth;
