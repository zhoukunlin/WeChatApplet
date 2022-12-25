# 快速预览

 <img src="https://dcdn.it120.cc/2020/05/25/e4d25c03-4bd7-4dc5-9032-9c6d55c7ff6a.gif" width="375px">
 
 ## 扫码体验

<img src="https://dcdn.it120.cc/2021/08/17/6930b217-07f2-4245-8d25-812ee89d60b6.jpg" width="200px">
 
# 关于本项目

fire-shop-lite是一个电商小程序前端开源项目，基于[wechat-app-mall](https://github.com/EastWorld/wechat-app-mall)二次开发而来。

主要功能包括：

1.拼团

2.砍价

3.分销

4.商品海报生成

5.优惠券

……

国内仓库：[码云仓库](https://gitee.com/dream_debug/fire-shop-lite.git)

# 注意事项
没有直播权限的小伙伴，可以自行去掉直播插件

1.app.json中去掉直播插件
~~~
"live-player-plugin": {
	"version": "1.0.8", 
	"provider": "wx2b03c6e691cd7370"
}
~~~
2.pages/index/index.wxml中删除或注释掉直播插件引用
~~~
<navigator wx:if="{{aliveRooms.length> 0}}" url="plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id={{aliveRooms[0].roomid}}" class="live-ad padding-tb">
	<image src="../../images/live_ad.png"></image>
</navigator>
~~~
# 文档教程

[文档教程](https://www.kancloud.cn/thundersword/fire-shop-lite/)

# 使用到的开源项目

 [微信电商小程序EastWorld /wechat-app-mall](https://github.com/EastWorld/wechat-app-mall)
 
 [api工厂小程序接口SDK](https://github.com/gooking/apifm-wxapi)
 
 [鲜亮的高饱和色彩，专注视觉的小程序组件库ColorUI](https://github.com/weilanwl/ColorUI)
 
 [小程序海报组件-生成朋友圈分享海报并生成图片](https://github.com/jasondu/wxa-plugin-canvas)



## 接口 & 后台声明

本项目为小程序商城纯前端项目，由于人力和精力所限，本项目并未有开发配套的后台系统，而是直接使用了 [api 工厂](https://www.it120.cc/?referrer=9436) 提供的免费接口和后台，可以完全满足本项目的所有功能需求。

## 初始化测试数据

[注册api工厂](https://www.it120.cc/?referrer=9436)

登录后台，左侧菜单 “工厂设置” --> “数据克隆” --> “将别人的数据克隆给我”

对方商户ID填写  9436

点击 “立即克隆” ，然后退出后台重新登录

你将立即享有初始化测试数据，方便你进行测试

## 编译说明

本项目使用了npm模块，请在项目设置中勾选“使用npm模块”

本项目使用基于 ES7 的语法，所以请在开发工具中开启 “增强编译”， 否则会提示以下错误：

```
thirdScriptError 
 sdk uncaught third Error 
 regeneratorRuntime is not defined 
 ReferenceError: regeneratorRuntime is not defined
```

<img src="https://dcdn.it120.cc/2019/08/28/c5169c15-abda-4e5f-91d5-6dfcfe382fb2.png">

**如果你的开发工具没用看到“增强编译”的选项，请升级开发工具到最新版**

## 使用说明

1、申请后台账号/获取专属域名

2、开通商城模块

<img src="https://cdn.it120.cc/apifactory/2018/11/14/b61fe6ffb2460f7e4554758b394814f5.png">

3、修改根目录下 config.js 文件

```javascript
module.exports = {
  version: "2.0.0",
  note: '增加拼团砍价和分销,优化UI', // 这个为版本描述，无需修改
  subDomain: "fireshop", // 根据教程 https://www.yuque.com/apifm/doc/qr6l4m 查看你自己的 subDomain
  shareProfile: '隐于市,独木成“琳”', // 首页转发的时候话术
  goodsDetailSkuShowType: 0, // 0 为点击立即购买按钮后出现规格尺寸、数量的选择； 1为直接在商品详情页面显示规格尺寸、数量的选择，而不弹框
}
```

4、[设置小程序合法服务器域名](https://www.yuque.com/apifm/doc/tvpou9)

5、重启您的小程序开发工具，完成

6、如何在后台管理小程序启动图和首页头部的轮播 banner 图片

```
这两个功能都是使用后台 “系统设置” --> “banner” 管理功能来实现的；
后台发布banner的时候，自定义类型请分别填写  app  和  home
小程序会自动读取类型为 app 的banner图片作为启动展示图片；
小程序会自动读取类型为 home 的banner图片作为首页的轮播图；
```

7、如果需要使用分享海报功能(海报中需要调用小程序用户头像)，需要将域名wx.qlogo.cn加入downloadFile合法域名

8、订阅消息(以前的模板消息)如何使用？请查阅 “api工厂” 的教程：

[https://www.yuque.com/apifm/doc/sw1dg9](https://www.yuque.com/apifm/doc/sw1dg9)

## 系统参数设置

*登录后台，左侧菜单“系统设置” --> “系统参数” 菜单；如果你找不到该菜单，那是因为你还没启用 “系统参数设置” 的模块，左侧菜单“系统设置” --> “模块管理”，启用 “系统参数设置” 模块，然后F5刷新网页即可*

- RECHARGE_OPEN （开关类型）
  
  **微信审核的时候，如果你的小程序有充值功能会导致审核不通过，所以默认情况下，小程序将隐藏充值提现功能，通过该参数可开启充值提现的显示**

- ROLE_FOR_SHOP （开关类型）
  
  **如果你有多店铺功能，改功能将开启店铺管理员功能，届时，每个店铺管理员将只能管理自己店铺下的商品和订单，而无法查看并管理其他店铺的订单**

- ALLOW_SELF_COLLECTION （开关类型）
  
  **是否开启到店自提功能（快递和到店自提客户自己可以选择）**

- WITHDRAW_FEE_PERCENT （文本参数）
  
  **提现手续费比例，填1为 1%**

- free_shipping_for_purchases （文本参数）
  
  **下单金额满多少后实现包邮**

- mallName （文本参数）
  
  **小程序名称（商城名称）**

- REGISTER_OPEN_SELLER （开关类型）
  
  **新注册用户是否自动成为分销商，如果不开启该参数，分销商需要自己申请，你进行审核**
- categoryLevel （文本参数）
  
  **分类页显示分类级别，可选参数1和2，值为1时，右侧直接显示产品列表，其他值时，显示二级分类**
- CATEGORY_BY_TAGS （开关类型）
  
  **是否启用按tags分类，在categoryLevel=1时该参数有效，可用于一个商品属于多分类的场景**
  
  [《api工厂三级分销插件使用教程》](https://www.yuque.com/apifm/doc/pgfwvu)

## 常见问题

- 如何修改小程序商城的标题？

  请查看上面的系统设置中的 **mallName**

- “无法登录” / Token 无效 ？

  1. config.js 里面的 subDomain 改成你自己的，保存；
  2. 登录你的小程序后台（MP 那个地址），Request 域名处增加 api.it120.cc
  3. 确保小程序后台（MP 那个地址） 的 appid，工厂后台填写的 appid ，开发工具右上角 “项目详情” 打开后显示的 appid ，这 3 个 appid 是一模一样的；
  4. 开发工具上点击 “清除缓存” —> “编译”

- 登录后台发布您自己的商品

- [如何给 Banner 增加链接，点击打开某个商品？](https://www.yuque.com/apifm/doc/wv5p5l)

- 工厂后台设置 appid、secret、微信支付商户号和秘钥时候的 token 怎么填？

  **token不要填！**

  **token不要填！**

  **token不要填！**

  **重要的事情说三遍，这个小程序用不到，是给服务号使用的，所以大家空着不要填**

- 微信支付时候，提示 50000 错误，不能获取到预支付 id

  > 这个错误是无法获取到微信支付的预支付信息

  - 可能是你没有在后台配置您的微信支付商户号和秘钥，或者配置错误
  - 可能是你配置的微信支付不是当前小程序申请的（微信支付目前无法跨小程序调用）
  - 确保微信开发工具上面登录的 APPID 和你在后台配置的 APPID 是同一个

- 如何参与项目？

  


  1. 点击页面顶部的 Star ，关注后，项目有最新动态 github 会提醒您，不错过重要更新；
  2. 点击页面顶部的 Fork， 将您需要增加的功能完成 小程序 端界面的调整，然后在 github 上请求将您的代码合并到 fire-shop-lite；
  3. 您的代码合并请求审核通过后，我们会将代码合并到项目中；
  4. 开源项目离不开您的支持和代码共享，我们一起把 fire-shop-lite 项目长期维护下去；
  5. 也欢迎设计师朋友提供UI设计支持

- 下单的时候没有地方填写收货地址？

  1. 添加一个“物流模板”，只有需要快递的商品才会提示用户填写收货地址
  2. 发布商品的时候，选择刚才添加的“物流模板”
  3. 重新下单，将会需要用户输入收货地址

- 后台设置 appid 和 secret 的时候提示不正确？

  1. 请确认您填写的 appid 和 secret 是否正确
  2. 输入的时候确保没有空格（复制的时候可能会多复制了空格）
  3. 在微信后台设置服务器 IP 地址白名单（106.14.43.122）

- 如何使用退款功能？

  1. 后台支持针对订单指定退款多少金额；
  2. 可选择退款至用户可用余额或者按照用户支付原路退还第三方或者银行卡；
  3. 如果选用原路退还，需要在商户号和秘钥设置的地方上传您的微信支付证书文件（PK12 格式文件）

- 如何设置满多少包邮？

  1. 后台系统设置 -- 系统参数，增加系统参数；
  2. 参数名 free_shipping_for_purchases （注意不要有空格）
  3. 参数值填写您希望的买满金额即可

- 如何修改或者关闭订单超过 30 分钟未付款自动关闭？

  1. 创建订单接口增加 expireMinutes 参数；
  2. 代表多少分钟未支付自动关闭本订单，传 0 不自动关闭订单；


- android看得到图片，ios手机看不到图片
  
  这是wxparse解析器的问题 很多人都中枪~

  全局搜索并注释掉 console.dir 就好了

- [更多问题？](https://www.yuque.com/apifm/doc)
  
## 如何升级到最新版

- 小程序程序的修改和您后台的数据是独立的，所以不用担心您会丢失数据
- 先把你开发工具下的现有版本程序备份
- 下载最新版的程序，直接覆盖您本地的程序
- 用开发工具修改域名 mall 为你自己的域名
- 开发工具里面上传代码提交微信审核
- 审核通过后，小程序后台去发布新版本即可
- 用户无需重新扫码，关闭小程序重新打开就是新版本了

# 使用交流

|技术交流QQ群 878573318（口令：fire-shop-lite）|联系作者|
| :------: | :------: |
|<img src="https://box.kancloud.cn/7c84f8cccee146b86a7b9edaa23d4796_540x740.png" width="200px">|<img src="https://dcdn.it120.cc/2020/02/16/6c39cf7a-9480-4e23-baf3-912c8cc62bfa.jpg" width="200px">|

# 赞赏

| 微信赞赏 | 支付宝打赏 | 免费领美团饿了么红包 |
| :------: | :------: |:------: |
| <img src="https://dcdn.it120.cc/2020/02/16/256e8788-73b7-40d1-8c1b-e952ff99501e.jpg" width="200px"> | <img src="https://dcdn.it120.cc/2020/02/16/42036389-dd76-4ab5-813e-7c7bd475dbc7.jpg" width="200px">|<img src="https://dcdn.it120.cc/2021/08/17/09221b53-bce2-40ab-a7f7-f63508661ae6.jpeg" width="200px">|