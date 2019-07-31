import moment from 'moment';


const orderByTwoWeeks = (links) => {
  const firstLinkDate = links.firstLinkDate.length > 0 ?
        moment(links.firstLinkDate, 'DDMMYYYY') : ""
  const today = moment()
  const daysSinceFirstLink = links.firstLinkDate.length > 0 ?
        today.diff(firstLinkDate, 'days') : ""
  const numberOfTwoWeeks = daysSinceFirstLink / 14
  const daysSinceLinks = []
  const linksByTwoWeeks = []

  for (const link of links.linksDates) {
      const linkDate = today.diff(moment(link, 'DDMMYYYY'), 'days')
      daysSinceLinks.push(linkDate)
    }

  for (let i = 1; i < numberOfTwoWeeks + 1; i++) {
    const twoWeeks = daysSinceLinks.filter(el => el < 14 * i && el >= 14 * (i-1))
    linksByTwoWeeks.push(twoWeeks)
  }

  return linksByTwoWeeks
}

export default orderByTwoWeeks