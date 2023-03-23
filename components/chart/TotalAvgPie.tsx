import {Chart, ArcElement, ChartData} from 'chart.js'
Chart.register(ArcElement);
import { Bar, Pie } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
import { useState } from "react";
Chart.register(CategoryScale);

export interface Data {
  FAG: string | any;
  SPM1: number;
  SPM2: number;
  SPM3: number;
  SPM4: number;
  SPM5: number;
}




interface IBarChart{
  chartData: Data[]
}
export default function TotalAvgPie({ chartData }: IBarChart) {
  const [data, setData] = useState<ChartData<"pie">>();
  
  let AvgSpm1 = chartData[0].SPM1
  let AvgSpm2 = chartData[0].SPM2
  let AvgSpm3 = chartData[0].SPM3
  let AvgSpm4 = chartData[0].SPM4
  let AvgSpm5 = chartData[0].SPM5
    


    for (let i = 0; i < chartData.length; i++) {
      
      AvgSpm1 = AvgSpm1 + chartData[i].SPM1
      AvgSpm2 = AvgSpm2 + chartData[i].SPM2
      AvgSpm3 = AvgSpm3 + chartData[i].SPM3
      AvgSpm4 = AvgSpm4 + chartData[i].SPM4
      AvgSpm5 = AvgSpm5 + chartData[i].SPM5
      
    }
    
      AvgSpm1 = AvgSpm1/chartData.length
      AvgSpm2 = AvgSpm2/chartData.length
      AvgSpm3 = AvgSpm3/chartData.length
      AvgSpm4 = AvgSpm4/chartData.length
      AvgSpm5 = AvgSpm5/chartData.length
if(!data)
    setData({
      labels: ['SPM1', 'SPM2', 'SPM3','SPM4','SPM5',],
      // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
          {
            label: 'score fra 1-5   ',
            data: [AvgSpm1, AvgSpm2, AvgSpm3, AvgSpm4, AvgSpm5],
            // you can set indiviual colors for each bar
            backgroundColor: [
              'rgba(255, 0, 255, 0.6)',
              'rgba(0, 255, 255, 0.6)',
              'rgba(150, 255, 200, 0.6)',
              'rgba(255, 255, 0, 0.6)',
              'rgba(255, 0, 0, 0.6)'
            ],
            borderWidth: 1,
          }
        ]
    }
    )

  
      return (
        <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Total Avg.Pie Chart</h2>
          {data && 
      <Pie
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "statistikk",
            },
            legend: {
              display: false,
            },
          },
        }}
          />
          }
    </div>
  );
}
