import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";

const DashboardPage = () => {
	const { user, logout } = useAuthStore();

	const handleLogout = () => {
		logout();
	};

	return (
		<div className='min-h-screen bg-gradient-to-r from-[#005C97] to-[#00F260] flex items-center justify-center'>
			<div className='max-w-md w-full mx-auto p-8 bg-[#005C97] bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-[#005C97]'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#005C97] to-[#00F260] text-transparent bg-clip-text'>
					Dashboard
				</h2>

				<div className='space-y-6'>
					<div className='p-4 bg-[#005C97] bg-opacity-50 rounded-lg border border-[#00F260]'>
						<h3 className='text-xl font-semibold text-[#00F260] mb-3'>Profile Information</h3>
						<p className='text-white'>Name: {user.name}</p>
						<p className='text-white'>Email: {user.email}</p>
					</div>
					<div className='p-4 bg-[#005C97] bg-opacity-50 rounded-lg border border-[#00F260]'>
						<h3 className='text-xl font-semibold text-[#00F260] mb-3'>Account Activity</h3>
						<p className='text-white'>
							<span className='font-bold'>Joined: </span>
							{new Date(user.createdAt).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</p>
						<p className='text-white'>
							<span className='font-bold'>Last Login: </span>
							{formatDate(user.lastLogin)}
						</p>
					</div>
				</div>

				<div className='mt-4 flex justify-center'>
					<button
						onClick={handleLogout}
						className='w-full py-3 px-4 bg-gradient-to-r from-[#00F260] to-[#005C97] text-white 
					font-bold rounded-lg shadow-lg hover:from-[#005C97] hover:to-[#00F260]
					 focus:outline-none focus:ring-2 focus:ring-[#00F260] focus:ring-offset-2 focus:ring-offset-[#005C97]'
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
