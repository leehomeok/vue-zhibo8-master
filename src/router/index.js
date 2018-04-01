import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        { path: '/', name: 'index', component: require('../components/index') },
        { path: '/endgame', name: "endgame", component: require('../components/endgame') },
        { path: '/pic', name: "pic", component: require("../components/pictures") },
        { path: '/nba', name: "nba", component: require('../components/nba') },
        { path: '/score', name: "score", component: require('../components/jifenbang') },
        { path: '/NBAscore', name: "NBAscore", component: require('../components/nba_jifenbang') },
        { path: '/team', name: "team", component: require('../components/team') },
        { path: '/player/:id', name: "player", component: require('../components/player') },
        { path: '/tuji/:id', name: "tuji", component: require('../components/tuji') }
    ]
});