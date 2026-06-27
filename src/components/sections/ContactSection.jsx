import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="glass-card p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Contact</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Let’s create AI experiences that move business forward.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
            Reach out for future collaborations, internship opportunities, or AI business strategy discussions.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <motion.a whileHover={{ y: -4 }} className="group rounded-[2rem] border border-slate-200/80 bg-white/85 p-6 transition hover:border-brand-200 hover:shadow-soft" href="mailto:sabashagufta8@gmail.com">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-brand-600">
                <Mail className="h-6 w-6" />
              </div>
              <p className="mt-6 font-semibold text-slate-950">Email</p>
              <p className="mt-2 text-sm text-slate-500">sabashagufta8@gmail.com</p>
            </motion.a>
            <motion.div whileHover={{ y: -4 }} className="group rounded-[2rem] border border-slate-200/80 bg-white/85 p-6 transition hover:border-secondary/70 hover:shadow-soft">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-100 text-slate-700">
                <Linkedin className="h-6 w-6" />
              </div>
              <p className="mt-6 font-semibold text-slate-950">LinkedIn</p>
              <p className="mt-2 text-sm text-slate-500">Future profile</p>
            </motion.div>
            <motion.div whileHover={{ y: -4 }} className="group rounded-[2rem] border border-slate-200/80 bg-white/85 p-6 transition hover:border-brand-200 hover:shadow-soft">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-100 text-slate-700">
                <Github className="h-6 w-6" />
              </div>
              <p className="mt-6 font-semibold text-slate-950">GitHub</p>
              <p className="mt-2 text-sm text-slate-500">Future showcase</p>
            </motion.div>
          </div>
          <button type="button" className="mt-12 inline-flex items-center justify-center rounded-full bg-brand-500 px-8 py-4 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-brand-600">
            Send a Message
          </button>
        </div>
      </div>
    </section>
  );
}
