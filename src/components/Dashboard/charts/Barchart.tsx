import React, { useEffect, useState } from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import userModel from "model/userModel";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

interface colorModel {
	favorite_color: string;
	nColor: number;
}

const Barchart: React.FC = () => {
	const user: userModel = useSelector((state: RootState) => state.user);
	const url: string | undefined = process.env.REACT_APP_URLBACK;

	const [data, setData] = useState<any>({
		labels: [],
		datasets: [],
	});

	ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend
	);

	useEffect(() => {
		axios
			.get(url + "/api/count_favorite_colors", {
				headers: {
					"x-access-token": user.jwt,
				},
			})
			.then((response) => {
				const colorsInside: colorModel[] = [];
				response.data.forEach((data: colorModel) => {
					colorsInside.push(data);
				});
				const labels = colorsInside.map(
					(col: colorModel) => col.favorite_color
				);
				const dataset = [
					{
						label: "Favorite color",
						data: colorsInside.map((col: colorModel) => col.nColor),
						backgroundColor: labels,
					},
				];
				setData({
					labels: labels,
					datasets: dataset,
				});
			});
	}, []);

	return (
		<>
			<Bar data={data} />
		</>
	);
};
export default Barchart;
