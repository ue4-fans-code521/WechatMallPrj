// components/cp-nav/cp-nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentindex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTapClk(event) {
      //首先我们应该拿到点击事件中传递过来的index
      var idx = event.currentTarget.dataset.index
      // console.log(idx)
      //下面我们就可以把获得的点击的index设置到currentindex中
      this.setData({
        currentindex: idx
      })

      //下面我们就可以把自定义的事件传递到引用页面中去
      this.triggerEvent("cp_nav_event",{idx:idx},{})
    }
  }
})