
const routes = [
  {
    name: 'login',
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    meta: {
      title: 'Login'
    }
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('layouts/RegisterLayout.vue'),
    meta: {
      title: 'Register'
    }
  },
  {
    name: 'calendar',
    path: '/calendar',
    component: () => import('layouts/MainLayout.vue'),
    props: {
      view: 'calendar'
    },
    meta: {
      title: 'Calendario', requireSession: true
    }
  },
  {
    name: 'clients',
    path: '/clients',
    component: () => import('layouts/MainLayout.vue'),
    props: {
      view: 'clients'
    },
    meta: {
      title: 'Clientes', requireSession: true
    }
  },
  {
    name: 'reports',
    path: '/reports',
    component: () => import('layouts/MainLayout.vue'),
    props: {
      view: 'reports'
    },
    meta: {
      title: 'Informes', requireSession: true
    }
  },
  {
    name: 'client',
    path: '/client/:id',
    component: () => import('layouts/MainLayout.vue'),
    props: {
      view: 'client'
    },
    meta: {
      title: 'Cliente', requireSession: true
    }
  },
  {
    name: 'proyect',
    path: '/proyect/:id',
    component: () => import('layouts/MainLayout.vue'),
    props: {
      view: 'proyect'
    },
    meta: {
      title: 'Proyecto', requireSession: true
    }
  },
  {
    name: 'phase',
    path: '/phase/:id',
    component: () => import('layouts/MainLayout.vue'),
    props: {
      view: 'phase'
    },
    meta: {
      title: 'Fase', requireSession: true
    }
  },
  {
    name: 'logout',
    path: '/logout',
    meta: {
      title: 'logout', requireSession: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
