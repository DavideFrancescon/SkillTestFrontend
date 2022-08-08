import Barchart from "../charts/Barchart";
import * as React from "react";
import axios from "axios";
import { useState } from "react";
import Cake from "../charts/Cake";

const Datas: React.FC = () => {
	const [number, setNumber] = useState<number>(0);

	const colors = ["#123456", "#d12b12", "#5343f1", "#1fda12"];

	const url: string | undefined = process.env.REACT_APP_URLBACK;
	const createNewProfile = () => {
		axios
			.post(url + "/auth/signup", {
				name: "Davide",
				email: `test${number}@gmail.com`,
				password: "123",
			})
			.then(() => {
				axios
					.post(url + "/auth/login", {
						email: `test${number}@gmail.com`,
						password: "123",
					})
					.then((response) => {
						const jwt: string = response.data.token;
						axios.post(
							url + "/api/color",
							{
								favorite_color:
									colors[Math.floor(Math.random() * 4)],
                hated_color:
									colors[Math.floor(Math.random() * 4)],
							},
							{
								headers: {
									"x-access-token": jwt,
								},
							}
						);
					});
			});
		setNumber(number + 1);
	};
	return (
		<div className='m-auto w-full'>
			<div className='grid grid-cols-8 grid-rows-4 w-[80%] h-[95vh] m-auto gap-4 rounded-md p-8'>
				<div></div>
				<div className='col-span-4 row-span-2 border border-black rounded-md bg-white'>
					<div className='text-center text-neutral-400 font-semibold text-xl p-2'>
						{" "}
						User's most loved colors
					</div>
					<hr className='mb-2'></hr>
					<div className="my-auto">
						<Barchart />
					</div>
				</div>
        <div className='col-span-2 row-span-2 border border-black rounded-md bg-white backdrop-blur-sm'>
					<div className='text-center text-neutral-400 font-semibold text-xl p-2'>
						{" "}
						User's most hated colors
					</div>
					<hr></hr>
					<Cake />
				</div>
        <div className="col-span-1 row-span-2"></div>
		<div className="col-span-5"></div>
				<div className="col-span-2">
					<button
						onClick={createNewProfile}
						className='border border-black rounded-md bg-white backdrop-blur-sm w-full h-1/3'
					>
						{" "}
						aggiungi profilo test non clickare a caso
					</button>
				</div>
				
			</div>
		</div>
	);
};

export default Datas;
