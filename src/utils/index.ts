import {Option} from '../@types/index'

export const getDate = (month = 0): string => {
  const currentDate = new Date()
  const timestamp = currentDate.setMonth(currentDate.getMonth() - month)
  const date = new Date(timestamp)

  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

export const removeFromArr = (array: Option[], item: string): Option[] => {
  return array.filter((arrValue: Option) => arrValue.label !== item)
}
