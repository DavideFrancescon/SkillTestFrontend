import React, { useEffect, useState } from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import userModel from "model/userModel";
import axios from "axios";
import MUITable from "../charts/MUITable";

export interface row {
	id:number,
	name: string;
	favorite_color: string;
	hated_color: string;
	lucky_color: string;
	random_color: string;
}
function Datatable() {
	const user: userModel = useSelector((state: RootState) => state.user);
	const url: string | undefined = process.env.REACT_APP_URLBACK;
	const [data, setData] = useState<row[]>([
		{
			id:-1,
			favorite_color: "#5D7AB9",
			hated_color: "#3CAB12",
			lucky_color: "#A86613",
			name: "davide",
			random_color: "#E92A5F",
		},
	]);
	useEffect(() => {
		axios
			.get(url + "/api/get_all_users", {
				headers: {
					"x-access-token": user.jwt,
				},
			})
			.then((response) => {
				setData(response.data.data);
			});
	}, []);

	return (
		<div>
			<div className='p-8 h-[90vh] w-[60%] mx-auto'>
				<MUITable rows={data}></MUITable>
			</div>
		</div>
	);
}

export default Datatable;
