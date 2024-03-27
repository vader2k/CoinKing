import logo from '../assets/coin.gif'
import { FaHome } from "react-icons/fa";
import { FaCoins, FaRegNewspaper } from "react-icons/fa6";

const Navbar = () => {

  const navLinks = [
    { id: 1, name: "Home", path: "/", icon: FaHome},
    { id:2, name:"Currencies", path: "/cryptos", icon: FaCoins },
    { id:3, name:"News", path: "/news", icon: FaRegNewspaper}
]

  return (
    <section className='w-full'>
      <div className='flex justify-evenly'>
        <div className='flex items-center gap-4'>
          <img src={logo} alt='logo'/>
          <h1 className='text-3xl font-semibold font-General'>CoinKing</h1>
        </div>

        <div>
          
        </div>
      </div>
    </section>
  )
}

export default Navbar