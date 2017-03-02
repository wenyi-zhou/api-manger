export default {
  methods: {
    verifyToString: function (verify) {
      switch (verify) {
        case 3: return '认证通过'
        case 2: return '认证不通过'
        case 1: return '正在认证'
        default: return '未认证'
      }
    },
    typeToString: function (type) {
      switch (type) {
        case 1: return '学生'
        case 2: return '老师'
        case 3: return '家长'
        case 4: return '教育机构'
        default: return '活动发布者'
      }
    },
    genderToString: function (gender) {
      switch (gender) {
        case 1: return '男'
        case 2: return '女'
        default: return '未填写'
      }
    },
    enableToString: function (enable) {
      switch (enable) {
        case 1: return '是'
        case 0: return '否'
        default: return ''
      }
    }
  }
}
