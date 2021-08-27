const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('xxx')
const xObject = JSON.parse(x)
const hashMap = xObject || [
  {logo: 'A', logoType: 'text', url: 'https://www.acfun.cn/'},
  {logo: 'B', logoType: 'image', url: 'https://www.bilibili.com/'}
]
const simplifyurl = (url) => {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace('/\/.*/', '')// 删除 / 开头的内容 正则表达式
}
const render = () => {
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
      <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyurl(node.url)}</div>
        <div class="close">
          <svg class="icon" >
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>    
    </li>`).insertBefore($lastLi)
    $li.on('click', () => {
      window.open(node.url)
    })
    $li.on('click', '.close', (e) => {
      e.stopPropagation()
      hashMap.splice(index, 1)
      render()
    })
  })
}
render()

$('.setButton')
  .on('click', () => {
    let url = window.prompt('请输入要添加的网址')
    if (url.indexOf('http') !== 0) {
      url = 'https://' + url
    }
    hashMap.push({
      logo: simplifyurl(url)[0],
      url: url
    })
    render()
  })

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap)
  localStorage.setItem('xxx', string)
}
$(document).on('keypress', (e) => {
  const {key} = e
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url)
    }
  }
})