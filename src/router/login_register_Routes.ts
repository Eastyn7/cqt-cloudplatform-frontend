const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register/RegisterView.vue')
  }
]

export default routes
