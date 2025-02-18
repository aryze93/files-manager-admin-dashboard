import component from './fr-FR/component';
import errorResponse from './fr-FR/errorResponse';
import exception from './fr-FR/exception';
import global from './fr-FR/global';
import globalHeader from './fr-FR/globalHeader';
import menu from './fr-FR/menu';
import pages from './fr-FR/pages';
import pwa from './fr-FR/pwa';
import settingDrawer from './fr-FR/settingDrawer';
import settings from './fr-FR/settings';
import home from './fr-FR/home';
import cols from './fr-FR/cols';
import folder from './fr-FR/folder';
import file from './fr-FR/file';

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
