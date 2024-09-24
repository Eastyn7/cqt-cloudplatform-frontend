const routes = [
  {
    path: '/campusservice',
    name: 'CampusService',
    component: () => import('@/views/CampusService/CampusServiceView.vue')
  },
  {
    path: '/loveumbrella',
    name: 'LoveUmbrella',
    component: () => import('@/views/LoveUmbrella/LoveUmbrellaView.vue')
  },
  {
    path: '/activities',
    name: 'Activities',
    component: () => import('@/views/Activities/ActivitiesView.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/SignUp/SignUpView.vue')
  },
  {
    path: '/aboutus',
    name: 'AboutUs',
    component: () => import('@/views/AboutUs/AboutUsView.vue')
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: () => import('@/views/Feedback/FeedbackView.vue')
  },
  {
    path: '/personaldata',
    name: 'PersonalData',
    component: () => import('@/views/PersonalData/PersonalDataView.vue')
  },
  {
    path: '/permissionapplication',
    name: 'PermissionApplication',
    component: () =>
      import('@/views/PermissionApplication/PermissionApplicationView.vue')
  },
  {
    path: '/operatingguide',
    name: 'OperatingGuide',
    component: () => import('@/views/OperatingGuide/OperatingGuideView.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/Setting/SettingView.vue')
  }
]

export default routes
