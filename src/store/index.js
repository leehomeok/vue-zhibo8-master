import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const TOKEN = {
    "DAIWAN-API-TOKEN": "78710-B0810-777C7-C9A85"
}
const VIDEOTOKEN = {
    "DAIWAN-API-TOKEN": "C18BC-4CFC9-1C966-CC490"
}


const API = {
    championList: 'http://lolapi.games-cube.com/champion',
    championDetail: 'http://lolapi.games-cube.com/GetChampionDetail?champion_id=',
    playerSearch: 'http://lolapi.games-cube.com/UserArea?keyword=',
    playerDetail: 'http://lolapi.games-cube.com/UserHotInfo?qquin=',
    getTierQueue: 'http://lolapi.games-cube.com/GetTierQueue?tier=',
    playExtInfo: 'http://lolapi.games-cube.com/UserExtInfo?qquin=',
    combatList: 'http://lolapi.games-cube.com/CombatList?qquin=',
    combatDetail: 'http://lolapi.games-cube.com/GameDetail?qquin=',
    newstVideos: 'http://infoapi.games-cube.com/GetNewstVideos?p=',
    commenterList: 'http://infoapi.games-cube.com/GetAuthors',
    nba_score_list: 'http://localhost:3000/NBAScore/',
    "tuji_url": 'http://localhost:3000/picture/',
    "jifenbang": 'http://localhost:3000/score/',
    "player": "http://localhost:3000/player",
    "footballTeam": "http://localhost:3000/footballTeam"
}

const store = new Vuex.Store({
    state: {
        title: '手机直播吧',
        picture: {
            id: "",
            title: "",
            picList: []
        },
        league: {
            name: "",
            teamList: [],
            top: 0,
            bottom: 0
        },
        NBA_score: {

        },
        football_team: {
            team_name: "",
            coach: "",
            city: '',
            match: "", //当前联赛排名,
            team_id: '',
            team_logo: "",
            league_id: "",
            players: [],
            honor: [],
            saicheng: {}
        },
        player: {}
    },
    mutations: {
        get_league_list(state, object) {
            axios.get(API.jifenbang + object.id, {
                headers: TOKEN
            }).then((res) => {
                if (res.status == 200) {
                    for (let i = 0, len = res.data.data.length; i < len; i++) {
                        res.data.data[i]["进失球"] = res.data.data[i]["进\/失球"];
                    }
                    state.league.teamList = res.data.data;

                } else {
                    console.log(res)
                }
            })
        },
        get_picture_list(state, object) {
            axios.get(API.tuji_url + object.id, {
                headers: TOKEN
            }).then((res) => {
                if (res.data.code == 200) {
                    state.picture.picList = res.data.data;
                } else {
                    console.log(res)
                }
            })
        },
        get_nbaScore_list(state, object) { //NBA积分榜
            axios.get(API.nba_score_list, {}).then((res) => {
                if (res.status == 200) {
                    state.NBA_score = res.data.data;
                    console.log(state.NBA_score);
                } else {
                    console.log(res)
                }
            })
        },
        get_football_teaminfo(state, object) { //获取某支足球队的信息
            axios.get(API.footballTeam + "?league=" + object.league_id + "&team=" + object.team_id, {}).then((res) => {
                if (res.status == 200) {
                    //console.log(res.data)
                    state.football_team.players = res.data.qdzr;
                    state.football_team.honor = res.data.rys;
                    state.football_team.saicheng = res.data.saicheng;
                    //console.log(state.football_team);

                } else {
                    console.log(res)
                }
            })
        },
        get_player_info(state, obj) {
            axios.get(API.player + "?league=" + state.football_team.league_id + "&player=" + obj.player_id, {}).then((res) => {
                if (res.status == 200) {
                    state.player = res.data;
                    state.player.player_img = 'http://data.zhibo8.cc/' + res.data.player_img;
                    //console.log(res.data)
                }
            })

        },
        set_title(state, obj) {
            state.picture.title = obj.title;
        },
        set_league_name(state, obj) { //设置联赛名称
            state.league.name = obj.name;
        },
        set_football_team(state, obj) { //设置球队名称,LOGO
            // console.log(obj);
            state.football_team.team_name = obj.team_name;
            state.football_team.team_logo = obj.team_logo;
            state.football_team.team_id = obj.team_id;
            state.football_team.league_id = obj.league_id;
        },

    },
    actions: {
        SET_TITLE(context, object) {
            context.commit('set_title', object);
        },
        SET_LEAGUE_NAME(context, object) {
            context.commit('set_league_name', object);
        },
        GET_LEAGUE_LIST(context, object) {
            context.commit('get_league_list', object)
        },
        GET_PICTURE_LIST(context, object) {
            context.commit('get_picture_list', object)
        },
        GET_NBASCORE_LIST(context, object) {
            context.commit('get_nbaScore_list', object)
        },
        GET_FOOTBALL_TEAMINFO(context, object) {
            context.commit('get_football_teaminfo', object)
        },
        GET_PLAYER_INFO(context, object) {
            context.commit('get_player_info', object)
        },
        SET_FOOTBALL_TEAM(context, object) {
            context.commit('set_football_team', object);
        },

    },
    getters: {
        teams(state) {
            var teams = state.league.teamList
            return teams
        },

        winners(state) {
            return state.combatDetail.gamer_records.slice(0, 5)
        },
        losers(state) {
            return state.combatDetail.gamer_records.slice(-5)
        }
    }
})

export default store