import {createRouter, createWebHashHistory} from "vue-router"
import HomePage from "../pages/HomePage.vue"
import PeoplesPage from "../pages/PeoplesPage.vue"
import PlanetsPage from "../pages/PlanetsPage.vue"
import FilmsPage from "../pages/FilmsPage.vue"
import SpeciesPage from "../pages/SpeciesPage.vue"
import StarshipsPage from "../pages/StarshipsPage.vue"
import VehiclesPage from "../pages/VehiclesPage.vue"



const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/films',
        props: true,
        component: FilmsPage,
    },
    {
        path: '/people',
        props: true,
        component: PeoplesPage,
    },
    {
        path: '/planets',
        props: true,
        component: PlanetsPage,
    },
    {
        path: '/species',
        props: true,
        component: SpeciesPage,
    },
    {
        path: '/starships',
        props: true,
        component: StarshipsPage,
    },
    {
        path: '/vehicles',
        props: true,
        component: VehiclesPage,
    },
]

const router = createRouter({
    routes: routes,
    // history: createWebHistory(process.env.BASE_URL)
    history: createWebHashHistory()
})

export default router;