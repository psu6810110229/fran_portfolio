import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import GalleryModal from '../GalleryModal/GalleryModal';
import type { CaseStudy, Localized } from '../../types';
import githubIcon from '../../assets/icons/github.svg';
import styles from './CaseReader.module.css';

interface Props {
  title: string;
  githubUrl: string;
  caseStudy: CaseStudy;
  lang: 'en' | 'th';
  onClose: () => void;
}

const labels = {
  en: { eyebrow: 'Case study', problem: 'The problem', role: 'My role', built: 'What the team built', soloBuilt: 'What I built', mine: 'What I led and built', soloMine: 'What I designed and built', hardest: 'The hardest part', decisions: 'Product and design decisions', collab: 'Working across the stack', result: 'The result', viewAll: (count: number) => `View all ${count} screens`, talk: 'Talk to me', code: 'View team code', soloCode: 'View code', close: 'Close' },
  th: { eyebrow: 'กรณีศึกษา', problem: 'โจทย์', role: 'บทบาทของผม', built: 'สิ่งที่ทีมสร้าง', soloBuilt: 'สิ่งที่ผมสร้าง', mine: 'สิ่งที่ผมดูแลและลงมือทำ', soloMine: 'สิ่งที่ผมออกแบบและพัฒนา', hardest: 'จุดที่ยากที่สุด', decisions: 'การตัดสินใจด้านโปรดักต์และดีไซน์', collab: 'การทำงานร่วมกันทั้งระบบ', result: 'ผลลัพธ์', viewAll: (count: number) => `ดูภาพทั้งหมด ${count} จอ`, talk: 'คุยกับผม', code: 'ดูโค้ดของทีม', soloCode: 'ดูโค้ด', close: 'ปิด' },
};

function CaseReader({ title, githubUrl, caseStudy: cs, lang, onClose }: Props) {
  const t = labels[lang];
  const dialogRef = useRef<HTMLDivElement>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const L = (v: Localized) => v[lang];
  const isSoloProject = title === 'GO-OUT';

  // Scroll lock + initial focus + focus restore (mount/unmount only).
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      prev?.focus();
    };
  }, []);

  // Escape + Tab focus trap, suspended while the nested gallery is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (galleryOpen) return;
      if (e.key === 'Escape') { onClose(); return; }
      const root = dialogRef.current;
      if (e.key !== 'Tab' || !root) return;
      const f = root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [galleryOpen, onClose]);

  const sections = [
    { k: 'problem', label: t.problem, body: <p>{L(cs.problem)}</p> },
    { k: 'role', label: t.role, body: <p>{L(cs.role)}</p> },
    { k: 'built', label: isSoloProject ? t.soloBuilt : t.built, body: <p>{L(cs.whatTeamBuilt)}</p> },
    { k: 'mine', label: isSoloProject ? t.soloMine : t.mine, body: <p>{L(cs.personalContribution)}</p> },
    {
      k: 'hardest', label: t.hardest, body: (
        <>
          <p className={styles.hardLead}>{L(cs.hardestIssue.headline)}</p>
          <p>{L(cs.hardestIssue.plain)}</p>
          <p>{L(cs.hardestIssue.whatWeDid)}</p>
        </>
      ),
    },
    { k: 'decisions', label: t.decisions, body: <p>{L(cs.decisions)}</p> },
    { k: 'collab', label: t.collab, body: <p>{L(cs.collaboration)}</p> },
  ];

  return createPortal(
    <>
      <motion.div
        className={styles.overlay}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
      >
        <motion.div
          ref={dialogRef}
          className={styles.dialog}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-title"
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.closeRow}>
            <button type="button" className={styles.close} onClick={onClose} aria-label={t.close}>✕</button>
          </div>
          <div className={styles.fadeTop} aria-hidden="true" />

          <header className={styles.head}>
            <span className={styles.eyebrow}>{t.eyebrow}</span>
            <h2 id="case-title" className={styles.title}>{title}</h2>
          </header>

          <div className={styles.sections}>
            {sections.map((s) => (
              <section key={s.k} className={styles.block}>
                <h3 className={styles.blockLabel}>{s.label}</h3>
                <div className={styles.prose}>{s.body}</div>
              </section>
            ))}

            <section className={styles.block}>
              <h3 className={styles.blockLabel}>{t.result}</h3>
              <div className={styles.prose}><p>{L(cs.result)}</p></div>
              <video className={styles.video} src={cs.media.video} poster={cs.media.videoPoster} controls preload="none" playsInline />
              <button type="button" className={styles.btnGhost} onClick={() => setGalleryOpen(true)}>{t.viewAll(cs.media.gallery.length)}</button>
            </section>

            <section className={styles.handoff}>
              <p className={styles.handoffText}>{L(cs.contactHandoff)}</p>
              <div className={styles.actions}>
                <a href="#contact" className={styles.btnPrimary} onClick={onClose}>{t.talk}</a>
                <a href={githubUrl} target="_blank" rel="noreferrer" className={styles.btnGhost}>
                  <img src={githubIcon} alt="" aria-hidden="true" className={styles.btnIcon} />
                  {isSoloProject ? t.soloCode : t.code}
                </a>
              </div>
            </section>
          </div>
          <div className={styles.fadeBottom} aria-hidden="true" />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {galleryOpen && (
          <GalleryModal key="case-gallery" images={cs.media.gallery} video={cs.media.video} initialIndex={0} onClose={() => setGalleryOpen(false)} />
        )}
      </AnimatePresence>
    </>,
    document.body,
  );
}

export default CaseReader;
