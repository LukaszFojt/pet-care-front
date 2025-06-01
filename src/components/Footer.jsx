import { footerLinks } from '../constants';
import { arrowUp, logoNew } from '../assets';
import { styles } from '../styles';
import { Link } from 'react-router-dom';
import { useTranslation } from '../TranslationContext';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <section id="footer">
      {/* Arrow */}
      <div className='flex w-full justify-end items-center pt-16 md:pt-0'>
        <a className='rounded-full mr-5 md:mr-10' onClick={() => { window.scrollTo(0, 0) }}>
          <img src={arrowUp} className="w-7 md:w-12 h-7 md:h-12 bg-red-500 rounded-full hover:scale-110" />
        </a>
      </div>

      <div className={`${styles.pText} width-full h-10 flex flex-col`}>
        <div className='flex flex-col gap-5 p-10'>

          {/* Links */}
          <ul className='flex flex-col md:items-center md:flex-row gap-2 md:gap-10'>
            <h3 className='md:text-2xl font-bold'>{t("Follow us")}</h3>
            {footerLinks.map((link) => (
              <li key={link.name} className='w-fit'>
                <a href={link.link} target="_blank" rel="noopener noreferrer" className='hover:scale-105 flex items-center'>
                  <div className="flex gap-2 items-center">
                    <img src={link.icon} alt="icon" className='w-8 md:w-12 h-8 md:h-12 mr-2 md:mr-5' />
                    {t(link.name)}
                  </div>
                </a>
              </li>
            ))}
          </ul>

          {/* Email */}
          <div className='md:flex md:gap-4'>
            <h3 className='md:text-2xl font-bold'>{t("Get in touch")}</h3>
            <a
              href="http://localhost:5174/"
              target="_blank"
              rel="noopener noreferrer"
              className='text-red-500 md:text-2xl'
            >
              {t("Send us an email")}
            </a>
          </div>

          {/* Logo + Rights */}
          <div className='flex justify-between'>
            <Link to='/' className='flex items-center cursor-pointer gap-2'>
              <img className='w-8 md:w-12 h-8 md:h-12 mr-2 md:mr-5' src={logoNew} />
              <p className='text-sm md:text-lg'>Pet Care</p>
            </Link>
            <div className='text-xs md:text-lg'>
              <p>@PetCare</p>
              <p>{t("All right reserved")}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Footer;
