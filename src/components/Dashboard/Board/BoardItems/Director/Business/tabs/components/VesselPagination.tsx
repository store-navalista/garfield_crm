import React, { CSSProperties, FC } from 'react'
import css from '../Vessels.module.scss'

type PagProps = {
   pages_count: number
   currentPage: number
   setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const VesselPagination: FC<PagProps> = ({ pages_count, currentPage, setCurrentPage }) => {
   const handleCurrentPage = (type: 'increment' | 'decrement') => {
      if (type === 'increment') {
         if (currentPage < pages_count) {
            setCurrentPage((prevState) => prevState + 1)
         }
      }

      if (type === 'decrement') {
         if (currentPage > 1) {
            setCurrentPage((prevState) => prevState - 1)
         }
      }
   }

   const width = 100 / pages_count

   return (
      <div className={css.pagination}>
         <button onClick={() => handleCurrentPage('decrement')}>◀</button>
         <div className={css.progress}>
            <span
               style={{ width: `${width}%`, transform: `translateX(${100 * (currentPage - 1)}%)` } as CSSProperties}
            />
         </div>
         <button onClick={() => handleCurrentPage('increment')}>▶</button>
      </div>
   )
}

export default VesselPagination
