export interface IStation {
   id: string
   stream: string
   title: string
   meta: string
   meta_type?: any
}

const STATION_URL = 'https://stream.pcradio.ru/'
const META_URL = 'https://meta.pcradio.ru/'

export const STATIONS: IStation[] = [
   {
      id: 'bassdrive-med',
      stream: STATION_URL + 'bassdrive-med',
      title: 'Bassdrive',
      meta: META_URL + 'bassdrive_current.json'
   },
   {
      id: 'one_amsterdam-med',
      stream: STATION_URL + 'one_amsterdam-med',
      title: '1.FM Amsterdam Trance',
      meta: META_URL + 'one_amsterdam_current.json'
   },
   {
      id: 'frisky_radio-med',
      stream: STATION_URL + 'frisky_radio-med',
      title: 'Frisky Radio',
      meta: META_URL + 'frisky_radio_current.json'
   },
   {
      id: 'record_trnsm-med',
      stream: STATION_URL + 'record_trnsm-med',
      title: 'Record Trancemission',
      meta: META_URL + 'record_trnsm_current.json'
   },
   {
      id: 'rcm_deep_fm-med',
      stream: STATION_URL + 'rcm_deep_fm-med',
      title: 'RCM Deep FM',
      meta: META_URL + 'rcm_deep_fm_current.json'
   },
   {
      id: 'different_drumz-med',
      stream: STATION_URL + 'different_drumz-med',
      title: 'Different Drumz DnB Radio',
      meta: META_URL + 'different_drumz_current.json'
   },
   {
      id: 'schizoid_psytrance-med',
      stream: STATION_URL + 'schizoid_psytrance-med',
      title: 'Schizoid Psychedelic Trance',
      meta: META_URL + 'schizoid_psytrance_current.json'
   },
   {
      id: 'smoothjazz247-med',
      stream: STATION_URL + 'smoothjazz247-med',
      title: 'Smooth Jazz 247',
      meta: META_URL + 'smoothjazz247_current.json'
   },
   {
      id: 'Acid_Jazz-med',
      stream: STATION_URL + 'Acid_Jazz-med',
      title: 'Acid Jazz',
      meta: META_URL + 'Acid_Jazz_current.json'
   },
   {
      id: 'Vintazh_kafe-med',
      stream: STATION_URL + 'Vintazh_kafe-med',
      title: 'Vintazh Kafe',
      meta: META_URL + 'Vintazh_kafe_current.json'
   },
   {
      id: 'cafedelmar_ga-med',
      stream: STATION_URL + 'cafedelmar_ga-med',
      title: 'Café del Mar',
      meta: META_URL + 'cafedelmar_ga_current.json'
   },
   {
      id: 'chilltrax_com-med',
      stream: STATION_URL + 'chilltrax_com-med',
      title: 'ChillTrax',
      meta: META_URL + 'chilltrax_com_current.json'
   },
   {
      id: 'costadelmarradiocom-med',
      stream: STATION_URL + 'costadelmarradiocom-med',
      title: 'Costa Del Mar - Chillout',
      meta: META_URL + 'costadelmarradiocom_current.json'
   },
   {
      id: 'record_rock-med',
      stream: STATION_URL + 'record_rock-med',
      title: 'Record Rock',
      meta: META_URL + 'record_rock_current.json'
   },
   {
      id: 'rockfm_moscow-med',
      stream: STATION_URL + 'rockfm_moscow-med',
      title: 'Rock FM 95.2',
      meta: META_URL + 'rockfm_moscow_current.json'
   },
   {
      id: 'vcr_live-med',
      stream: STATION_URL + 'vcr_live-med',
      title: 'Venice Classic Radio Live',
      meta: META_URL + 'vcr_live_current.json'
   },
   {
      id: 'KissFM_Deep',
      stream: 'https://online.kissfm.ua/KissFM_Deep',
      title: 'KissFM Deep',
      meta: 'https://o.tavrmedia.ua/kissdeep',
      meta_type: ['kiss_fm_deep', ['singer', 'song']]
   },
   {
      id: 'banana_street-med',
      stream: STATION_URL + 'banana_street-med',
      title: 'Bananastreet',
      meta: META_URL + 'banana_street_current.json'
   },
   {
      id: 'badbeat_16-med',
      stream: STATION_URL + 'badbeat_16-med',
      title: 'Bad Beat Radio',
      meta: META_URL + 'badbeat_16_current.json'
   }
]
