import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { BookOpen, Footprints } from 'lucide-react';
import './TwinPillars.css';

const pillars = [
  {
    id: 'faith',
    label: 'Christian Faith',
    title: 'Religion (Christian Faith)',
    description: 'The spiritual foundation and “why” behind the organization, aimed at advancing Christ’s kingdom, Christian education, and growing in favor with God and man.',
    Icon: BookOpen,
  },
  {
    id: 'discipline',
    label: 'Discipline',
    title: 'Discipline',
    description: 'The structural method and “how,” using military-style drill, uniforms, ranks, and structure to teach boys self-control, obedience, teamwork, and responsibility.',
    Icon: Footprints,
  },
];

export default function TwinPillars() {
  const [activeId, setActiveId] = useState(null);
  const [position, setPosition] = useState(null);
  const buttons = useRef({});
  const popover = useRef(null);
  const closeTimer = useRef(null);
  const pointerInPopover = useRef(false);
  const touchInteraction = useRef(false);
  const touchWasOpen = useRef(false);
  const active = pillars.find((pillar) => pillar.id === activeId);
  const tooltipId = active ? `pillar-description-${active.id}` : undefined;

  const cancelClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const show = (id) => {
    cancelClose();
    pointerInPopover.current = false;
    setActiveId(id);
  };

  const scheduleClose = (id) => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => {
      if (!touchInteraction.current && !pointerInPopover.current && !buttons.current[id]?.matches(':focus-visible')) {
        setActiveId((current) => current === id ? null : current);
      }
    }, 180);
  };

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!activeId) return;
    const dismissOutside = (event) => {
      if (popover.current?.contains(event.target)) return;
      if (Object.values(buttons.current).some((button) => button?.contains(event.target))) return;
      setActiveId(null);
    };
    const dismissEscape = (event) => {
      if (event.key === 'Escape') setActiveId(null);
    };
    document.addEventListener('pointerdown', dismissOutside);
    document.addEventListener('keydown', dismissEscape);
    return () => {
      document.removeEventListener('pointerdown', dismissOutside);
      document.removeEventListener('keydown', dismissEscape);
    };
  }, [activeId]);

  useLayoutEffect(() => {
    if (!activeId) return;
    const place = (event) => {
      const button = buttons.current[activeId];
      const panel = popover.current;
      if (!button || !panel) return;
      if (event?.target && panel.contains(event.target)) return;
      const rect = button.getBoundingClientRect();
      if (event?.type === 'scroll' && (rect.bottom <= 0 || rect.top >= window.innerHeight)) {
        setActiveId(null);
        return;
      }
      const width = panel.offsetWidth;
      const height = panel.offsetHeight;
      const gutter = 16;
      const gap = 12;
      const labelRects = Object.values(buttons.current).filter(Boolean).map((label) => label.getBoundingClientRect());
      const topEdge = window.innerWidth <= 760 ? Math.min(...labelRects.map((label) => label.top)) : rect.top;
      const bottomEdge = window.innerWidth <= 760 ? Math.max(...labelRects.map((label) => label.bottom)) : rect.bottom;
      const left = Math.max(gutter, Math.min(rect.left + rect.width / 2 - width / 2, window.innerWidth - width - gutter));
      const below = bottomEdge + gap + height <= window.innerHeight - gutter;
      const desiredTop = below ? bottomEdge + gap : topEdge - height - gap;
      const top = Math.max(gutter, Math.min(desiredTop, window.innerHeight - height - gutter));
      setPosition({
        left,
        top,
        placement: below ? 'below' : 'above',
        arrow: Math.max(24, Math.min(rect.left + rect.width / 2 - left, width - 24)),
      });
    };
    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, { capture: true, passive: true });
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [activeId]);

  return <>
    <div className="hero-pillars" role="group" aria-label="The twin pillars of the Boys’ Brigade">
      {pillars.map(({ id, label, Icon }) => {
        const expanded = activeId === id;
        return <button
          key={id}
          ref={(element) => { buttons.current[id] = element; }}
          type="button"
          className={`floating-badge pillar-trigger badge-${id}`}
          aria-expanded={expanded}
          aria-describedby={expanded ? tooltipId : undefined}
          aria-controls={expanded ? tooltipId : undefined}
          onPointerDown={(event) => {
            touchInteraction.current = event.pointerType === 'touch';
            touchWasOpen.current = activeId === id;
          }}
          onPointerEnter={(event) => {
            if (event.pointerType !== 'touch') {
              touchInteraction.current = false;
              show(id);
            }
          }}
          onPointerLeave={(event) => { if (event.pointerType !== 'touch') scheduleClose(id); }}
          onFocus={(event) => {
            if (event.currentTarget.matches(':focus-visible')) touchInteraction.current = false;
            show(id);
          }}
          onBlur={() => scheduleClose(id)}
          onClick={() => {
            if (touchInteraction.current && touchWasOpen.current) {
              cancelClose();
              setActiveId(null);
            } else show(id);
          }}
        ><Icon aria-hidden="true" /><span>{label}</span></button>;
      })}
    </div>
    {active && createPortal(<div
      ref={popover}
      id={tooltipId}
      role="tooltip"
      className={`pillar-popover pillar-popover-${position?.placement || 'below'}`}
      style={{
        left: position?.left ?? 0,
        top: position?.top ?? 0,
        visibility: position ? 'visible' : 'hidden',
        '--pillar-arrow-left': `${position?.arrow || 24}px`,
      }}
      onPointerEnter={(event) => {
        pointerInPopover.current = true;
        if (event.pointerType === 'touch') touchInteraction.current = true;
        cancelClose();
      }}
      onPointerLeave={(event) => {
        pointerInPopover.current = false;
        if (event.pointerType !== 'touch') scheduleClose(active.id);
      }}
    ><strong>{active.title}</strong><p>{active.description}</p></div>, document.body)}
  </>;
}
