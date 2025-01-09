import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

// components
import App from '@app/containers/App';

// utils
import createLogger from '@app/utils/createLogger';

export async function onDOMContentLoaded(): Promise<void> {
  const logger = createLogger(import.meta.env.DEV ? 'debug' : 'error');
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    logger.error(`failed to find "root" element to render react app`);

    return;
  }

  createRoot(rootElement).render(createElement(App));
}

window.addEventListener('DOMContentLoaded', onDOMContentLoaded);
