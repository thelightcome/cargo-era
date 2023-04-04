import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3c086488 = () => interopDefault(import('..\\src\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _2d239a55 = () => interopDefault(import('..\\src\\pages\\auth\\index.vue' /* webpackChunkName: "pages/auth/index" */))
const _52641286 = () => interopDefault(import('..\\src\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _7c612f5c = () => interopDefault(import('..\\src\\pages\\user\\index.vue' /* webpackChunkName: "pages/user/index" */))
const _1eee3350 = () => interopDefault(import('..\\src\\pages\\admin\\list.vue' /* webpackChunkName: "pages/admin/list" */))
const _43194b86 = () => interopDefault(import('..\\src\\pages\\admin\\setting.vue' /* webpackChunkName: "pages/admin/setting" */))
const _6b91d3f0 = () => interopDefault(import('..\\src\\pages\\auth\\register.vue' /* webpackChunkName: "pages/auth/register" */))
const _0bc6562a = () => interopDefault(import('..\\src\\pages\\auth\\respawn.vue' /* webpackChunkName: "pages/auth/respawn" */))
const _79657d64 = () => interopDefault(import('..\\src\\pages\\user\\list.vue' /* webpackChunkName: "pages/user/list" */))
const _732e84d0 = () => interopDefault(import('..\\src\\pages\\user\\setting.vue' /* webpackChunkName: "pages/user/setting" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'hash',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _3c086488,
    name: "admin___ru"
  }, {
    path: "/auth",
    component: _2d239a55,
    name: "auth___ru"
  }, {
    path: "/kk",
    component: _52641286,
    name: "index___kk"
  }, {
    path: "/user",
    component: _7c612f5c,
    name: "user___ru"
  }, {
    path: "/admin/list",
    component: _1eee3350,
    name: "admin-list___ru"
  }, {
    path: "/admin/setting",
    component: _43194b86,
    name: "admin-setting___ru"
  }, {
    path: "/auth/register",
    component: _6b91d3f0,
    name: "auth-register___ru"
  }, {
    path: "/auth/respawn",
    component: _0bc6562a,
    name: "auth-respawn___ru"
  }, {
    path: "/kk/admin",
    component: _3c086488,
    name: "admin___kk"
  }, {
    path: "/kk/auth",
    component: _2d239a55,
    name: "auth___kk"
  }, {
    path: "/kk/user",
    component: _7c612f5c,
    name: "user___kk"
  }, {
    path: "/user/list",
    component: _79657d64,
    name: "user-list___ru"
  }, {
    path: "/user/setting",
    component: _732e84d0,
    name: "user-setting___ru"
  }, {
    path: "/kk/admin/list",
    component: _1eee3350,
    name: "admin-list___kk"
  }, {
    path: "/kk/admin/setting",
    component: _43194b86,
    name: "admin-setting___kk"
  }, {
    path: "/kk/auth/register",
    component: _6b91d3f0,
    name: "auth-register___kk"
  }, {
    path: "/kk/auth/respawn",
    component: _0bc6562a,
    name: "auth-respawn___kk"
  }, {
    path: "/kk/user/list",
    component: _79657d64,
    name: "user-list___kk"
  }, {
    path: "/kk/user/setting",
    component: _732e84d0,
    name: "user-setting___kk"
  }, {
    path: "/",
    component: _52641286,
    name: "index___ru"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
