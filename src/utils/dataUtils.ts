// 时间处理
const compateDate = (dateStr: string) => {
  return dateStr.replace(/-/g, '/');
};
// 格式化时间
export const formatDate = (date: string | number | Date) => {
  let d;
  if (typeof date === 'string') {
    d = new Date(compateDate(date));
  } else {
    d = new Date(date);
  }
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};
// 剩余时间
export const formatRemTime = (endTime: string | number | Date) => {
  const now = new Date().getTime();
  let end;
  if (typeof endTime === 'string') {
    end = new Date(compateDate(endTime)).getTime();
  } else {
    end = new Date(endTime).getTime();
  }
  const diff = end - now;
  
  if (diff <= 0) {
    return '已结束';
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `${days} 天 ${hours} 小时 ${minutes} 分钟`;
};
// 排序
export const sortByTime = (notifications: any[]) => {
   return [...notifications].sort((a, b) => {
    const timeA = new Date(compateDate(a.time)).getTime();
    const timeB = new Date(compateDate(b.time)).getTime();
    // if (isNaN(timeA) || isNaN(timeB)) {
    //   console.error('无效的日期用于排序:', a.time, b.time);
    // }
    return timeB - timeA;
  });
  
}

