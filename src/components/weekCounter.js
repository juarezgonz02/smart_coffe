import React, { useEffect } from 'react'
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2';

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
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

const data = {
  labels: days,
  datasets: [{
    label: 'Tazas por dia',
    data: [12, 19, 3, 5, 2, 3, 7],
    borderWidth: 1
  }]
}

function WeekCounter() {

  return (
    <div style={{ width: "550px", height: "225px" }}>
      <Line
        options={options}
        data={data}
      />
    </div>

  )
}

export default WeekCounter