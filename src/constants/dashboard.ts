export type TID =
   | 'greating'
   | 'ctoProperty'
   | 'account'
   | 'time'
   | 'qr'
   | 'radio'
   | 'employees'
   | 'timing'
   | 'CTO'
   | 'logout'
   | 'charts'
   | 'holidayCalendar'
   | 'pdf'
   | 'video'

export type TBoardItem = {
   id: TID
   icon: string
   title: string
}

export type TBoardItems = TBoardItem[]

const nav: TBoardItems = [
   {
      id: 'greating',
      icon: 'dashboard-nav-greating.svg',
      title: 'dashboard.nav-greating'
   },
   {
      id: 'video',
      icon: 'dashboard-nav-video.svg',
      title: 'dashboard.nav-video'
   },
   {
      id: 'ctoProperty',
      icon: 'dashboard-nav-ctoProperty.svg',
      title: 'dashboard.nav-ctoProperty'
   },
   {
      id: 'account',
      icon: 'dashboard-nav-info.svg',
      title: 'dashboard.nav-info'
   },
   {
      id: 'time',
      icon: 'dashboard-nav-time-reports.svg',
      title: 'dashboard.nav-time'
   },
   {
      id: 'qr',
      icon: 'dashboard-nav-qrcode.svg',
      title: 'dashboard.nav-qr'
   },
   {
      id: 'radio',
      icon: 'dashboard-nav-radio.svg',
      title: 'dashboard.nav-radio'
   },
   {
      id: 'employees',
      icon: 'dashboard-nav-employees.svg',
      title: 'dashboard.nav-employees'
   },
   {
      id: 'timing',
      icon: 'dashboard-nav-timing.svg',
      title: 'dashboard.nav-timing'
   },
   {
      id: 'charts',
      icon: 'dashboard-nav-charts.svg',
      title: 'dashboard.nav-charts'
   },
   {
      id: 'holidayCalendar',
      icon: 'dashboard-nav-holidayCalendar.svg',
      title: 'dashboard.nav-holidayCalendar'
   },
   {
      id: 'pdf',
      icon: 'dashboard-nav-pdf.svg',
      title: 'dashboard.nav-pdf'
   },
   {
      id: 'logout',
      icon: 'dashboard-nav-logout.svg',
      title: 'dashboard.nav-logout'
   }
]

const items = {
   CTO: ['greating', 'video', 'account', 'employees', 'timing', 'qr', 'radio', 'charts', 'holidayCalendar', 'logout'],
   Employee: ['greating', 'video', 'account', 'time', 'qr', 'radio', 'holidayCalendar', 'logout'],
   Moderator: [
      'greating',
      'video',
      'ctoProperty',
      'CTO',
      'employees',
      'timing',
      'time',
      'qr',
      'pdf',
      'radio',
      'charts',
      'holidayCalendar',
      'logout'
   ]
}

export const DASHBOARD = {
   nav,
   items
}

export const week_days = {
   en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
   ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
}

export const COMMON_CELL = '_common_tasks'
export const NARROW_CELL = '_narrow_profile_tasks'
