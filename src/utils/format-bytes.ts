export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);

  // Format to max 2 decimal places, remove trailing zeros
  const formatted = parseFloat(value.toFixed(2));

  return `${formatted}${units[i]}`;
}
