// pages/rateindex.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        money: '',
        show_time: false,
        checked: false,
        year: '',
        year1: '',
        ser_type: 0,
        show_cas: true,
        show_cal: false,
        result: '',
        formula: '',
        show_history: false,
        cascaderValue: '',
        fieldValue: '',
        columns: [0.25, 0.5, 1, 2, 3, 5],
        options: [{
                text: '借款',
                value: '10',
                children: [{
                        text: '活期存款',
                        value: '11'
                    },
                    {
                        text: '三个月',
                        value: '12'
                    },
                    {
                        text: '半年',
                        value: '13'
                    },
                    {
                        text: '一年',
                        value: '14'
                    },
                    {
                        text: '二年',
                        value: '15'
                    },
                    {
                        text: '三年',
                        value: '16'
                    },
                    {
                        text: '五年',
                        value: '17'
                    },
                ],
            },
            {
                text: '贷款',
                value: '20',
                children: [{
                        text: '六个月',
                        value: '21'
                    },
                    {
                        text: '一年',
                        value: '22'
                    },
                    {
                        text: '一至三年',
                        value: '23'
                    },
                    {
                        text: '三至五年',
                        value: '25'
                    },
                    {
                        text: '五年',
                        value: '26'
                    },
                ],
            },
        ]
    },
    change_time(event) {
        const {
            picker,
            value,
            index
        } = event.detail;
        this.setData({
            year1: value
        })
    },
    show_choose_time() {
        this.setData({
            show_time: true
        })
    },
    close_choose_time() {
        this.setData({
            show_time: false
        })
    },
    change_check() {
        this.setData({
            checked: !this.data.checked,
            year1: ''
        })
    },
    choose_ser(e) {
        let data = e.target.dataset.name
        this.setData({
            ser_type: data,
            year1: '',
            year: ''
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onFinish(e) {
        const {
            selectedOptions,
            value
        } = e.detail;
        const fieldValue = selectedOptions
            .map((option) => option.text || option.name)
            .join(' ');
        this.setData({
            formula: fieldValue,
            fieldValue,
            cascaderValue: value,
        })
        console.log(this.data.fieldValue)
        console.log(this.data.cascaderValue)
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
    close_history_m() {
        this.setData({
            show_history: false
        })
    },
    judge_num(num) {
        if (this.data.checked == true) {
            return "live"
        }
        if (this.data.ser_type == 1) {
            if (num == 0.25) {
                return "three_month"
            } else if (num == 0.5) {
                return "half_year"
            } else if (num == 1) {
                return "one_year"
            } else if (num == 2) {
                return "two_year"
            } else if (num == 3) {
                return "three_year"
            } else if (num == 5) {
                return "five_year"
            }
        } else {
            if (num < 0.5) {
                return "half_year"
            } else if (num < 1) {
                return "one_year"
            } else if (num < 3) {
                return "one_to_three_year"
            } else if (num < 3) {
                return "three_to_five_year"
            } else if (num < 5) {
                return "five_year"
            }
        }
    },
    toggle(event) {
        const {
            index
        } = event.currentTarget.dataset;
        const checkbox = this.selectComponent(`.checkboxes-${index}`);
        checkbox.toggle();
    },
    submit() {
        let data = this.data
        let str = this.judge_num(data.year1)
        let str1 = this.judge_num(data.year)
        if (data.ser_type == 1) {
            wx.request({
                url: 'http://127.0.0.1:8000/user/second/',
                data: {
                    data: str
                },
                success: (res) => {
                    console.log(res.data)
                    this.setData({
                        result: res.data.data * data.year1 * data.money * 0.01
                    })
                }
            })
        } else {
            wx.request({
                url: 'http://127.0.0.1:8000/user/three/',
                data: {
                    data: str1
                },
                success: (res) => {
                    console.log(res.data)
                    this.setData({
                        result: res.data.data * data.year * data.money * 0.01
                    })
                }
            })
        }
    },
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