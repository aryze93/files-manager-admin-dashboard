import component from './en-US/component';
import errorResponse from './en-US/errorResponse';
import exception from './en-US/exception';
import global from './en-US/global';
import globalHeader from './en-US/globalHeader';
import menu from './en-US/menu';
import pages from './en-US/pages';
import pwa from './en-US/pwa';
import settingDrawer from './en-US/settingDrawer';
import settings from './en-US/settings';
import home from './en-US/home';
import cols from './en-US/cols';
import folder from './en-US/folder';
import file from './en-US/file';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.preview.down.block': 'Download this page to your local project',
  'app.welcome.link.fetch-blocks': 'Get all block',
  'app.welcome.link.block-list': 'Quickly build standard, pages based on `block` development',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...pages,
  ...global,
  ...errorResponse,
  ...exception,
  ...home,
  ...cols,
  ...folder,
  ...file,
};
