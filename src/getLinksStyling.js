import getMax from './getMax';

const getLinksStyling = (linksByWeek, widthPercentage) => {
  const longestWeek = getMax(linksByWeek)
  const widthPerWeek = widthPercentage / linksByWeek.length
  const heightPerLink = 40 / longestWeek.length
  const linksStyles = []
  
  for (let i = 0; i < linksByWeek.length; i++) {
    const height = (linksByWeek[i].length * heightPerLink) + "%"
    const left = (92.5 - ((i+1)*widthPerWeek)) + "%"
    const link = {
      height: height,
      left: left,
      bottom: "9.75%",
      width: "5px",
      color: "#000",
      value: linksByWeek[i].length,
      key: linksByWeek.length - i
    }
    linksStyles.push(link)
  }
  return linksStyles
}

// coucou Robert
export default getLinksStyling
