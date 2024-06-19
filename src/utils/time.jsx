import * as dayjs from 'dayjs'

export function thousands(num) {
  let suff;
  let pre;
  if (num) {
    num = num + '';
    [pre, suff] = num.split('.')
    if (pre.length <= 3) return num;
    pre = pre.split('').reverse()
    for (let i in pre) {
      if (i > 1 && i % 3 === 0) {
        pre[i] = pre[i] + ',';
      }
    }
    return pre.reverse().join('') + (suff ? ('.' + suff) : '');
  }
  return num;
}


export function abiTimeToTimestamp(abiTime) {
  return Number(abiTime) * 1000
}

export function formatTime(time) {
  return dayjs(time).format('YYYY/MM/DD HH:mm:ss')
}


export function convertMsToTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;

  return {
    days,
    hours: remainingHours,
    minutes: remainingMinutes,
    seconds: remainingSeconds
  };
}
