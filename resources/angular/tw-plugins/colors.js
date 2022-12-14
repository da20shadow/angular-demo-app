module.exports = function ({addComponents}) {

  const colors = {
    '.bg-body-light': {backgroundColor: '#edf2f9'},
    '.bg-body-dark': {backgroundColor: '#0b1727'},
    '.bg-container-light': {backgroundColor: '#fff'},
    '.bg-container-dark': {backgroundColor: '#232e3c'},

    '.bg-soft-dark-dark': {backgroundColor: '#03070c'},
    '.bg-soft-light-dark': {backgroundColor: '#4b4b4c'},

    '.bg-soft-error-dark': {backgroundColor: '#45111a'},
    '.bg-soft-warning-dark': {backgroundColor: '#4a2613'},
    '.bg-soft-info-dark': {backgroundColor: '#0c384c'},
    '.bg-soft-success-dark': {backgroundColor: '#003f25'},
    '.bg-soft-secondary-dark': {backgroundColor: '#23272c'},
    '.bg-soft-primary-dark': {backgroundColor: '#0d2545'},

    '.text-color-dark': {color: '#9da9bb'},
    '.text-color-light': {color: '#5e6e82'},
  }
  const darkModeNavbar = {

    '.dark-navbar-bg': {backgroundColor: 'rgba(11, 23, 39, 0.96)'},
    '.dark-nav-link-color': 'rgba(11, 23, 39, 0.55)',
    '.dark-nav-link-color-hover': 'rgba(11, 23, 39, 0.75)',
    '.dark-nav-link-color-active': '#0b1727',
    '.dark-navbar-switch-border': 'rgba(11, 23, 39, 0.1)',

    '.nav-link-color': {
      color: '#9da9bb',
      '&:hover': {
        color: '#edf2f9'
      },
      '&:active': {
        color: '#2c7be5'
      }
    },

    // '.light-navbar-bg': {backgroundColor: 'rgba(255, 255, 255, 0.55)'},
    '.light-nav-link-color': {
      color: 'rgba(255, 255, 255, 0.55)',
      '&:hover': {
        color: 'rgba(255, 255, 255, 0.7)'
      },
      '&:active': {
        color: 'rgba(255, 255, 255, 0.9)'
      }
    },
    '.light-navbar-switch-border': 'rgba(255, 255, 255, 0.1)',

    '.dropdown-link-hover': {color: '#11233b'}

  }
  const darkModeContainers = {
    '.box-shadow': {
      boxShadow: '0 0 0 1px rgba(0, 8, 19, 0.3), 0 2px 5px 0 rgba(0, 13, 33, 0.5), 0 1px 1.5px 0 rgba(0, 8, 1, 0.48), 0 1px 2px 0 rgba(0, 8, 1, 0.4)'
    },
    '.box-shadow-hover': {
      boxShadow: '0 0 0 1px rgba(0, 8, 19, 0.3), 0 3px 7px 0 rgba(0, 13, 33, 0.8), 0 1px 1.5px 0 #000801, 0 1px 2px 0 #000801'
    }
  }
  const darkModeInputColors = {
    '.dark-input-bg': {backgroundColor: '#0b1727'},
    '.dark-input-border-color': {color: '#344050'},
    '.dark-input-border-color-focus': '#163e73',
    '.dark-input-placeholder-color': '#344050',
    '.dark-input-checkbox-border-color': '#4d5969',
    '.dark-input-color': '#d8e2ef',

  }
  const darkModeTextColors = {


    '.dark-text-light-hover': 'rgba(13, 17, 22, 0.4)',
    '.dark-text-gray-hover': '#c1cbda',
    '.dark-text-info': '#27bcfd',
    '.dark-text-info-hover': '#1f96ca',
    '.dark-text-warning': '#f5803e',
    '.dark-text-warning-hover': '#c46632',
    '.dark-text-error': '#e63757',
    '.dark-text-error-hover': '#b82c46',
    '.dark-text-success': '#00d27a',
    '.dark-text-success-hover': '#00d27a',
    '.dark-link-color': '#2c7be5',
    '.dark-link-color-hover': '#2362b7'
  }

  addComponents(colors)
}
