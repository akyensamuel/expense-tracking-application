import { getSidebar, setQueryParameter, statSummary } from "./utils.js";
class Router {
    constructor() {
        this.currentRoute = window.location.pathname;
    }
    async init() {
        const response = await fetch('/routes/?all=1');
        const data = await response.json();
        this.routes = data;
    }
    navigate(route, forcedRoute) {
        history.replaceState({ html: document.getElementById('main-content').innerHTML }, ''); // store html for the current page
        history.pushState(null, '', forcedRoute ? forcedRoute : route); // push url for the next page
        this.currentRoute = forcedRoute ? forcedRoute : route;
        htmx.swap('#main-content', this.routes[route], { swapStyle: 'innerHTML', transition: true });
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        getSidebar().hide();
    }
}
class Routes {
    constructor(router) {
        this.router = router;
    }
    // To navigate to a route it's as easy as doing: routes.routeName()
    dashboard() {
        this.router.navigate('/dashboard/');
        statSummary.currentType = 'weekly'; // set the stat type to weekly for now
    }
    expenditures() {
        this.router.navigate('/all-expenditures/');
    }
    categories() {
        this.router.navigate('/categories/');
    }
    category(categoryName) {
        this.router.navigate('/categories/category-name/', `/categories/${categoryName}/`);
        document.getElementById('pageHeading').textContent = categoryName;
    }
    viewWeek(id, dateRange) {
        // -1 represents a week that does not exist
        if (id != -1) {
            setQueryParameter('week_id', id); // add week_id to the query parameters
            this.router.navigate('viewWeekSkeleton', `/weeks/${id}/`);
            document.getElementById('pageHeading').textContent = `${dateRange}`;
        }
    }
    viewDay(date, pageHeading) {
        setQueryParameter('date', date);
        setQueryParameter('seeDay', '1'); // a flag that indicates we are viewing a day
        this.router.navigate('seeDaySkeleton', `/days/${date}/`);
        document.getElementById('pageHeading').textContent = pageHeading;
    }
}
const router = new Router();
const routes = new Routes(router);
router.init();
export { router, routes };
// make globally accessible
window['routes'] = routes;
