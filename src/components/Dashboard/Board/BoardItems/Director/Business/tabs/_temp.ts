// let isSyncingScroll = false

// const syncVerticalScroll = useCallback((source: 'scroll' | 'fixed') => {
//    if (scroll_rows.current && fixed_rows.current && !isSyncingScroll) {
//       isSyncingScroll = true
//       if (source === 'scroll') {
//          fixed_rows.current.scrollTop = scroll_rows.current.scrollTop
//       } else {
//          scroll_rows.current.scrollTop = fixed_rows.current.scrollTop
//       }
//       isSyncingScroll = false
//    }
// }, [])

// useEffect(() => {
// const scrollRowsCurrent = scroll_rows.current
// const fixedRowsCurrent = fixed_rows.current
// const scrollHeaderCurrent = scroll_header.current
// const handleRowsScroll = () => {
//    syncVerticalScroll('scroll')
// }
// const handleFixedScroll = () => {
//    syncVerticalScroll('fixed')
// }
// if (scrollRowsCurrent && fixedRowsCurrent && scrollHeaderCurrent) {
//    scrollRowsCurrent.addEventListener('scroll', handleRowsScroll)
//    fixedRowsCurrent.addEventListener('scroll', handleFixedScroll)
// }
// return () => {
//    if (scrollRowsCurrent && fixedRowsCurrent && scrollHeaderCurrent) {
//       scrollRowsCurrent.removeEventListener('scroll', handleRowsScroll)
//       fixedRowsCurrent.removeEventListener('scroll', handleFixedScroll)
//    }
// }
// }, [])

// const scroll_header = useRef<HTMLDivElement>(null)
