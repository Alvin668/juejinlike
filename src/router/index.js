import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:active',
    name: 'HomeActive',
    component: Home
  },
  {
    path: '/fire',
    name: "Fire",
    component: () => import( /* webpackChunkName: "Fire" */ '../views/Fire.vue')
  },
  {
    path: '/find',
    name: "Find",
    component: () => import( /* webpackChunkName: "Fire" */ '../views/Find.vue')
  },
  {
    path: '/course',
    name: "Course",
    component: () => import( /* webpackChunkName: "Fire" */ '../views/Course.vue')
  },
  {
    path: '/profilecenter',
    name: "Profile",
    component: () => import( /* webpackChunkName: "Fire" */ '../views/Profile.vue')
  },
  {
    path: '/search',
    name: "Search",
    component: () => import( /*webpackChunkName:"Search"*/ '../views/Search.vue')
  },
  {
    path: '/checkin',
    name: "Checkin",
    component: () => import( /*webpackChunkName:"Search"*/ '../views/CheckIn.vue')
  },
  {
    path: '/luck',
    name: "Luck",
    component: () => import( /*webpackChunkName:"Search"*/ '../views/Luck.vue')
  },
  {
    path: '/exchange',
    name: "Exchange",
    component: () => import( /*webpackChunkName:"Search"*/ '../views/Exchange.vue')
  },
  {
    path: '/authorlist',
    name: "AuthorList",
    component: () => import( /*webpackChunkName:"AuthorList"*/ '../views/AuthorList.vue')
  },
  {
    path: '/authorhome/:id',
    name: "AuthorHome",
    component: () => import( /*webpackChunkName:"AuthorHome"*/ '../views/AuthorHome.vue')
  },
  {
    path: '/topic/:active',
    name: "Topic",
    component: () => import( /*webpackChunkName:"AuthorHome"*/ '../views/Topic.vue')
  },
  {
    path: '/topicpins/:id',
    name: "TopicPins",
    component: () => import( /*webpackChunkName:"AuthorHome"*/ '../views/TopicPins.vue')
  },
  {
    path: '/morereply/:msg_id',
    name: "AllReply",
    component: () => import( /*webpackChunkName:"AuthorHome"*/ '../views/AllReply.vue')
  },
  {
    path: '/topicdetails/:topic_id',
    name: "TopicDetails",
    component: () => import( /*webpackChunkName:"AuthorHome"*/ '../views/TopicDetails.vue')
  },
  {
    path: '/topicdetailsmore/:topic_id',
    name: "TopicDetailsMore",
    component: () => import( /*webpackChunkName:"AuthorHome"*/ '../views/TopicDetailsMore.vue')
  },
  {
    path: '/topicsquare',
    name: "TopicSquare",
    component: () => import( /*webpackChunkName:"AuthorHome"*/ '../views/TopicSquare.vue')
  },
  {
    path: '/activity',
    name: "Activity",
    component: () => import( /*webpackChunkName:"AuthorHome"*/ '../views/Activity.vue')
  },
  {
    path: '/badgewall',
    name: "BadgeWall",
    component: () => import( /*webpackChunkName:"AuthorHome"*/ '../views/BadgeWall.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router