export function timeNormalize(date) {
  const d = new Date(date)
  return `${("00" + d.getDate()).slice(-2)}/${("00" + (d.getMonth()+1)).slice(-2)}/${d.getFullYear()}  ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}
