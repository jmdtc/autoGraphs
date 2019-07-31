import moment from 'moment';


const orderByMonth = (links) => {
  const firstLinkDate = links.firstLinkDate.length > 0 ?
        moment(links.firstLinkDate, 'DDMMYYYY') : ""
  const today = moment()
  const daysSinceFirstLink = links.firstLinkDate.length > 0 ?
        today.diff(firstLinkDate, 'days') : ""
  const numberOfMonths = daysSinceFirstLink / 30
  const daysSinceLinks = []
  const linksByMonth = []

  for (const link of links.linksDates) {
      const linkDate = today.diff(moment(link, 'DDMMYYYY'), 'days')
      daysSinceLinks.push(linkDate)
    }

  for (let i = 1; i < numberOfMonths + 1; i++) {
    const twoWeeks = daysSinceLinks.filter(el => el < 30 * i && el >= 30 * (i-1))
    linksByMonth.push(twoWeeks)
  }

  return linksByMonth
}

export default orderByMonth