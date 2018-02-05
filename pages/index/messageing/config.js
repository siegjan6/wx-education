module.exports = {
  // 基础类型输入框配置
  base: {
    name: {
      title: '收货人',
      placeholder: '名字'
    },
    tel: {
      error: true,
      title: '联系电话',
      inputType: 'number',
      placeholder: '请输入手机号'
    },
    address: {
      title: '详细地址',
      type: 'textarea',
      placeholder: '请输入详细地址'
    }
  },
  // 无标题输入框
  notitle: {
    placeholder: '请输入收货人姓名',
    componentId: 'textarea:test'
  },
  // Form 中使用输入框
  form: {
    name: {
      placeholder: '姓名',
      componentId: 'form:test:name'
    },
    tel: {
      name: 'tel',
      inputType: 'tel',
      placeholder: '手机号码',
      componentId: 'form:test:tel'
    },
    detail: {
      name: 'tel',
      type: 'textarea',
      placeholder: '留言',
      componentId: 'form:test:detail'
    }
  }
};
