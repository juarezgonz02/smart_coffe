import { Ticks } from 'chart.js';
import {React, useState, useEffect} from 'react'
import { Bar } from 'react-chartjs-2';

const options = {
  animations: {
    tension: {
      duration: 1000,
      easing: 'linear',
      from: 1,
      to: 0,
      loop: true
    }
  },
  resposive: true,
  aspectRatio: 3/5,
  plugin:{
    customCanvasBackgroundColor: {
      color: '#ffffff',
    },

    legend:{
      display: false, 
      position: 'top'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 1,
      type: "linear",
      ticks: {
        format: {
          style: 'percent'
        }
      }
    },
    x: {
      weight: 1, 
      grid: {
        lineWidth: 1, 
        tickLength: 1
      }
    }
  }
}

function Level({tanklevel}) {
  
  const [level, updatelevel] = useState(tanklevel);

  useEffect(() => {

    console.log("Nivel del tanque " + tanklevel)
    updatelevel(parseFloat(tanklevel))
    
    if(level <= 0.33)
      updateColor("#a83232")
    else if(level < 0.66)
      updateColor("#a89a32")
    else if(level >= 0.66)
      updateColor("#32a852")
  }, [tanklevel])
  
  const [color, updateColor] = useState("rgba(255, 99, 132)");


  const data = {
    labels: ['Nivel'],
    datasets: [{
      label: '%',
      barThickness: 70,
      data: [level],
      borderWidth: 2,
      backgroundColor: color
    }]
  }
  
  return (
    <div>
      <h4>
        {
          `${level*100}%`
        }
      </h4>
      <div style={{ display:"flex", justifyContent:"center" , position: "relative", width: "275px", height: "275px" }}>
        <Bar 
        options={options} 
        data={data} />
        </div>
      </div>
  )
}

export default Level