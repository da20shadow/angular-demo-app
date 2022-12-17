export class GlobalClasses {

  //Background Colors
  static readonly bgLightDarkBlue = 'bg-[#edf2f9] dark:bg-[#0b1727]';
  static readonly bgDarkSecBlue = 'dark:bg-[#162231]';
  static readonly bgSecLightBlue = 'dark:bg-[#232e3c]';

  //Colors
  static readonly textLightDarkColor = 'text-[#344050] dark:text-[#d8e2ef]';
  static readonly secondaryColor = ''

  static readonly bgNeutralLightColor = 'bg-gray-800'
  static readonly bgNeutralDarkColor = 'bg-slate-900'

  /** -------------BOXES------------- */
  static readonly box = 'p-5 bg-white dark:bg-gray-800 rounded-md ' +
    'shadow-md dark:shadow-gray-600 dark:shadow-sm'


  /** -------------Inputs------------- */
  static readonly input = ' bg-gray-100 text-neutral-800 placeholder:text-slate-400 ' +
    'dark:bg-slate-900 dark:text-neutral-300 dark:placeholder:text-slate-600 ' +
    'w-full text-sm border-none outline-none py-3 pr-4 pl-2 rounded-r ';

  static readonly inputIcon = 'bg-gray-100 text-neutral-800 ' +
    'dark:bg-slate-900 dark:text-slate-600 py-3 pr-2 pl-3 rounded-l ';



  //TODO: create 5 types of buttons!!!

  /** -------------Buttons, Links------------- */
  static readonly link = 'font-medium text-blue-600 hover:text-blue-700 hover:underline';
  static readonly navLink = 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium';

  private static readonly btn = 'focus:outline-none text-white ' +
    'font-medium py-2 px-4 border-transparent rounded-md shadow-sm ' +
    'hover:scale-105 active:scale-95 transition-transform';
  private static readonly btn2 = `border focus:outline-none
  py-2 px-4 rounded-md shadow-sm font-medium
  hover:scale-105 active:scale-95 transition-transform`;

  static readonly noBgBtn = `${GlobalClasses.btn2} border-blue-500
  hover:border-blue-600 active:border-blue-700`;

  static readonly noBgBtnWarning = `${GlobalClasses.btn2} border-orange-500
  hover:border-orange-600 active:border-orange-700`;

  static readonly noBgBtnError = `${GlobalClasses.btn2} border-rose-500
  hover:border-rose-600 active:border-rose-700`;

  static readonly btnPrimarySm = `${GlobalClasses.btn} bg-blue-500
  hover:bg-blue-600 active:bg-blue-700 `;

  static readonly btnWarning = `${GlobalClasses.btn} bg-orange-500
  hover:bg-orange-600 active:bg-rose-700 `;

  static readonly btnError = `${GlobalClasses.btn} bg-rose-500
  hover:bg-rose-600 active:bg-rose-700 `;

  static readonly disabledBtn = 'bg-blue-disabled text-blue-disabled';
  static readonly disabledBtnDark = 'bg-blue-disabled text-blue-disabled';

}
