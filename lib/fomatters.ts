import formateDuration from 'format-duration';

export const formatTime = (timeInSeconds: number = 0) => {
  return formateDuration(timeInSeconds * 1000)
}

export const formatDate = (date: Date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}