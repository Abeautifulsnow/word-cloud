import React, { useState } from 'react';
import { Input, Button, Image, message, Divider } from 'antd';
import { HeartTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import axios from 'axios';
import errImg from '../../assets/errorImg';
import './index.scoped.css';


const { TextArea } = Input;
axios.defaults.baseURL = 'http://127.0.0.1:5000';

function checkInput(value) {
  // 判空处理，前端提示不能为空
  if (value.length === 0) {
    message.warning("输入内容至少为1个字符!")
    return false
  }
  // 不能为特殊字符
  let containSpecial = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
  if (containSpecial.test(value)) {
    message.warning("输入内容不能含有特殊字符!")
    return false
  }

  // 不能为中文
  let re = new RegExp("[\\u4E00-\\u9FFF]+", "g");
  if (re.test(value)) {
    message.warning("输入内容不能含有中文!")
    return false
  }

  return true
}

export default () => {
  const [value, setValue] = useState('');
  const [pic, setPic] = useState('');

  const onChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }

  const onSubmit = () => {
    let param = {
      'word': value
    }
    let r = checkInput(value)
    switch (r) {
      case false:
        return
      default:
        axios.post("/word/cloud/generate", param)
          .then(
            res => {
              message.success('接口请求成功')
              setPic(res.data)
              // console.log(pic)
            })
          .catch(res => {
            let data = Object.create(res);
            console.log(data.message)
            message.error('接口请求出错:'.concat(data.message))
          })
    }
  }
  const onDownload = () => {
    const imgUrl = 'data:image/png;base64,' + pic;
    const a = document.createElement('a')
    a.href = imgUrl
    a.setAttribute('download', 'word-cloud')
    a.click()
  }

  return (
    <>
      <div id="word-cloud-content">
        <h2>词云生成器</h2>
        <div id="word-text-area">
          <TextArea
            rows={10}
            placeholder='请输入原内容...'
            onChange={onChange}
            showCount
          />
          <Divider><CheckCircleTwoTone twoToneColor="#52c41a" /></Divider>
          <div id="word-img">
            {pic.length === 0 ? (
              <>
                <Image src="error" fallback={errImg} />
              </>
            ) : (
              <>
                <Image src={'data:image/png;base64,' + pic} />
              </>
            )}
          </div>
          <Divider><HeartTwoTone twoToneColor="#eb2f96" /></Divider>
          <div id="word-operation">
            <Button type="primary" shape="round" onClick={onSubmit}>生成词云</Button>
            <Button
              type="primary"
              shape="round"
              onClick={onDownload}
              style={{ backgroundColor: '#67c23a', borderColor: '#67c23a' }}
            >下载图片</Button>
          </div>
        </div>
      </div>
    </>
  )
}