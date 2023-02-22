var express = require('express');
var router = express.Router();
var connection = require('../db/sql.js');
var mail = require("../api/mail.js")
var jwt = require('jsonwebtoken')
//引入支付宝配置文件
const alipaySdk = require('../api/alipay');
const AlipayFormData = require('alipay-sdk/lib/form').default;
// 解析qs
const qs = require('qs');
const axios = require('axios');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
// 连接数据库
connection.connect(function (err) {
  if (!err) {
    console.log("数据库连接成功")
  } else {
    console.error("数据库连接失败", err);
  }
})

// HometopBar
router.get('/api/home', (req, res, next) => {
  let sql = `select label from topBar`
  connection.query(sql, (err, result) => {
    res.send({
      code: 0,
      data: result
    })
  })
})

// HomeList
router.get('/api/home/goods', (req, res, next) => {
  let Goodstype = req.query.type
  let sql = ''
  // type为0时是综合查visits
  if (Goodstype == 0) {
    sql = `select * from goods order by visits desc`
  } else {
    sql = `select * from goods where type = ${Goodstype}`
  }

  connection.query(sql, (err, result) => {
    res.send({
      code: 0,
      data: result
    })
  })
})

// SearchList
router.get('/api/search/goods', (req, res) => {
  let [searchName, orderName] = Object.keys(req.query)
  let [name, order] = Object.values(req.query)
  let sql = `select * from goods where name like '%${name}%' order by ${orderName} ${order} `
  connection.query(sql, (err, result) => {
    res.send({
      code: 0,
      data: result
    })
  })
})
// detail
router.get(`/api/Detail`, (req, res) => {
  let id = req.query.id;
  let sql = `select * from goods where id = ${id}`
  connection.query(sql, (err, result) => {
    res.send({
      code: 0,
      data: result
    })
  })
})

// login
router.post(`/api/loginCheck`, (req, res) => {
  //后端要接收前端传递过来的值
  let username = req.body.user
  let passsword = req.body.pwd
  var sqlEmail = `select * from user where email = '${username}'`
  var sqlPassword = `select * from user where email = '${username}' and password = '${passsword}'`
  // 生成token
  let payload = { email: username };
  let secret = 'zhukaijie';
  let token = jwt.sign(payload, secret)
  // 查询用户是否存在
  connection.query(sqlEmail, (err, result) => {
    if (result.length > 0) {
      console.log(result);
      // 存在
      connection.query(sqlPassword, (err, result) => {
        if (result.length > 0) {
          console.log(typeof result[0].id);
          // 添加token
          console.log(token);
          console.log(result[0].id);
          connection.query(`update user set token = '${token}' where id = '${result[0].id}'`, (err, result) => { })
          res.send({
            code: 200,
            data: {
              msg: '登录成功',
              success: true,
              data: result[0]
            }
          })
        } else {
          res.send({
            code: 302,
            data: {
              msg: '用户名或密码错误',
              success: false,
            }
          })
        }
      })
    } else {
      res.send({
        code: 301,
        data: {
          msg: '用户名或密码错误',
          success: false,
        }
      })
    }
  })
})

// register
router.post(`/api/register`, (req, res) => {
  // 前端传递的数据
  console.log(req.body.userInfo.password);
  var params = {
    email: req.body.userInfo.email,
    passsword: req.body.userInfo.password,
    username: req.body.userInfo.username
  }
  var sqlEmail = `select * from user where email = '${params.email}'`
  var insertUser = `insert into user (id,email,password,name) values (DEFAULT,'${params.email}','${params.passsword}','${params.username}')`
  // 查询用户是否存在
  connection.query(sqlEmail, (err, result) => {
    if (result.length > 0) {
      res.send({
        code: 301,
        data: {
          msg: '用户已存在',
          success: false
        }
      })
    } else {
      connection.query(insertUser, (err, result) => {
        res.send({
          code: 200,
          data: {
            msg: '注册成功',
            success: true,
            data: result
          }
        })
      })
    }
  })
})
// cart
router.get(`/api/Cart`, (req, res) => {
  const token = req.query.token
  let email = jwt.decode(token).email
  // 查询购物车表中 当前用户所对应的商品id 通过连接查询 goods_cart.id = goods.id 去获取商品表中的商品数据
  let sqlGoodsCart = `select goods.id,goods.name,goods.content,goods.price,goods.imgUrl,goods_cart.addnum from goods,goods_cart where goods_cart.goods_id = goods.id and goods_cart.uemail = '${email}'`
  connection.query(sqlGoodsCart, (err, result) => {
    console.log(result);
    res.send({
      code: 0,
      data: result
    })
  })
})

