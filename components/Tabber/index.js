/*
 * Tabber
 */

import React from 'react'
import T from 'prop-types'
import R from 'ramda'
import { Tabs } from '..'

import { makeDebugger } from '@utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:Tabber:index')
/* eslint-enable no-unused-vars */

const { TabPane } = Tabs

const translator = {
  posts: '帖子',
  map: '地图',
  news: '动态',
  cheatsheet: 'cheatsheet',
  meetups: 'meetups',
  users: '用户',
  videos: '视频',
  tuts: '教程',
  jobs: '招聘',
}

const Tabber = ({ source, onChange }) => {
  const tabitems = R.values(source)
  //   debug('tabitems: ', tabitems)
  //   <Tabs onChange={onChange} activeKey={'Js--jobs'}>
  return (
    <Tabs onChange={onChange}>
      {tabitems.map(item => (
        <TabPane tab={translator[item.title] || item.title} key={item.title} />
      ))}
    </Tabs>
  )
}

Tabber.propTypes = {
  // https://www.npmjs.com/package/prop-types
  onChange: T.func.isRequired,
  source: T.array.isRequired,
}

Tabber.defaultProps = {}

export default Tabber
