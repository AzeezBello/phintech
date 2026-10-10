'use client';

import type {ReactNode} from 'react';
import {useEffect,useRef} from 'react';

export function Reveal({children,className='',delay=0}:{children:ReactNode;className?:string;delay?:number}){
  const ref=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const element=ref.current;
    if(!element)return;

    document.documentElement.classList.add('motion-ready');
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window)){
      element.dataset.visible='true';
      return;
    }

    const observer=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){
        element.dataset.visible='true';
        observer.unobserve(element);
      }
    },{threshold:.12,rootMargin:'0px 0px -36px 0px'});

    observer.observe(element);
    return ()=>observer.disconnect();
  },[]);

  return <div ref={ref} className={`reveal-on-scroll ${className}`} style={{transitionDelay:`${delay}s`}}>{children}</div>
}