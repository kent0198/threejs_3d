
import { motion } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component, idName) =>
  function HOC() {
    
    return (
      <motion.section
         variants={staggerContainer()}
         initial='hidden'
         whileInView='show'
         viewport={{ once: true, amount: 0.1 }} 
         className={`${styles.padding} max-w-7xmx-auto relative z-0 pt-10`}
      >
        <span className='hl ash-span' id={idName}>
       
        </span>

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;