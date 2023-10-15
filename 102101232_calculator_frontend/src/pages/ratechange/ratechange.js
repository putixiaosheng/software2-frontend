// pages/ratechange/ratechange.js
import Toast from '@vant/weapp/toast/toast';
const check_list_deposit = {
    "live": "活期",
    "three_month": "三个月",
    "half_year": "半年",
    "one_year": "一年",
    "two_year": "两年",
    "three_year": "三年",
    "five_year": "五年",
}
const check_list_loan = {
    "half_year": "半年",
    "one_year": "一年",
    "one_to_three_year": "一年至三年",
    "three_to_five_year": "三年至五年",
    "five_year": "五年",
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        history_content: '',
        ser_type: 0,
        deposit: [],
        deposit_dic: {},
        loan: [],
        loan_dic: {},
        disabled: true,

    },
    input_rate_m(e) {
        if (this.data.ser_type == 0) {
            let title = e.target.dataset.title
            console.log(e.detail)
            let temp_deposit = this.data.deposit
            for (let i = 0; i < temp_deposit.length; i++) {
                if (temp_deposit[i].title == title) {
                    temp_deposit[i].rate = e.detail
                    this.setData({
                        deposit: temp_deposit
                    })
                    break
                }
            }
            let temp_deposit_dic = this.data.deposit_dic
            for (var key in check_list_deposit) {
                if (check_list_deposit[key] == title) {
                    temp_deposit_dic[key] = e.detail
                    this.setData({
                        deposit_dic: temp_deposit_dic
                    })
                    break
                }
            }
        } else {
            let title = e.target.dataset.title
            console.log(e.detail)
            let temp_loan = this.data.loan
            console.log(temp_loan)
            for (let i = 0; i < temp_loan.length; i++) {
                if (temp_loan[i].title == title) {
                    temp_loan[i].rate = e.detail
                    this.setData({
                        deposit: temp_loan
                    })
                    break
                }
            }
            let temp_loan_dic = this.data.loan_dic
            for (var key in check_list_loan) {
                if (check_list_loan[key] == title) {
                    temp_loan_dic[key] = e.detail
                    this.setData({
                        loan_dic: temp_loan_dic
                    })
                    break
                }
            }
        }
    },
    change_tab_m() {
        let num = 0
        if (this.data.ser_type == 0) {
            num = 1
        }
        this.setData({
            ser_type: num
        })
    },
    if_change_m() {
        this.setData({
            disabled: !this.data.disabled
        })
    },
    submit_deposit_m() {
        if (this.data.ser_type == 0) {
            wx.request({
                url: 'http://127.0.0.1:8000/user/second/',
                method: 'POST',
                data: this.data.deposit_dic,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: (res) => {
                    Toast.success('修改成功')
                }
            })
        } else {
            console.log(this.data.loan_dic)
            wx.request({
                url: 'http://127.0.0.1:8000/user/three/',
                method: 'POST',
                data: this.data.loan_dic,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: (res) => {
                    Toast.success('修改成功')  
                }
            })
        }
    },
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
    close_cal() {
        this.setData({
            show_cal: false
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
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
        wx.request({
            url: 'http://127.0.0.1:8000/user/second/',
            success: (res) => {
                let data = res.data.data
                let list = []
                for (var key in data) {
                    if (key != 'id') {
                        let dic = {}
                        dic["rate"] = data[key]
                        dic["title"] = check_list_deposit[key]
                        list.push(dic)
                    }
                }
                this.setData({
                    deposit: list,
                    deposit_dic: data
                })
                console.log(this.data.deposit_dic)
            }
        })
        wx.request({
            url: 'http://127.0.0.1:8000/user/three/',
            success: (res) => {
                let data = res.data.data
                let list = []
                console.log(data)
                for (var key in data) {
                    if (key != 'id') {
                        let dic = {}
                        dic["rate"] = data[key]
                        dic["title"] = check_list_loan[key]
                        console.log(dic)
                        list.push(dic)
                    }
                }
                this.setData({
                    loan: list,
                    loan_dic: data
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})