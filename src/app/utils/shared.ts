import moment from 'moment/moment'
import 'moment/locale/id'

export const formatDateToDM = (date: string) => {
  return moment(date, 'YYYY-MM-DD').locale('id').format('D MMMM');
}