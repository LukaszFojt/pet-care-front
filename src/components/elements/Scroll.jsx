import { motion } from "framer-motion"

const Scroll = ({link}) => {
  return (
    <div className='flex justify-center z-20'>
      <a 
      className='rounded-full'
      href={`#${link}`}>
        <div className="w-[35px] h-[64px] justify-center rounded-3xl border-4 border-blue-300 flex p-2">
          <motion.div 
            animate={{
            y: [0, 24, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop'
            }}
            className="w-3 h-3 rounded-full mb-1 bg-blue-300"
          />
        </div>
      </a>
    </div>
  )
}

export default Scroll