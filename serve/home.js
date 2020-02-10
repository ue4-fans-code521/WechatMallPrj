import getMultiData from "./network.js"
import getGoodsData from "./network.js"

export function requestData() {
  return getMultiData({
    url: "/home/multidata"
  })
}

export function requestGoods(type, page) {
  return getGoodsData({
    url:"/home/data",
    data: {
      type,
      page
    }
  })
}