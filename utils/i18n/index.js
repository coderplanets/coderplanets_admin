// this is tmp, use react-intl .. later

const I18nDict = {
  post: '帖子',
  map: '地图',
  news: '动态',
  cheatsheet: 'cheatsheet',
  user: '用户',
  video: '视频',
  tut: '教程',
  job: '招聘',
}

export const Trans = key => I18nDict[key] || key

export const holder = 1
