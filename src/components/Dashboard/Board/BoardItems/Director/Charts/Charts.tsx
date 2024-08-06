import React, { FC, useState } from 'react'
import css from './Charts.module.scss'
import { LineChart } from '@mui/x-charts/LineChart'

const first = ['January', [1, 5.5, 2, 8.5, 1.5, 5], [1, 2.5, 1, 4.5, 0.5, 4]]

const second = ['February', [3.5, 5.5, 5, 2.5, 5.5, 2], [2, 4.5, 2, 1.5, 2.5, 1]]

const Charts: FC = () => {
   const [data, setData] = useState(first)

   return (
      <div className={css.wrapper}>
         <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
               {
                  data: data[1] as number[],
                  area: true,
                  label: 'First work',
                  color: '#5098c7'
               },
               {
                  data: data[2] as number[],
                  area: true,
                  label: 'Second work',
                  color: '#013f4e'
               }
            ]}
            width={500}
            height={300}
         />
         <div className={css.month}>
            <button onClick={() => setData(first)}>{'-'}</button>
            <p>{data[0]}</p>
            <button onClick={() => setData(second)}>{'+'}</button>
         </div>
      </div>
   )
}

export default Charts
