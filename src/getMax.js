const getMax = (linksByWeek) => {

  let maxLinksWeek = [] 
  for (let week of linksByWeek) {
    if (maxLinksWeek.length < week.length) {
      maxLinksWeek = week
    }
  }
  return maxLinksWeek
}

export default getMax