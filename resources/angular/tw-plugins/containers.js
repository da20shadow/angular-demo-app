module.exports = function ({addComponents,addBase,config}) {

  addBase({
    '.container': config('theme.containers.box'),
    '.container-light': config('theme.containers.box'),
    '.container-dark': config('theme.containers.box'),
    '.card': config('theme.containers.box'),
    '.card-dark': config('theme.containers.box'),
    '.card-scale': config('theme.containers.box-scale'),
    '.card-scale-dark': config('theme.containers.box-scale'),
  })

  const containers = {
    '.container': {
      backgroundColor: 'transparent'
    },
    '.container-light': {
      backgroundColor: '#fff'
    },
    '.container-dark': {
      backgroundColor: '#232e3c'
    },
    '.card': {
      backgroundColor: '#c1cbda'
    },
    '.card-dark': {
      backgroundColor: '#303f51'
    }
  }
  addComponents(containers)
}
