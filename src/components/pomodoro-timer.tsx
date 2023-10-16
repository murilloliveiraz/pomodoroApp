import { useCallback, useEffect, useState } from 'react';
import restImage from '../assets/images/break.jpg';
import tomate from '../assets/images/tomate.png';
import workImage from '../assets/images/work.jpg';
import { useInterval } from '../hooks/use-interval';
import bellFinish from '../sounds/bell-finish.mp3';
import bellStart from '../sounds/bell-start.mp3';
import { secondsToTime } from '../utils/seconds-to-time';
import { Button } from './button';
import { Timer } from './timer';

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);
interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMaintime] = useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(props.cycles - 1).fill(true),
  );

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  useInterval(
    () => {
      setMaintime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMaintime(props.pomodoroTime);
    audioStartWorking.play();
  }, [
    setTimeCounting,
    setWorking,
    setResting,
    setMaintime,
    props.pomodoroTime,
  ]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);
      setMaintime(props.pomodoroTime);

      if (long) {
        setMaintime(props.longRestTime);
      } else {
        setMaintime(props.shortRestTime);
      }

      audioStopWorking.play();
    },
    [
      setTimeCounting,
      setWorking,
      setResting,
      setMaintime,
      props.longRestTime,
      props.shortRestTime,
    ],
  );

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTime,
    cyclesQtdManager,
    numberOfPomodoros,
    completedCycles,
    configureRest,
    setCyclesQtdManager,
    configureWork,
    props.cycles,
  ]);

  return (
    <div className="pomodoro">
      <h2>{working ? 'Time to Focus!' : 'Rest time!'}</h2>
      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button text="Go Rest" onClick={() => configureRest(false)} />
        <Button text="Work" onClick={() => configureWork()} />
        <Button
          className={!working && !resting ? 'hidden' : ''}
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() => setTimeCounting(!timeCounting)}
        />
      </div>

      <div className={!working && !resting ? 'hidden' : 'details'}>
        <img className="image" src={working ? workImage : restImage} alt="" />
        <ul>
          <li>
            <img className="tomate" src={tomate} alt="" /> Number of Completed
            Cycles: {completedCycles}
          </li>
          <li>
            <img className="tomate" src={tomate} alt="" />
            Worked time: {secondsToTime(fullWorkingTime)}
          </li>
          <li>
            {' '}
            <img className="tomate" src={tomate} alt="" />
            Number of Pomodoros: {numberOfPomodoros}
          </li>
        </ul>
      </div>
    </div>
  );
}
