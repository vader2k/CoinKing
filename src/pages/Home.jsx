import Hero from '../components/Hero';
import Statistics from '../components/Statistics';

const Home = () => {


  return (
    <main className="font-Gambetta w-full flex flex-col gap-10">
      <Hero />
      <div className='w-full max-w-[1400px] mx-auto px-10'>
        <Statistics />
      </div>
    </main>
  )
}

export default Home