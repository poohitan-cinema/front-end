import ReactGA from 'react-ga';
import config from '../config';

export const initGA = () => {
  ReactGA.initialize(config.google.analyticsTrackingId);
};

export const logPageView = () => {
  console.log(`Logging pageview for ${global.location.pathname}`);

  ReactGA.set({ page: global.location.pathname });
  ReactGA.pageview(global.location.pathname);
};
