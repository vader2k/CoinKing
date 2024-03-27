import { Route, Routes } from "react-router-dom";
import Cryptos from '../pages/Cryptos'
import Details from '../pages/Details'
import Home from '../pages/Home'
import News from '../pages/News'


const Routing = () => {
  return (
    <Routes>
      <Route index element = {<Home />} />
      <Route path="/cryptos" element={<Cryptos />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="/news" element={<News />} />
    </Routes>
  )
}

export default Routing