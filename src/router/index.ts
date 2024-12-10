import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/Home.vue'),
        },
        {
          path: 'services',
          name: 'services',
          component: () => import('@/views/services/ServicesList.vue'),
        },
        {
          path: 'services/:id',
          name: 'service-details',
          component: () => import('@/views/services/ServiceDetails.vue'),
        }
      ]
    },
    {
      path: '/auth',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/Login.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/auth/Register.vue'),
        }
      ]
    },
    {
      path: '/dashboard',
      component: () => import('@/layouts/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/dashboard/Overview.vue'),
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/dashboard/Profile.vue'),
        },
        {
          path: 'services',
          name: 'my-services',
          component: () => import('@/views/dashboard/Services.vue'),
        },
        {
          path: 'requests',
          name: 'requests',
          component: () => import('@/views/dashboard/Requests.vue'),
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;