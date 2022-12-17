module.exports = function ({addComponents,addBase, config}) {

  addBase({
    '.container': config('theme.containers.box'),
    '.container-dark': config('theme.buttons.box'),
  })

  const mainClasses = {
    '.container': {
      backgroundColor: '#fff'
    },
    '.container-dark': {
      backgroundColor: '#232e3c'
    },
    '.card': {
      backgroundColor: '#c1cbda'
    },
    '.card-dark': {
      backgroundColor: '#344050'
    },
    '.input-dark': {
      backgroundColor: '#344050'
    },
  }

  addComponents(mainClasses)
}
