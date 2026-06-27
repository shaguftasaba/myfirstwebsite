import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const skillGroups = [
  {
    title: 'Business Skills',
    skills: ['MS Excel', 'Power BI', 'SQL', 'Finance', 'Business Analysis'],
  },
  {
    title: 'Technical Skills',
    skills: ['Python', 'HTML', 'CSS', 'JavaScript', 'React', 'Git', 'GitHub'],
  },
  {
    title: 'AI Skills',
    skills: ['ChatGPT', 'Claude', 'Gemini', 'Cursor', 'Copilot', 'Midjourney', 'Leonardo AI', 'n8n', 'Make.com', 'Prompt Engineering'],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Skills</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Capabilities that combine business sense with AI fluency.</h2>
          <p className="mt-6 text-base leading-8 text-slate-700 sm:text-lg">
            A premium skill set designed for an AI-focused business career, with strong technical knowledge and practical tools for modern workflows.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.div key={group.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="glass-card p-8">
              <h3 className="text-xl font-semibold text-slate-950">{group.title}</h3>
              <div className="mt-6 space-y-4">
                {group.skills.map((skill, idx) => (
                  <div key={skill} className="group flex items-center justify-between rounded-3xl border border-slate-200/80 bg-slate-50/90 p-4 transition hover:-translate-y-1 hover:border-brand-200 hover:bg-white">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{skill}</p>
                      <p className="mt-1 text-xs text-slate-500">Proficiency</p>
                    </div>
                    <CheckCircle2 className="h-6 w-6 text-brand-500 transition group-hover:scale-110" />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
