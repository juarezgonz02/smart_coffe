import React, { useEffect, useState } from 'react'
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2';

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    customCanvasBackgroundColor: {
      color: '#ffffff',
    },
    title: {
      display: true,
      text: 'Tazas semanales',
    },
  },
};

const labels = () => {
  let days = []
  let names = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
  let date = new Date();
  let day = date.getDate();
  let name = date.getDay();

  for (let i = 6; i >= 0; i--) {

    days.push(`${names[Math.abs(name - i)]}-${day - i}`);
  }
  console.log(days)
  return days
}

let days = labels();


function WeekCounter({allData}) {

  const [cupsData, setData] = useState(allData)
  
  useEffect(() => {  
    setData(allData)
  }, [allData])
  
  const data = {
    labels: days,
    datasets: [{
      label: 'Tazas por dia',
      data: cupsData,
      borderWidth: 1
    }]
  }


  return (
    <div style={{ 
      width: "95%", 
      height: "400px",  
      display: "flex",
      flexDirection: "column",
      justifyItems: "center"
      }}>
      <Line
        options={options}
        data={data}
      />
    </div>

  )
}

export default WeekCounter