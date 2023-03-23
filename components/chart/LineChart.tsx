import {  Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {CategoryScale, ChartData} from 'chart.js'; 
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
export default function LineChart({ chartData }: IBarChart) {
  
  let AvgSpm1 = chartData[0].SPM1
  let AvgSpm2 = chartData[0].SPM2
  let AvgSpm3 = chartData[0].SPM3
  let AvgSpm4 = chartData[0].SPM4
  let AvgSpm5 = chartData[0].SPM5
  const [data, setData] = useState<ChartData<"line">>();
    

  function changeSelect(target: React.ChangeEvent<HTMLSelectElement>) {
    let targetFag =target.target.value

  let statsToShow = chartData.filter((o) => o.FAG == targetFag)
  console.log(statsToShow)

    for (let i = 0; i < statsToShow.length; i++) {
      
      AvgSpm1 = AvgSpm1 + statsToShow[i].SPM1
      AvgSpm2 = AvgSpm2 + statsToShow[i].SPM2
      AvgSpm3 = AvgSpm3 + statsToShow[i].SPM3
      AvgSpm4 = AvgSpm4 + statsToShow[i].SPM4
      AvgSpm5 = AvgSpm5 + statsToShow[i].SPM5
      
    }
    
      AvgSpm1 = AvgSpm1/statsToShow.length
      AvgSpm2 = AvgSpm2/statsToShow.length
      AvgSpm3 = AvgSpm3/statsToShow.length
      AvgSpm4 = AvgSpm4/statsToShow.length
      AvgSpm5 = AvgSpm5/statsToShow.length

    setData({
      labels: ['SPM1', 'SPM2', 'SPM3','SPM4','SPM5',],
      // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
                 datasets: [
                    {
                        label: 'Test 3',
                        data: [AvgSpm1, AvgSpm2, AvgSpm3, AvgSpm4, AvgSpm5],
                        backgroundColor: 'rgba(255, 0, 255, 0.6)',
                    },
                    {
                        label: 'Test 4',
                        data: [AvgSpm2, AvgSpm3, AvgSpm4, AvgSpm5, AvgSpm5],
                        backgroundColor: 'rgba(0, 255, 255, 0.6)',
                    },
                    {
                        label: 'Test 4',
                        data: [AvgSpm3, AvgSpm4, AvgSpm5, AvgSpm4, AvgSpm5],
                        backgroundColor: 'rgba(150, 255, 200, 0.6)',
                    },
                    {
                        label: 'Test 4',
                        data: [AvgSpm4, AvgSpm5, AvgSpm1, AvgSpm4, AvgSpm5],
                        backgroundColor: 'rgba(255, 255, 0, 0.6)',
                    },
                    {
                        label: 'Test 4',
                        data: [AvgSpm5, AvgSpm1, AvgSpm2, AvgSpm4, AvgSpm5],
                        backgroundColor: 'rgba(255, 0, 0, 0.6)',
                    },
                ],
    }
    )
}
      if (!data) {
    setData({
      labels: ['SPM1', 'SPM2', 'SPM3','SPM4','SPM5',],
      // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
          {
            label: 'score fra 1-5   ',
            data: [0, 0, 0, 0, 0],
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
  }
      let fag = chartData.map((o)=>{return o.FAG})
      let unique = fag.filter((item, i, ar) => ar.indexOf(item) === i);
      
      return (
        <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <select name="fag" id="fag" style={{ textAlign: "center" }} onInput={changeSelect}>
        {unique.map((o) => {
          return <option value={o} key={o}>{JSON.stringify(o)}</option>
        })}  
          </select>
          {data && 
      <Line
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
