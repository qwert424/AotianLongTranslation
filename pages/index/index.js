// pages/index/index.js

import { myTranslate } from '../../utils/util'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputVal: "",
        translateVal: null,
        toLanguage: "en",
        langtext: '英语',
        oldVal: "",
    },

    // 事件处理函数
    isNull() {
        if (!this.data.inputVal) {
            this.setData({
                "translateVal": null
            })
        }
    },
    handleChangeLanguage() {
        wx.navigateTo({
            url: '/pages/change/change',
        })
    },

    async translate() {
        const resp = await myTranslate(this.data.inputVal, undefined, this.data.toLanguage === "" ? undefined : this.data.toLanguage)
        this.setData({
            "translateVal": resp.dst,
            "oldVal": this.data.inputVal
        })
        this.data.logsList.unshift({
            input: this.data.inputVal,
            translate: this.data.translateVal
        })
        wx.setStorage({
            key: "logsList",
            data: this.data.logsList
        })
    },

    handleTranslate() {
        if (this.data.inputVal) {
            if (this.data.oldVal === this.data.inputVal) {
                wx.showModal({
                    title: '提示', //提示的标题
                    content: '两次翻译内容重复,是否多次翻译?(可在历史记录查询)', //提示的内容
                    success: (res) => {
                        if (res.confirm) {
                            this.translate()
                        } else if (res.cancel) {
                            return;
                        }
                    }
                })
            } else {
                this.translate()
            }
        } else {
            wx.showToast({
                title: '请输入翻译内容！',
                icon: 'error'
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
        const toLanguage = wx.getStorageSync('Language').lang || "en";
        const logsList = wx.getStorageSync('logsList') || []
        const langtext = wx.getStorageSync('Language').chs || "英语";
        if (toLanguage === this.data.toLanguage) {
            this.setData({
                logsList,
            })
            return;
        } else {
            this.setData({
                toLanguage,
                logsList,
                langtext
            })
            if (this.data.inputVal) {
                this.translate()
            }
        }
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