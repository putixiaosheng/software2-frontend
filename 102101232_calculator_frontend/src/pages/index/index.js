// index.js
// 获取应用实例
import Toast from '@vant/weapp/toast/toast';
const app = getApp()
const num_and_op = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '(', ')', ',', '.']
const tri_op = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sqrt', 'log']
const tri_op3 = ['asin', 'acos', 'atan', 'sqrt']
Page({
    data: {
        show_cal: false,
        history_content: [],
        show_history: false,
        result: '',
        formula: '',
        value1: 1,
        option1: [{
                text: '科学计算器',
                value: 0
            },
            {
                text: '普通计算器',
                value: 1
            },
        ],
        equal_op: '=',
        button: [
            '(', ')', 'C', 'back', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '+', '0', '.'
        ],
        button1: [
            'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log'
        ]
    },
    // 事件处理函数
    go_navi() {
        wx.reLaunch({
            url: '/pages/index/index',
        })
    },
    go_rate() {
        wx.reLaunch({
            url: '/pages/rateindex/rateindex',
        })
    },
    go_rate_change() {
        wx.reLaunch({
            url: '/pages/ratechange/ratechange',
        })
    },
    choose_cal() {
        this.setData({
            show_cal: true
        })
    },
    show_history_m() {
        wx.request({
            url: 'http://127.0.0.1:8000/user/first/',
            success: (res) => {
                if (res.data.code == 200) {
                    this.setData({
                        history_content: res.data.data
                    })
                }
            }
        })
        this.setData({
            show_history: true
        })
    },
    close_cal() {
        this.setData({
            show_cal: false
        })
    },
    close_history_m() {
        this.setData({
            show_history: false
        })
    },
    change_menu(value) {
        this.setData({
            value1: value.detail
        })
    },
    input_num(e) {
        let item = e.target.dataset.num
        let item1 = e.target.dataset.sin
        if (item1 != undefined) {
            this.setData({
                formula: this.data.formula + item1
            })
            return 0
        }
        if (item == 'C') {
            this.setData({
                formula: ''
            })
        } else if (item == 'back') {
            let len_res = this.data.formula.length
            let res = this.data.formula
            console.log(res)
            if (res[len_res - 1] == '(' && num_and_op.indexOf(res[len_res - 2]) == -1) {
                console.log(tri_op3.indexOf('cos'))
                console.log(res.slice(len_res - 5, len_res - 1))
                if (tri_op3.indexOf(res.slice(len_res - 5, len_res - 1)) == -1) {
                    console.log('aaa')
                    this.setData({
                        formula: this.data.formula.substr(0, len_res - 4)
                    })
                } else {
                    this.setData({
                        formula: this.data.formula.substr(0, len_res - 5)
                    })
                }
            } else if (num_and_op.indexOf(res[len_res - 1]) >= 0) {
                this.setData({
                    formula: this.data.formula.substr(0, len_res - 1)
                })
            }
            //if(res[len_res-1])
        } else {
            this.setData({
                formula: this.data.formula + item
            })
        }
    },
    input_sin(e) {
        this.setData({
            formula: this.data.formula + e.target.dataset.sin + '('
        })
    },
    commit() {
        let that = this
        wx.request({
            url: 'http://127.0.0.1:8000/user/first/',
            data: {
                "mathematical_formula": that.data.formula
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            success: (res) => {
                if (res.data.code == 200) {
                    this.setData({
                        result: res.data.result
                    })
                } else if (res.data.code == 401) {
                    Toast.fail('0不能作为除数')
                    this.setData({
                        result: 'error'
                    })
                } else if (res.data.code == 402) {
                    Toast.fail('括号匹配有误')
                    this.setData({
                        result: 'error'
                    })
                } else if (res.data.code == 400) {
                    Toast.fail('算式错误')
                    this.setData({
                        result: 'error'
                    })
                }
            }
        })
    },
    bindViewTap() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad() {
        wx.request({
            url: 'http://127.0.0.1:8000/user/first/',
            success: (res) => {
                if (res.data.code == 200) {
                    this.setData({
                        history_content: res.data.data
                    })
                }
            }
        })
    },
    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                console.log(res)
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        })
    },
    getUserInfo(e) {
        // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
        console.log(e)
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})