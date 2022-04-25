import { View, Text } from 'react-native'
import React from 'react'
import Services from '../Services/Services'
// import Header from '../Header'
// import Footer from '../Footer'

export default function Home() {
  useEffect(() => {
    fetch('https://api.newsbundle.com/news/listNews?from=0&size=20&site=BL')
      .then(res => res.json())
      .then(data => setTotalServices(data))
  }, [moreTags]);
  return (
    <View style={{ backgroundColor: "#fbfbfb" }}>
      {/* <Header /> */}
      <Services />
      {/* <Footer /> */}
    </View>
  )
}