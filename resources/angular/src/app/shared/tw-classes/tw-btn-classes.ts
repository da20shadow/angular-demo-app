/** --------Buttons Style Classes-------- */

/** ------Hidden for direct access outside Start------ */

const button = 'focus:outline-none text-white ' +
  'font-medium py-2 px-4 border-transparent rounded-md shadow-sm ' +
  'hover:scale-105 active:scale-95 transition-transform';
const btn2 = `border focus:outline-none
  py-2 px-4 rounded-md shadow-sm font-medium
  hover:scale-105 active:scale-95 transition-transform`;

/** ------Hidden for direct access outside End------ */


const btnFullWidth = 'group relative flex w-full justify-center ' +
  'rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm ' +
  'font-medium text-white hover:bg-blue-600 focus:outline-none ' +
  'focus:ring-2 focus:ring-blue-400 focus:ring-offset-2';


const noBgBtn = `${btn2} border-blue-500
  hover:border-blue-600 active:border-blue-700`;

const noBgBtnWarning = `${btn2} border-orange-500
  hover:border-orange-600 active:border-orange-700`;

const noBgBtnError = `${btn2} border-rose-500
  hover:border-rose-600 active:border-rose-700`;

const btnPrimarySm = `${button} bg-blue-500
  hover:bg-blue-600 active:bg-blue-700 `;

const btnWarning = `${button} bg-orange-500
  hover:bg-orange-600 active:bg-rose-700 `;

const btnError = `${button} bg-rose-500
  hover:bg-rose-600 active:bg-rose-700 `;

const disabledBtn = 'bg-blue-disabled text-blue-disabled';
const disabledBtnDark = 'bg-blue-disabled text-blue-disabled';

export const buttons = {
  btnFullWidth,
  noBgBtn,
  noBgBtnWarning,
  noBgBtnError,
  btnPrimarySm,
  btnWarning,
  btnError,
  disabledBtn,
  disabledBtnDark,
}
