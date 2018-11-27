var config = {
  doubanApi: 'https://douban.uieee.com',
  fuliApi: 'https://gank.io',
  app: {
    getDoubanTop250Url: '/v2/movie/top250',       // 豆瓣电影Top250
    getIntheaTersUrl: '/v2/movie/in_theaters',    // 正在上映的电影-北京
    getComingSoonUrl: '/v2/movie/coming_soon',    // 即将上映的电影
    getFuli: '/api/data/'
  }
}

module.exports = {
  config: config
}