// 加入购物车
router.post(`/api/addCart`, (req, res) => {
  // 前端传来token
  let token = req.body.token
  // 解析token拿到邮箱
  let email = jwt.decode(token).email
  // 商品id
  let storeId = req.body.id
  // 用户名称
  let name = req.body.name


  // 通过商品id和用户id来确定 查询用户之前是否添加过购物车
  let sqlCart = `select * from goods_cart where uemail='${email}' and goods_id='${storeId}'`
  connection.query(sqlCart, ((err, result) => {
    if (result.length > 0) {
      //  添加过 商品数量+1
      let addnum = result[0].addnum + 1
      let updateNum = `update goods_cart set addnum = '${addnum}' where uemail='${email}' and goods_id='${storeId}' `
      connection.query(updateNum, ((err, result) => {
        res.send({
          code: 200,
          success: true,
          msg: '添加成功'
        })
      }))
    } else {
      // 没添加过
      let insertCart = `insert into goods_cart (id,uemail,goods_id,username,addnum) values (default,'${email}','${storeId}','${name}',1) `
      connection.query(insertCart, ((err, result) => {
        res.send({
          code: 200,
          success: true,
          msg: '添加成功'
        })
      }))
    }
  }))

})
// 购物车商品数量
router.post(`/api/updateCartNum`, (req, res) => {

  // 解析token
  let token = req.body.token
  let email = jwt.decode(token).email
  let num = req.body.num
  let goodsId = req.body.goodsId
  let updateNum = `update goods_cart set addnum = '${num}' where uemail ='${email}' and goods_id = '${goodsId}'`
  connection.query(updateNum, ((err, result) => {
    res.send({
      code: 200,
      data: result
    })
  }))
})
// 购物车删除
router.post(`/api/deleteCartGoods`, (req, res) => {
  let token = req.body.token
  let email = jwt.decode(token).email
  let goodsId = req.body.goodsId
  let goodsMap = goodsId.toString()
  console.log(goodsMap);
  let deleteGoods = `delete from goods_cart where uemail = '${email}' and goods_id in (${goodsMap}) `
  console.log(deleteGoods);
  connection.query(deleteGoods, ((err, result) => {
    res.send({
      code: 200,
      msg: '删除成功！'
    })
  }))
})
// 获取地址
router.post(`/api/address`, (req, res) => {
  let token = req.body.token
  let email = jwt.decode(token).email
  console.log(email);
  let sqlEmail = `select * from user_address where uemail = '${email}'`
  connection.query(sqlEmail, ((err, result) => {
    res.send({
      code: 0,
      data: result
    })
  }))
})
// 添加地址
router.post(`/api/addAddress`, (req, res) => {
  let token = req.body.token
  let email = jwt.decode(token).email
  let content = req.body.content
  let address = `${content.province}-${content.city}-${content.county}-${content.addressDetail}`
  let name = content.name
  var isDefault = content.isDefault
  let tel = content.tel
  let areaCode = content.areaCode
  // 如果添加的是默认地址 就把其他的默认地址关闭
  if (isDefault) {
    connection.query(`update user_address set isDefault = ${!isDefault} where uemail = '${email}'`)
  }
  let insertAddress = `insert into user_address (id,uemail,address,addressDetail,isDefault,tel,name,areaCode)values (default,'${email}','${address}','${content.addressDetail}',${isDefault},'${tel}','${name}','${areaCode}')`
  connection.query(insertAddress, ((err, result) => {
    res.send({
      code: 200,
      msg: '添加成功！'
    })
  }))
})
// 删除地址
router.post(`/api/deleteAddress`, (req, res) => {
  let token = req.body.token
  var email = jwt.decode(token).email
  let id = req.body.addresId
  let deleteAddress = `delete from user_address where id = '${id}'`
  connection.query(deleteAddress, ((err, result) => {
    res.send({
      code: 200,
      msg: '删除成功！'
    })
  }))
})
// 修改地址
router.post(`/api/updateAddress`, (req, res) => {
  let token = req.body.token
  let email = jwt.decode(token).email
  let id = req.body.content.id
  let content = req.body.content
  let address = `${content.province}-${content.city}-${content.county}-${content.addressDetail}`
  let name = content.name
  let isDefault = content.isDefault
  let tel = content.tel
  let areaCode = content.areaCode
  // 如果添加的是默认地址 就把其他的默认地址关闭
  if (isDefault) {
    connection.query(`update user_address set isDefault = ${!isDefault} where uemail = '${email}'`)
  }
  let updateAddress = `update user_address set address = '${address}',isdefault = ${isDefault} ,tel = '${tel}',areaCode = '${areaCode}' , name = '${name}' where id ='${id}'`
  connection.query(updateAddress, ((err, result) => {
    res.send({
      code: 200,
      msg: '修改成功！'
    })
  }))
})
// 没有默认地址时 选择列表第一个
router.post(`/api/selectDefaultAddress`, (req, res) => {
  let id = req.body.id
  let updateDefaultAddress = `update user_address set isdefault = true where id = '${id}'`
  connection.query(updateDefaultAddress, (err, result) => {
    res.send({
      code: 0
    })
  })
})
// 订单页拿默认地址
router.post(`/api/getDefaultAddress`, ((req, res) => {
  let token = req.body.token
  let email = jwt.decode(token).email
  let sqlDefaultAddress = `select * from user_address where uemail = '${email}' and isDefault = true`
  connection.query(sqlDefaultAddress, (err, result) => {
    res.send({
      code: 200,
      data: result
    })
  })
}))
// 生成订单
router.post(`/api/submitOrder`, ((req, res) => {
  let token = req.body.token
  let email = jwt.decode(token).email
  let addressId = req.body.addressId
  // 价格
  let price = req.body.price
  // 订单的商品id 和 对应数量  ==> 存入goods字段  [ '24:1', '19:1', '25:1', '5:1' ]
  let idNum = []
  req.body.goodsList.forEach(e => {
    idNum.push(`${e[0].id}:${e[0].addnum}`)
  });
  idNum = idNum.toString()
  //生成订单号order_id，规则：时间戳 + 6为随机数
  function setTimeDateFmt(s) {
    return s < 10 ? '0' + s : s
  }
  function randomNumber() {
    const now = new Date();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    month = setTimeDateFmt(month);
    day = setTimeDateFmt(day);
    hour = setTimeDateFmt(hour);
    minutes = setTimeDateFmt(minutes);
    seconds = setTimeDateFmt(seconds);
    let orderCode = now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + (Math.round(Math.random() * 1000000)).toString();
    return orderCode;
  }
  /*
  未支付：1
  支付成功：2
  */
  //订单号
  let orderId = randomNumber();
  let insertOrder = `insert into orders (order_id,goods,order_price,uemail,order_status,address_id) values ('${orderId}','${idNum}','${price}','${email}','1','${addressId}')`
  connection.query(insertOrder, ((err, result) => {
    res.send({
      code: 200,
      data: orderId, price,
      success: true
    })
  }))
}))
// 发起支付
router.post(`/api/payment`, ((req, res) => {
  // 解析序列化qs
  let data = qs.parse(req.body.data);
  console.log(data);
  //订单号
  let orderId = data.orderId;
  //商品总价
  let price = data.totalPrice;
  //购买商品的名称
  let name = 'test';
  //开始对接支付宝API
  console.log(orderId, price);
  const formData = new AlipayFormData();
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.setMethod('get');
  //支付时信息
  formData.addField('bizContent', {
    outTradeNo: orderId,//订单号
    productCode: 'FAST_INSTANT_TRADE_PAY',//写死的
    totalAmount: price,//价格
    subject: name,//商品名称
  });
  //支付成功或者失败跳转的链接
  formData.addField('returnUrl', 'http://localhost:8080/payment');
  //返回promise
  const result = alipaySdk.exec(
    'alipay.trade.page.pay',
    {},
    { formData: formData },
  );
  //对接支付宝成功，支付宝方返回的数据
  result.then(resp => {
    res.send({
      data: {
        code: 200,
        success: true,
        msg: '支付中',
        paymentUrl: resp
      }
    })
  })
}))
// 判断支付状态
router.post('/api/successPayment', function (req, res, next) {
  //订单号
  let data = qs.parse(req.body.data);
  let out_trade_no = data.out_trade_no;
  let trade_no = data.trade_no;
  console.log(data);
  //支付宝配置
  const formData = new AlipayFormData();
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.setMethod('get');
  //支付时信息
  formData.addField('bizContent', {
    out_trade_no,
    trade_no
  });
  //返回promise
  const result = alipaySdk.exec(
    'alipay.trade.query',
    {},
    { formData: formData },
  );
  //后端请求支付宝
  result.then(resData => {
    axios({
      method: 'GET',
      url: resData
    }).then(data => {
      let responseCode = data.data.alipay_trade_query_response;
      console.log(responseCode.code);
      if (responseCode.code != '40004') {
        connection.query(`update orders set order_status = replace(order_status,'1','2') where order_id = ${out_trade_no}`, (err, result) => {
          res.send({
            data: {
              code: 2,
              msg: '交易成功',
              order_id: out_trade_no
            }
          })
        })
      }
    }).catch(err => {
      res.send({
        data: {
          code: 404,
          msg: '交易失败',
          err
        }
      })
    })
  })
})
// 我的->订单列表
router.post(`/api/OrderList`, ((req, res) => {
  console.log(req.body);
  let token = req.body.token
  let email = jwt.decode(token).email
  let sqlOrder = `select * from orders where uemail = '${email}'`
  connection.query(sqlOrder, (err, result) => {
    res.send({
      code: 0,
      data: result
    })
  })
}))
/*
  邮箱验证
*/
router.get("/api/login", (req, res) => {
  //附带的邮箱地址
  const email = req.query.email;
  console.log(email);
  //随机生成一个验证码
  let code = parseInt(Math.random() * 10000);
  //使用mail模块中的sendMail方法
  mail
    .sendMail(email, code)
    .then(() => {
      res.send({ err: 0, msg: "验证码已发送", code, success: true });
    })
    .catch(() => {
      res.send({ err: 1, msg: "验证码发送失败", success: false });
    });
});


























/*
  后台
*/
router.get(`/admin/store`, (req, res) => {
  let sql = `select * from goods`
  connection.query(sql, (err, result) => {
    res.send({
      code: 0,
      data: result
    })
  })
})
module.exports = router;
