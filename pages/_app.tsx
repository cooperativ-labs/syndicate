import '../styles/tailwind.css';
import '@styles/main.css';
import 'tailwindcss/tailwind.css';
import CookieBanner from '@src/CookieBanner';
import React, { ReactElement, useEffect, useState } from 'react';
import SetAppContext from '@src/SetAppContext';
import SetCookieContext from '@src/SetCookieContext';
import SetReachContext from '@src/SetReachContext';
import {
  faArrowRight,
  faArrowUpFromBracket,
  faBrain,
  faChartBar,
  faChartLine,
  faCheck,
  faChevronDown,
  faChevronUp,
  faClock,
  faCog,
  faCoins,
  faCommentDots,
  faDatabase,
  faDownload,
  faEnvelope,
  faFileImage,
  faFilePdf,
  faFilePowerpoint,
  faFileWord,
  faHome,
  faLink,
  faPaintBrush,
  faPhone,
  faPiggyBank,
  faPlay,
  faPlus,
  fas,
  faSearchDollar,
  faSquareArrowUpRight,
  faStar,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
  fab,
  faGithub,
  faGoogle,
  faLinkedin,
  faPython,
  faReact,
  faSlackHash,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { StateProvider } from '@context/store';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';

library.add(fas, faCog);
library.add(fas, faCommentDots);
library.add(fas, faHome);
library.add(fas, faChartBar);
library.add(fas, faArrowRight);
library.add(fas, faCoins);
library.add(fas, faPlay);
library.add(fas, faStar);
library.add(fas, faChevronUp);
library.add(fas, faChevronDown);
library.add(fas, faPiggyBank);
library.add(fas, faUser);
library.add(fas, faChartLine);
library.add(fas, faDownload);
library.add(fas, faFileWord);
library.add(fas, faFilePdf);
library.add(fas, faFilePowerpoint);
library.add(fas, faFileImage);
library.add(fas, faClock);
library.add(fas, faCheck);
library.add(fas, faTimes);
library.add(fas, faPaintBrush);
library.add(fab, faPython);
library.add(fab, faReact);
library.add(fas, faBrain);
library.add(fas, faSearchDollar);
library.add(fas, faDatabase);
library.add(fab, faLinkedin);
library.add(fab, faSlackHash);
library.add(fab, faGithub);
library.add(fab, faGoogle);
library.add(fab, faTwitter);
library.add(fas, faSquareArrowUpRight);
library.add(fas, faPlus);
library.add(fas, faEnvelope);
library.add(fas, faPhone);
library.add(fas, faLink);

// function getLibrary(provider: any): Web3Provider {
//   const library = new Web3Provider(provider);
//   library.pollingInterval = 12000;
//   return library;
// }

export default function MyApp({ Component, pageProps: { session, ...pageProps } }): ReactElement {
  const [cookiesApproved, setCookiesApproved] = useState(undefined);

  useEffect(() => {
    const result = window.localStorage?.getItem('COOKIE_APPROVED');
    setCookiesApproved(result);
  }, [setCookiesApproved]);

  const withCookies = (
    <SetCookieContext>
      <div id="outer-container" className="bg-gray-100 flex flex-col">
        <main id="page-wrap flex-grow h-full">
          <Component {...pageProps} />
        </main>
      </div>
    </SetCookieContext>
  );

  const withoutCookies = (
    <div id="outer-container" className="bg-gray-100 flex flex-col">
      <main id="page-wrap flex-grow h-full">
        <Component {...pageProps} />
        <CookieBanner />
      </main>{' '}
    </div>
  );

  return (
    // <Web3ReactProvider getLibrary={getLibrary}>
    <SetReachContext>
      <SetAppContext>
        <StateProvider>{cookiesApproved === 'approved' ? withCookies : withoutCookies}</StateProvider>
      </SetAppContext>
    </SetReachContext>
    // </Web3ReactProvider>
  );
}
