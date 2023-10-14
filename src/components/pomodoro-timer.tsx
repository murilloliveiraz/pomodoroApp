import React from 'react';
import { useInterval } from '../hooks/use-interval';
import { secondsToTime } from '../utils/seconds-to-time';

interface Props {
  defaultPomodoroTimer: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMaintime] = React.useState(props.defaultPomodoroTimer);

  useInterval(() => {
    setMaintime(mainTime - 1);
  }, 1000);
  return <div>Olá mund {secondsToTime(mainTime)}</div>;
}
