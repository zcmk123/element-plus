export const rightRichTextSponsors = [
  {
    name: 'Fantastic-admin',
    img: '/images/sponsors/fantasticadmin.png',
    url: 'https://fantastic-admin.netlify.app/?from=element-plus',
    slogan: 'An out-of-the-box backend framework',
    slogan_cn: '开箱即用的 Vue 后台管理框架',
  },
]

export const leftCustomImgSponsors = [
  {
    name: 'JNPF',
    img: '/images/jnpf_index.png',
    url: 'https://www.jnpfsoft.com/index.html?from=elementUI',
    slogan: 'JNPF low code development platform to develop simple!',
    slogan_cn: 'JNPF 低代码开发平台，让开发变得简单！',
    className: 'jnpf',
    banner_img: '/images/jnpfsoft.jpg',
  },
  {
    name: 'VForm',
    img: '/images/vform.png',
    url: 'https://vform666.com/vform3.html?from=element_plus',
    slogan: 'Vue 2/3 Visual/Low-Code Forms',
    slogan_cn: 'Vue 2/3 可视化低代码表单',
    banner_img: '/images/vform-banner.png',
  },
  {
    name: 'JSDesign',
    name_cn: '即时设计',
    img: '/images/js-design.png',
    url: 'https://js.design?source=element-plus',
    slogan: 'Professional online UI design tool',
    slogan_cn: '专业在线UI设计工具',
    banner_img: '/images/js-design-banner.jpg',
  },
]

export const platinumSponsors = [
  ...leftCustomImgSponsors,
  ...rightRichTextSponsors,
]

export const goldSponsors = [
  {
    name: 'bit',
    img: '/images/bit.svg',
    url: 'https://bit.dev/?from=element-ui',
    slogan: 'Share Code',
    isDark: true, // dark theme
  },
  {
    name: 'renren.io',
    name_cn: '人人开源',
    img: '/images/renren.png',
    url: 'https://www.renren.io/?from=element-ui',
    slogan: 'Rapid development platform',
    slogan_cn: '企业级的快速开发平台',
    className: 'renren',
  },
  {
    name: 'FormMaking',
    name_cn: 'FormMaking',
    img: '/images/formmaking.png',
    url: 'https://form.making.link/?from=element_plus',
    slogan: 'Vue form designer',
    slogan_cn: 'Vue表单设计器，赋能企业快速开发',
  },
]
