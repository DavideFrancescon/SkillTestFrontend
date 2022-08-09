import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser, addJwt } from "redux/userReducer";
import { useDispatch } from "react-redux";

const Login: React.FC = () => {
	const [seePassword, setSeePassword] = useState<boolean>(false);
	const url: string | undefined = process.env.REACT_APP_URLBACK;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { handleSubmit, control } = useForm({
		defaultValues: {
			email: "",
			password: "",
			name: "",
		},
	});
	interface SignUpForm {
		email: string;
		password: string;
		name: string;
	}

	const onSubmit = (data: SignUpForm) => {
		console.log(data);
		axios
			.post(url + "/auth/signup", {
				email: data.email,
				password: data.password,
				name: data.name,
			})
			.then((response) => {
				navigate("/login");
			});
	};

	return (
		<div className='m-auto w-[100vw] h-[100%] overflow-hidden'>
			<div className="m-auto w-fit h-fit block">
				<Card className='flex flex-col w-[36rem] h-fit pt-20'>
					<CardContent className='flex flex-col m-auto w-full h-auto gap-y-10 p-30'>
						<Typography variant='h2' className='text-center	'>
							Sign up
						</Typography>

						<div className='flex flex-col gap-y-10'>
							<Controller
								name={"email"}
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className='flex flex-row m-auto w-3/5'>
										<TextField
											onChange={onChange}
											value={value}
											label={"Mail"}
											className='w-full'
											variant='outlined'
											type='email'
										/>
									</div>
								)}
							/>
							<Controller
								name={"name"}
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className='flex flex-row m-auto w-3/5'>
										<TextField
											onChange={onChange}
											value={value}
											label={"Name"}
											className='w-full'
											variant='outlined'
											type='name'
										/>
									</div>
								)}
							/>
							<Controller
								name={"password"}
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className='flex flex-row m-auto w-3/5'>
										<TextField
											type={
												!seePassword
													? "password"
													: "text"
											}
											onChange={onChange}
											value={value}
											label={"Password"}
											className='w-full'
											variant='outlined'
										/>
										<span
											onClick={() =>
												setSeePassword(!seePassword)
											}
											className='mt-4 -ml-8 z-10'>
											<VisibilityIcon />
										</span>
									</div>
								)}
							/>
						</div>
						<div className='m-auto w-3/5'>
							<Button
								onClick={handleSubmit(onSubmit)}
								variant='outlined'
								className='w-full m-auto'>
								Create profile
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
export default Login;
