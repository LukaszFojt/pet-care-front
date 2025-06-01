import { motion } from 'framer-motion'
import { fadeIn } from '../utils/motion'
import { SectionWrapper } from './ho_components'
import { styles } from '../styles'
import { arrow, logoNew } from '../assets/index'
import { Link } from 'react-router-dom'
import Scroll from './elements/Scroll'
import { CosmosCanvas } from './canvas'
import { heroInfo } from "../constants/data.json";
import { SearchBar } from './elements'
import { useTranslation } from "../TranslationContext";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="hero">
      <motion.div variants={fadeIn("right", "spring", 0.5, 1.5)} className='flex flex-col items-center w-full h-fit mx-auto z-999'>
        
        {/* Hero section */}
        <div className='h-screen flex flex-col gap-5 md:gap-20 w-4/5'>
          <CosmosCanvas />

          {/* Title */}
          <div className="grid grid-cols-2" style={{ color: 'var(--light-font)' }}>
            <motion.h1 variants={fadeIn("up", "spring", 1, 2.5)} className='bigHeader'>
              {t("PetCare - Your pet in good hands")}
            </motion.h1>
          </div>

          {/* Logo */}
          <div className='grid grid-cols-2 w-full h-[154px] items-center border-2 border-violet-300 rounded-full'>
            <div className='w-[150px] h-[150px] flex items-center justify-center rounded-full border-2 border-blue-300 mx-auto'>
              <img className='w-12 h-12 md:w-24 md:h-24  bg-white rounded-full'src={logoNew} alt="smallPawInCircleLogo" />
            </div>
            <div className='w-4/5 h-[150px] flex items-center justify-center rounded-full border-2 border-blue-300 mx-auto p-4 md:p-6'>
              <p className='smallParagraph' style={{ color: 'var(--light-font)' }}>{t("Find the best care for your pet")}</p>
            </div>
          </div>

          <SearchBar />

          <Scroll link="about" />
        </div>

        {/* About section */}
        <motion.div id="about" variants={fadeIn("right", "spring", 0.5, 1.5)} className='flex flex-col gap-5 w-4/5 h-screen md:h-fit'>
          {/* Informations */}
          <div className="flex">
            <div key={heroInfo[0].id} className={`${styles.pText}`}>
              <p className={`${styles.headerText} py-5`}>{t(heroInfo[0].title)}</p>
              <p className='md:w-4/5 md:text-3xl'>{t(heroInfo[0].description)}</p>
            </div>
          </div>
        </motion.div>

        {/* Link button */}
        <Link to="/about" onClick={() => { window.scrollTo(0,0) }}>
          <button className='flex justify-center items-center gap-1 w-32 md:w-48 h-10 md:h-16 cursor-pointer bg-red-500 mt-8'>
            <p className='text-white text-sm md:text-2xl'>{t("Read more")}</p>
            <img className='w-8 md:w-12 h-8 md:h-12 bg-white rounded-full' src={arrow} alt="arrow-svg" />
          </button>
        </Link>
        
      </motion.div>
    </section>
  )
}

export default SectionWrapper(Hero, "hero")