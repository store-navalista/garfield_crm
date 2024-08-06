export const MUIStyles = {
   SliderStyle: {
      '& .MuiSlider-thumb': {
         height: 16,
         width: 16,
         color: 'var(--main-blue)',
         '&:hover': {
            boxShadow: '0px 0px 0 4px rgba(25, 118, 210, 0.16);'
         }
      },
      '& .MuiSlider-rail': {
         color: 'var(--main-blue)',
         height: 6
      },
      '& .Mui-active': {
         color: 'var(--main-blue)'
      },
      '& .MuiSlider-track': {
         color: 'var(--main-blue)'
      }
   },
   BoxStyle: {
      '&.MuiBox-root': {
         width: 200,
         boxShadow: 'var(--shadow-out)',
         borderRadius: 2,
         padding: '2px 8px',
         display: 'flex',
         alignItems: 'center',
         gap: '12px'
      }
   }
}
