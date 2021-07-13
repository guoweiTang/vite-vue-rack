const allServices = [
  {
    id: 'aPE6DlkD',
    title: 'wlytest1',
    version: '0.0.1',
    imgUrl:
      'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  },
  {
    id: 'b9RpYEPa',
    title: 'Apis Editor Backend API Document',
    version: '0.1.0',
    imgUrl:
      'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  },
  {
    id: 'b9RpYEPa',
    title: '示例2',
    version: '0.3.11',
    imgUrl:
      'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  },
  {
    id: 'b9RpYEPa',
    title: '示例1',
    version: '0.2.0',
    imgUrl:
      'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  },
  {
    id: 'OZE8QKMA',
    title: '用友累死了',
    version: '0.0.1',
    imgUrl:
      'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  },
  {
    id: 'ZzEGBR8J',
    title: '自定义服务3',
    version: '0.0.1',
    imgUrl:
      'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  },
  {
    id: 'ZdEb3Kj8',
    title: '用友累死了',
    version: '0.0.1',
    imgUrl:
      'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  },
  {
    id: 'a0RL3l8p',
    title: '自定义服务4',
    version: '0.0.1',
    imgUrl:
      'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  },
  {
    id: 'YqlaNRV3',
    title: '自定义服务2',
    version: '0.0.1',
    imgUrl:
      'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  },
  {
    id: 'ZxRyGKAD',
    title: '自定义服务5',
    version: '0.0.1',
    imgUrl:
      'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  },
  {
    id: 'VWlkpR1a',
    title: '自定义服务6',
    version: '0.0.1',
    imgUrl:
      'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  },
  {
    id: '3bEmOlZk',
    title: 'Swagger Petstore',
    version: '1.0.0',
    imgUrl:
      'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  },
  {
    id: 'D2l4GK3y',
    title: '鹏飞服务',
    version: '0.0.2',
    imgUrl:
      'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  },
];
const userinfo = {
  name: 'ice',
  gender: '男',
  summary: '如何促进关系升级？教你省时高效的最佳方法！',
  description: '佛曰：命由己造，相由心生，世间万物皆是化相；心不动，万物皆不动，心不变，万物皆不变',
  role: '普通用户',
};
const allUsers = [{
  email: 'admin@vuerack.com',
  password: 'vuerack',
}];
const allStores = [{
  id: '01',
  name: '7-11',
  address: '上海市普陀区真北路',
  goods: [{
    id: '01-01',
    name: '好滋好味鸡蛋仔',
    category: '江浙小吃、零食',
    spec: '200g',
    sale_date: '2001-12-18',
    description: '荷兰优质淡奶，奶香浓而不腻',
  }, {
    id: '01-02',
    name: '新疆大油条',
    category: '西北特色、主食',
    spec: '1000g',
    sale_date: '1913-08-18',
    description: '套马的汉子，新疆的棉花',
  }, {
    id: '01-03',
    name: '湖南臭豆腐',
    category: '湘西特色',
    spec: '800g',
    sale_date: '1800-04-08',
    description: '毛爷爷的故乡',
  }]
}, {
  id: '02',
  name: '罗森',
  address: '北京市海淀区大牛坊路101号',
  goods: [{
    id: '02-01',
    name: '脉动',
    category: '功能饮料、饮品',
    spec: '500ml',
    sale_date: '1921-07-01',
    description: '喝一口脉动，让你随时脉动回来',
  }, {
    id: '02-02',
    name: '好迪洗发水',
    category: '洗护用品',
    spec: '200ml',
    sale_date: '1945-08-20',
    description: '大家好，才是真的好，广州好迪',
  }, {
    id: '02-03',
    name: '脑白金',
    category: '养生药品',
    spec: '1800ml',
    sale_date: '2020-08-20',
    description: '今年过节不收礼，收礼只收脑白金',
  }, {
    id: '02-04',
    name: '雀氏纸尿裤',
    category: '母婴用品',
    spec: '18片/包',
    sale_date: '2008-08-08',
    description: '天才第一步，雀氏纸尿裤',
  }]
}];

async function getBody(req) {
  let reqbody = '';
  await new Promise((resolve) => {
    req.on('data', (chunk) => {
      reqbody += chunk;
    });
    req.on('end', () => resolve(undefined));
  });
  return JSON.parse(reqbody);
}

export default [
  {
    url: '/api/auth/login',
    method: 'post',
    rawResponse: async (req, res) => {
      const body = await getBody(req);

      const targetIndex = allUsers.findIndex(item => item.email === body.email && item.password === body.password);
      if (targetIndex > -1) {
        result = res.end(JSON.stringify({
          access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBwb2V0aWNsb3VkLmNvbSIsImV4cCI6MTYxNzE4MjY5NSwidHlwIjoiYWNjZXNzIn0.HGO39CFJCJKCsp2gvsxRba4zj3WwV1fHPk8-90Jzv7A',
          refresh_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBwb2V0aWNsb3VkLmNvbSIsImV4cCI6MTYyMjM1OTQ5NSwidHlwIjoicmVmcmVzaCJ9.He1tC8KYNzNCCZfeJIIGgSlTkT2WZ9mKjbw2VPUkDRg',
        }))
      } else {
        res.statusCode = 400;
        res.end(JSON.stringify({
          message: '账户或密码错误',
        }));
      }
    },
  },
  {
    url: '/api/auth/register',
    method: 'post',
    rawResponse: async (req, res) => {
      const body = await getBody(req);
      const targetIndex = allUsers.findIndex(item => item.email === body.email);
      if (targetIndex > -1) {
        res.statusCode = 400;
        res.end(JSON.stringify({
          message: '账户已存在，可直接登录',
        }));
      } else {
        allUsers.push({
          email: body.email,
          password: body.password,
        })
        res.end(JSON.stringify({
          message: 'OK',
        }));
      }
    }
  },
  {
    url: '/api/auth/reset-password',
    method: 'post',
    rawResponse: async (req, res) => {
      const body = await getBody(req);
      const targetIndex = allUsers.findIndex(item => item.email === body.email && item.password === body.oldPassword);
      if (targetIndex > -1) {
        if (allUsers[targetIndex].password === body.newPassword){
          res.statusCode = 400;
          res.end(JSON.stringify({
            message: '新密码不能与原密码相同',
          }));
        } else {
          allUsers[targetIndex].password = body.newPassword;
          res.end(JSON.stringify({
            message: 'OK',
          }));
        }
      } else {
        res.statusCode = 400;
        res.end(JSON.stringify({
          message: '账户或密码错误，请重新输入',
        }));
      }
    }
  },
  {
    url: '/api/services',
    method: 'get',
    response: (req, res) => {
      let {k, page, page_size} = req.query || {};
      let lists = [...allServices];
      const _page_size = page_size || 10;
      const _page = page || 1;
      if (k) {
        lists = lists.map(item => item.title.includes(k))
      }
      return (
        {
          count: lists.length,
          results: lists.slice(_page_size * (_page - 1), _page_size * _page),
        }
      );
    }
  },
  {
    url: '/api/services',
    method: 'post',
    response: {
      message: 'OK',
    }
  },
  {
    url: '/api/services/:id',
    method: 'put',
    rawResponse: async (req, res) => {
      (/^(\/[^\/]+){2}\/([^\/]+)/g).test(req.url);
      const body = await getBody(req);
      const targetIndex = allServices.findIndex(item => item.id === RegExp.$2);
      if (targetIndex > -1) {
        allServices[targetIndex] = {
          ...allServices[targetIndex],
          ...body,
        }
      }
      res.end(JSON.stringify(allServices));
    }
  },
  {
    url: '/api/services/:id',
    method: 'delete',
    response: (req) => {
      (/^(\/[^\/]+){2}\/([^\/]+)/g).test(req.url);
      const targetIndex = allServices.findIndex(item => item.id === RegExp.$2);
      if (targetIndex > -1) {
        allServices.splice(targetIndex, 1);
      }
      return allServices;
    }
  },
  {
    url: '/api/stores/:id/goods',
    method: 'get',
    response: (req, res) => {
      (/^(\/[^\/]+){2}\/([^\/]+)/g).test(req.url);
      const result = allStores.find(item => item.id === RegExp.$2);
      if (!result) {
        res.statusCode = 400;
        res.end(JSON.stringify({
          message: '该商店不存在',
        }))
      } else {
        return ({
          count: result.goods.length,
          results: result.goods,
        })
      }
    }
  },
  {
    url: '/api/stores',
    method: 'get',
    response: () => {
      const result = allStores.map(item => ({
        id: item.id,
        name: item.name,
      }));
      return ({
        count: result.length,
        results: result,
      });
    }
  },
  {
    url: '/api/account/userinfo',
    method: 'get',
    response: userinfo,
  },
  {
    url: '/api/account/userinfo',
    method: 'put',
    rawResponse: async (req, res) => {
      const body = await getBody(req);
      for(let item of Object.getOwnPropertyNames(userinfo)) {
        if (body[item]) {
          userinfo[item] = body[item]
        }
      }
      res.end(JSON.stringify(userinfo));
    }
  },
];
