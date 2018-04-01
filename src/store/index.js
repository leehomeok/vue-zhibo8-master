import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Indicator,Cell } from 'mint-ui';
Vue.use(Vuex)

const API = {
	nba_score_list: 'http://localhost:3000/NBAScore/',
	"tuji_url": 'http://localhost:3000/picture/',
	"player": "http://localhost:3000/player",
	"footballTeam": "http://localhost:3000/footballTeam"
}

const store = new Vuex.Store({
	state: {
		title: '手机直播吧',
		banners: [],
		news: [],
		end_game: [],
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
		NBA: [],
		NBA_score: {},
		football_team: {},
		player: {}
	},
	actions: {
		GET_NEWS(context, object) {
			context.commit('get_news', object);
		},
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
		GET_BANNER (context, object) {
			context.commit('get_banner', object);
		},
		GET_END_GAME (context, object) {
			context.commit('get_end_game', object);
		},
		GET_NBA (context, obj) {
			context.commit('get_nba', obj);
		}
	},
	mutations: {
		get_nba (state, obj) {
			Indicator.open({
				text: '加载中...',
				spinnerType: 'snake'
			});
			axios.get('http://localhost:3000/NBA', {}).then(res=> {
				if (res.status == 200) {
					Indicator.close()
					state.NBA = res.data.list
				} else {
					Indicator.close()
				}
			})
		},
		get_league_list(state, league) {
			let url ="/api/shuju/public/index.php?_url=/data/index&league="+ league +"&tab=积分榜&year=[year]";
			axios.get(url, {}).then((res) => {
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
				axios.get(API.tuji_url + object.id, {}).then((res) => {
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
			axios.get(API.footballTeam + "?league=" + object.league_id + "&teamId=" + object.team_id, {}).then((res) => {
				if (res.status == 200) {
					let data = JSON.parse(res.data.body)
					// console.log(data)
					state.football_team = data;
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
			state.football_team.team_name = obj.team_name;
			state.football_team.team_logo = obj.team_logo;
			state.football_team.team_id = obj.team_id;
			state.football_team.league_id = obj.league_id;
		},
		get_news (state) {
			axios.get('http://localhost:3000/PickNews', {}).then((res) => {
				if (res.status == 200) {
					state.news = res.data.data;
				}
			})
		},
		get_banner (state) {
			axios.get('http://localhost:3000/getImg',{}).then(res => {
				if (res.status == 200) {
					state.banners = res.data.data;
				}
			})
		},
		get_end_game (state, date) {
			Indicator.open({
				text: '加载中...',
				spinnerType: 'snake'
			});
			axios.get('https://m.zhibo8.cc/json/record/'+ date +'.htm',{}).then(res => {
				if(res.status == 200){
					state.end_game.push(res.data)
					Indicator.close()
				} else {
					Indicator.close()
				}
			})
		}
	},	
	getters: {
		teams(state) {
			var teams = state.league.teamList
			return teams;
		},
		news (state) {
			return state.news;
		},
		banners (state) {
			return state.banners;
		},
		end_game (state) {
			return state.end_game;
		},
		NBA (state) {
			return state.NBA;
		}
	}
})

export default store