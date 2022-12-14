/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: 'class',
  theme: {
    buttons: {
      btn: {
        padding: '.5rem 1rem',
        borderRadius: '.25rem',
        fontWeight: '600',
        border: 'transparent',
        boxShadow: '0 7px 14px 0 rgba(3, 12, 51, 0.15), 0 3px 6px 0 rgba(0, 0, 0, 0.2)',
        transition: 'ease-in-out 150ms'
      },
      btnTransform: {
        padding: '.5rem 1rem',
        borderRadius: '.25rem',
        fontWeight: '600',
        border: 'transparent',
        boxShadow: '0 7px 14px 0 rgba(3, 12, 51, 0.15), 0 3px 6px 0 rgba(0, 0, 0, 0.2)',
        transition: 'ease-in-out 150ms',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        '&:focus': {
          outline: 'none'
        },
        '&:active': {
          transform: 'scale(0.95)'
        }
      },
    },
    containers: {
      box: {
        width: '100%',
        padding: '21px',
        borderRadius: '0.375rem',
        boxShadow: '0 7px 14px 0rgba(65, 69, 88, 0.1), 0 3px 6px 0rgba(0, 0, 0, 0.07)',
      },
      'box-scale': {
        width: '100%',
        padding: '21px',
        borderRadius: '0.375rem',
        boxShadow: '0 7px 14px 0rgba(65, 69, 88, 0.1), 0 3px 6px 0rgba(0, 0, 0, 0.07)',
        transition: 'ease-in-out 150ms',
        '&:hover': {
          transform: 'scale(1.05)'
        },
        '&:active': {
          transform: 'scale(0.95)'
        }
      }
    },
    extend: {},
  },
  plugins: [
    require('./tw-plugins/colors'),
    require('./tw-plugins/buttons'),
    require('./tw-plugins/main-classes'),
    require('./tw-plugins/containers'),
  ],
}
