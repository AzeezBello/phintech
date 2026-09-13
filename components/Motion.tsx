import type {ReactNode} from 'react';

export function Reveal({children,className='',delay=0}:{children:ReactNode;className?:string;delay?:number}){return <div className={`reveal-on-scroll ${className}`} style={{animationDelay:`${delay}s`}}>{children}</div>}