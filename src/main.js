const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const storage = localStorage.getItem('storage')
const storageObject = JSON.parse(storage)

const hashMap = storageObject || [
    { logo: 'a', url: "https://www.acfun.cn" },
    { logo: 'b', url: "https://www.baidu.com" }
]

const simplifyUrl = (url) => {
    return url.replace("https://", "").replace("http://", "")
        .replace("www.", "")
        .replace(/\/.*/, '') // 删除 / 后面的内容
}


const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`
        <li> 
            <div class="close">
                <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                </svg>
            </div>              
                <a href= "${node.url}" >
                        <div class="site">
                            <div class="logo">${node.logo}</div>
                            <div class="link">${simplifyUrl(node.url)}</div>    
                        </div>
                </a>
        </li>`).insertBefore($lastLi)
        $li.on('click', '.close', (e) => {
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$('.addButton')
    .on('click', () => {
        let url = prompt('请问你要添加我网址是啥')
        console.log(url)
        if (url === '') {
            alert("请输入正确的网站")
            return null
        } else if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1) {
            url = 'https://' + url
        }

        console.log(url)
        hashMap.push({ logo: simplifyUrl(url)[0], url: url })
        render()
    })

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('storage', string)
}

$(document).on('keypress', (e)=>{
    const {key} = e
    console.log(key);
    hashMap.forEach(node => {
        if(node.logo === key){
            window.open(node.url)
        }
    })
})

