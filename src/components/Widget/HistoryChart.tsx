import React, {useEffect, useRef} from 'react'
import {useSelector} from 'react-redux'
import {Chart} from 'chart.js'
import {State} from '../../@types'
import color from '../../utils/color'

const HistoryChart = (): JSX.Element | null => {
  const canvasElement = useRef<HTMLCanvasElement>(null)
  const data = useSelector((state: State) => state.history.data)

  useEffect(() => {
    if (canvasElement && canvasElement.current) {
      new Chart(canvasElement.current, {
        type: 'line',
        data: {
          labels: data.xAxis,
          datasets: [
            {
              data: data.yAxis,
              backgroundColor: color.background,
              borderColor: color.primary,
              borderWidth: 2,
              fill: true
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          elements: {
            point: {
              radius: 0
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false
                },
                ticks: {
                  maxTicksLimit: 5,
                  fontSize: 8
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: false
                },
                ticks: {
                  maxTicksLimit: 5,
                  fontSize: 8
                }
              }
            ]
          }
        }
      })
    }
  }, [canvasElement])

  return <canvas ref={canvasElement} data-testid='history-chart' />
}

export default HistoryChart
