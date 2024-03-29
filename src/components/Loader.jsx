import logo from '/logo.png'

const Loader = () => {
  return (
    <section className='max-w-[1400px] flex flex-col gap-5 items-center justify-center my-20'>
      <img src={logo} alt="logo" className='animate-pulse'/>
      <h1>fetching data 🪙</h1>
    </section>
  )
}

export default Loader