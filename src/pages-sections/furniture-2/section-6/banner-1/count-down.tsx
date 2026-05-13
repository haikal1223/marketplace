"use client";

import { useMemo } from "react";
import CountBox from "./count-box";
import { useCountDown } from "components/countdown";

const EXPIRE_DATE = new Date("2024-12-01");

export default function CountDown() {
  const getExpireDate = useMemo(() => {
    const TODAY = new Date();
    return EXPIRE_DATE.getTime() > TODAY.getTime() ? EXPIRE_DATE : new Date(TODAY.setDate(10));
  }, []);

  const { timeLeft } = useCountDown({
    expireDate: getExpireDate.getTime()
  });

  return (
    <div className="count-down">
      <CountBox label="Days" value={timeLeft.days} />
      <CountBox label="Hours" value={timeLeft.hours} />
      <CountBox label="Minutes" value={timeLeft.minutes} />
      <CountBox label="Seconds" value={timeLeft.seconds} />
    </div>
  );
}
