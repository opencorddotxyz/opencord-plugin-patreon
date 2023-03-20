import { formatDate } from './format';

type LogType = 'info' | 'error';

function log(type: LogType, scope: string, ...content: any[]) {
  const now = Date.now();
  console[type](
    `[${formatDate(now, 'HH:mm:ss')}.${String(now % 1000).padStart(
      3,
      '0',
    )}] ${scope} `,
    ...content,
  );
}

export const info = (scope: string, ...content: any[]) => {
  log('info', scope, ...content);
};

export const error = (scope: string, ...content: any[]) => {
  log('error', scope, ...content);
};
