import {buttons} from "./tw-btn-classes";

/** Links */
const link = 'font-medium text-blue-600 hover:text-blue-700 hover:underline';
const navLink = 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium';
export const links = {
  link,
  navLink
}

/** Inputs */
const input = ' bg-gray-100 text-neutral-800 placeholder:text-slate-400 ' +
  'dark:bg-slate-900 dark:text-neutral-300 dark:placeholder:text-slate-600 ' +
  'w-full text-sm border-none outline-none py-3 pr-4 pl-2 rounded-r ';

const inputIcon = 'bg-gray-100 text-neutral-800 ' +
  'dark:bg-slate-900 dark:text-slate-600 py-3 pr-2 pl-3 rounded-l ';
export const inputs = {
  input,
  inputIcon,
}


/** Box Containers */
const box = 'p-5 bg-white dark:bg-gray-800 rounded-md ' +
  'shadow-md dark:shadow-gray-600 dark:shadow-sm'

export const containers = {
  box
}

export const tw = {
  links,
  inputs,
  buttons,
  containers,

}
