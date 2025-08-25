import { BACKGROUNDS } from "@/modules/Analytics";
import { AnimatePresence, motion } from "framer-motion";


type Props = {
    item:any
    idx:number
}
export default function DashboardCard(props: Props) {
    const { item, idx } = props;
  return (
    <div>
      <section
        key={item.title}
        className={`${BACKGROUNDS[idx]} shadow-lg rounded-xl p-6 flex items-center justify-between text-white hover:shadow-xl transition-all duration-300 hover:scale-[1.01]`}
      >
        <div className="flex flex-col">
          <h3 className="text-sm font-medium opacity-90 mb-1">{item.title}</h3>
          <AnimatePresence mode="popLayout">
            <motion.p
              key={item.value}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-bold"
            >
              {item.value}
            </motion.p>
          </AnimatePresence>
        </div>
        <div
          className={`${BACKGROUNDS[idx]} bg-opacity-20 border-4 border-white h-20 w-20 grid place-content-center shrink-0 rounded-full`}
        >
          <span className="text-4xl">{item.icon}</span>
        </div>
      </section>
    </div>
  );
}
