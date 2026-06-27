import { motion } from 'framer-motion';

export function QuoteSection() {
  return (
    <motion.section id="quote" className="px-6 py-20 sm:px-8 lg:px-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
      <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-slate-200/80 bg-slate-950/95 p-16 text-center shadow-soft">
        <p className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
          “Technology becomes truly powerful when it solves real business problems.”
        </p>
      </div>
    </motion.section>
  );
}
