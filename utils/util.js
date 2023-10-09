import md5 from "./md5.min.js";

const appid = "20231006001838120";
const secretKey = "9EWBBvcZxtsjOeONc_gs";
const url = 'https://fanyi-api.baidu.com/api/trans/vip/translate';
const random = new Date().toString();

function myTranslate(target, from = "auto", to="en") {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data: {
        "q": target,
        from,
        to,
        "appid": appid,
        "salt": random,
        "sign": md5(`${appid}${target}${random}${secretKey}`)
      },
      success(resp) {
        if(resp.data && resp.data.trans_result){
          wx.showToast({
            title: '翻译成功',
            icon: "success",
          })
          resolve(resp.data.trans_result[0])
        }else{
          reject({
            status: "error",
            msg: "翻译失败"
          })
        }
      },
      fail() {
        wx.showToast({
          title: '网络异常',
          icon: "error",
        })
        reject({
          status: "error",
          msg: "翻译失败"
        })
      }
    })
  })
}

module.exports = {
  myTranslate
}
