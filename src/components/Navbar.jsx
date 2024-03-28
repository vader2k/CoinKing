import logo from '../../public/logo.png'
import { FaHome } from "react-icons/fa";
import { FaCoins, FaRegNewspaper } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Navbar = () => {

  const navLinks = [
    { id: 1, name: "Home", path: "/", icon: FaHome},
    { id:2, name:"Currencies", path: "/cryptos", icon: FaCoins },
    { id:3, name:"News", path: "/news", icon: FaRegNewspaper}
]

  return (
    <section className='w-full bg-black text-white'>
      <nav className='flex justify-between py-5 px-10 max-w-[1400px] mx-auto'>
        <div className='flex items-center gap-4'>
          <img src={logo} alt='logo' className='h-[50px] animate-pulse'/>
          <h1 className='text-3xl font-semibold font-General'>CoinKing</h1>
        </div>

        <div className='flex items-center gap-10 font-Gambetta font-medium text-[1.2rem]'>
          {
            navLinks.map((link, i) => (
              <span key={i}>
                <Link to={link.path}>
                  <div className='flex items-center gap-2'>
                    <p>{link.name}</p>
                    <p className='text-gray-300'>< link.icon /></p>
                  </div>
                </Link>
              </span>
            ))
          }
        </div>
      </nav>
    </section>
  )
}

export default Navbar