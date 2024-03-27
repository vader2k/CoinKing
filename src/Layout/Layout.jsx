import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Routing from '../routes/Routing'


const Layout = () => {
  return (
    <section>
        <Navbar />
        <Routing />
        <Footer />
    </section>
  )
}

export default Layout