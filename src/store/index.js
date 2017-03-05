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
    "tuji_url": 'http://localhost:3000/picture/',
    "jifenbang": 'http://localhost:3000/score/'
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
        }
    },
    mutations: {
        get_league_list(state, object) {
            axios.get(API.jifenbang + object.id, {
                headers: TOKEN
            }).then((res) => {
                //console.log(res.data.result);
                if (res.data.error_code == 0) {
                    state.league.teamList = res.data.result;
                } else {
                    console.log("hehe")
                }
            })
        },
        get_picture_list(state, object) {
            axios.get(API.tuji_url + object.id, {
                headers: TOKEN
            }).then((res) => {
                //console.log(API.tuji_url + object.id);
                if (res.data.code == 200) {
                    state.picture.picList = res.data.data;
                } else {
                    console.log(res)
                }
            })
        },

        set_title(state, obj) {
            state.picture.title = obj.title;
        },
        set_league_name(state, obj) {
            state.league.name = obj.name;
        }
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

    },
    getters: {
        skins(state) {
            var skins = state.league.teamList
            for (var i = 0; i < state.champion.skins.length; i++) {
                let obj = {
                    name: state.champion.skins[i].name,
                    skinurl: `http://cdn.tgp.qq.com/pallas/images/skins/original/${state.champion.key}-${state.champion.skins[i].id}.jpg`,
                    videourl: state.champion.skins[i].displayUrl
                }
                skins.push(obj)
            }
            return skins
        },
        teams(state) {
            var teams = state.league.teamList
            return teams
        },
        skills(state) {
            var skills = [{
                name: state.champion.passive.name,
                description: state.champion.passive.description,
                imgurl: `http://ossweb-img.qq.com/images/lol/img/passive/${state.champion.passive.image.full}`
            }]
            for (var i = 0; i < state.champion.spells.length; i++) {
                let obj = {
                    name: state.champion.spells[i].name,
                    description: state.champion.spells[i].tooltip,
                    imgurl: `http://ossweb-img.qq.com/images/lol/img/spell/${state.champion.spells[i].id}.png`
                }
                skills.push(obj)
            }
            return skills
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