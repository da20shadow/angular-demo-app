const publicNavLinks = [
  {url: 'home', name: 'Home'},
  {url: 'faq', name: 'FAQ'},
  {url: 'contact-us', name: 'Contact us'},
  {url: 'login', name: 'Login'},
  {url: 'register', name: 'Register'},
];

const privateNavLinks = [
  {url: '/dashboard', name: 'Dashboard'},
  {url: '/profile', name: 'Profile'},
  {url: 'goals', name: 'Goals'},
  {url: 'agenda', name: 'Agenda'},
  {url: 'logout', name: 'Logout'},
];

const footerNavLinks = [
  {url: 'privacy', name: 'Privacy'},
  {url: 'terms', name: 'Terms'},
  //TODO: add more
];

export const navBar = {
  publicNavLinks,
  privateNavLinks,
  footerNavLinks,
}
