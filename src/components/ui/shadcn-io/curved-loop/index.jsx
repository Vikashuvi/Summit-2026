import { useRef, useEffect, useState, useMemo, useId } from 'react';

const CurvedLoop = ({
  marqueeText = 'Shadcn is great!',
  speed = 2,
  className = '',
  curveAmount = 400,
  direction = 'left',
  interactive = true,
  containerClassName = '',
  sShape = false
}) => {
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const measureRef = useRef(null);
  const textPathRef = useRef(null);
  const pathRef = useRef(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;
  const baseY = 40;
  const effectiveCurve = isDesktop ? curveAmount : 60;
  const pathD = useMemo(() => (
    sShape
      ? `M-100,${baseY} Q 500,${baseY + effectiveCurve} 820,${baseY} Q 1160,${baseY - effectiveCurve} 1540,${baseY}`
      : `M-100,${baseY} Q500,${baseY + effectiveCurve} 1540,${baseY}`
  ), [effectiveCurve, sShape]);

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);
  const animationRef = useRef(0);

  // Calculate how many repetitions we need with some buffer
  const repetitions = spacing > 0 ? Math.ceil(2000 / spacing) + 3 : 1;
  const totalText = Array(repetitions).fill(text).join('');
  const ready = spacing > 0;

  useEffect(() => {
    // Force a re-measure after a brief delay to ensure styles are applied
    const measure = () => {
      if (measureRef.current) {
        const length = measureRef.current.getComputedTextLength();
        setSpacing(length);
      }
    };
    
    measure();
    // Re-measure after styles settle
    const timer = setTimeout(measure, 50);
    return () => clearTimeout(timer);
  }, [text, className]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = 0;
      textPathRef.current.setAttribute('startOffset', initial + 'px');
      setOffset(initial);
    }
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready) return;
    
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
        let newOffset = currentOffset + delta;
        
        // Wrap the offset to create seamless loop
        const wrapPoint = spacing;
        if (dirRef.current === 'left') {
          if (newOffset <= -wrapPoint) {
            newOffset += wrapPoint;
          }
        } else {
          if (newOffset >= wrapPoint) {
            newOffset -= wrapPoint;
          }
        }
        
        textPathRef.current.setAttribute('startOffset', newOffset + 'px');
        setOffset(newOffset);
      }
      animationRef.current = requestAnimationFrame(step);
    };
    
    animationRef.current = requestAnimationFrame(step);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [spacing, speed, ready]);

  const onPointerDown = (e) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    
    const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
    let newOffset = currentOffset + dx;
    
    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset >= wrapPoint) newOffset -= wrapPoint;
    
    textPathRef.current.setAttribute('startOffset', newOffset + 'px');
    setOffset(newOffset);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? 'right' : 'left';
  };

  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';

  // Remove the hardcoded text size from svg element and apply className to both measure and display text
  return (
    <div
      className={`flex items-center justify-center w-full min-h-[220px] ${containerClassName}`}
      style={{ visibility: ready ? 'visible' : 'hidden', cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}>
      <svg
        className="select-none w-full overflow-visible block aspect-[100/12] font-bold uppercase leading-none"
        viewBox="0 0 1440 120">
        {/* Measurement text - apply same className to ensure accurate measurement */}
        <text
          ref={measureRef}
          xmlSpace="preserve"
          className={`fill-white ${className}`}
          style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none', position: 'absolute' }}>
          {text}
        </text>
        
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        
        {ready && (
          <text xmlSpace="preserve" className={`fill-white ${className}`}>
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset={offset + 'px'}
              xmlSpace="preserve">
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;