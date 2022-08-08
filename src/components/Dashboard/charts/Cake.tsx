import React, { useEffect, useState } from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import userModel from "model/userModel";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from "axios";

interface colorModel {
  hated_color: string;
  nColor: number;
}

const Barchart: React.FC = () => {
  const user: userModel = useSelector((state: RootState) => state.user);
  const url: string | undefined = process.env.REACT_APP_URLBACK;

  const [data, setData] = useState<any>({
    labels: [],
    datasets: [
    ],
  });

 
    ChartJS.register(ArcElement, Tooltip, Legend);


  useEffect(() => {
    axios
      .get(url + "/api/count_hated_colors", {
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
          (col: colorModel) => col.hated_color
        );
        const dataset = [
          {
            label: "Hated color",
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
      <Pie data={data} />
    </>
  );
};
export default Barchart;
