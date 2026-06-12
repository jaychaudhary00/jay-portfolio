import React from "react"
import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

// ✅ EmailJS config — apne IDs yahan daalo
const EMAILJS_SERVICE_ID  = 'service_2kgtahk'   // EmailJS → Email Services → Service ID
const EMAILJS_TEMPLATE_ID = 'template_x1oefep'  // EmailJS → Email Templates → Template ID
const EMAILJS_PUBLIC_KEY  = 'QACOTdNpSIEwdEdiE'  // EmailJS → Account → API Keys → Public Key
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion"
import { Mail, Phone, MapPin, ExternalLink, Copy, Check, ChevronDown, Code2, Zap, Globe, Database, Cpu, Terminal } from "lucide-react"
import { GithubIcon, LinkedinIcon } from './icons'
import './index.css'

const ROLES = ['MERN Stack Developer', 'Full-Stack Engineer', 'AI Integrations Dev', 'React Specialist', 'Node.js Architect']

const SKILLS = [
  { name: 'React.js', icon: 'Code2', level: 90, color: '#61dafb' },
  { name: 'Node.js', icon: 'Terminal', level: 88, color: '#68a063' },
  { name: 'Express.js', icon: 'Zap', level: 87, color: '#e2e2e2' },
  { name: 'MongoDB', icon: 'Database', level: 85, color: '#47a248' },
  { name: 'JavaScript', icon: 'Code2', level: 92, color: '#f7df1e' },
  { name: 'TypeScript', icon: 'Code2', level: 82, color: '#3178c6' },
  { name: 'REST APIs', icon: 'Globe', level: 90, color: '#5ac8fa' },
  { name: 'AI Integration', icon: 'Cpu', level: 80, color: '#f472b6' },
]

const TIMELINE = [
  { year: '2023', title: 'Started B.Sc. CA & IT', desc: 'Enrolled at HNGU — dove into programming, data structures, and web fundamentals.', color: '#5ac8fa' },
  { year: '2025', title: 'First Full-Stack Build', desc: 'Built first production-grade MERN application. Mastered REST APIs, JWT auth, and MongoDB Atlas.', color: '#0a84ff' },
  { year: '2026', title: 'AgroAI — Built & Deployed', desc: 'Architected and shipped AgroAI — multi-role AI agri platform with 5-language support, Razorpay, OpenAI, and live market data.', color: '#10b981' },
  { year: '2026', title: 'B.Sc. Graduated', desc: 'Graduated from HNGU. Now looking for internship and full-time opportunities.', color: '#f59e0b' },
]

const PROJECT_FEATURES = ['AI Chatbot + Voice (Speech-to-Text)', 'Live Mandi Price Tracking', 'Razorpay Marketplace', '5-Language i18n (EN/HI/GU/PA/MR)', 'RBAC Multi-Role Dashboards', 'Seller Approval Flows + Email Notifications']
const PROJECT_TAGS = ['MongoDB', 'Express', 'React', 'Node', 'TypeScript', 'OpenAI', 'Razorpay', 'Cloudinary', 'Firebase', 'JWT']

function useMouse() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  useEffect(() => {
    const h = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [x, y])
  return { x, y }
}

function Cursor() {
  const { x, y } = useMouse()
  const cx = useSpring(x, { stiffness: 800, damping: 40 })
  const cy = useSpring(y, { stiffness: 800, damping: 40 })
  const rx = useSpring(x, { stiffness: 150, damping: 25 })
  const ry = useSpring(y, { stiffness: 150, damping: 25 })
  return (
    <>
      <motion.div className="cursor" style={{ left: cx, top: cy }} />
      <motion.div className="cursor-ring" style={{ left: rx, top: ry }} />
    </>
  )
}

function Particles() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current!
    const ctx = c.getContext('2d')!
    let W = c.width = window.innerWidth
    let H = c.height = window.innerHeight
    const pts = Array.from({ length: 55 }, () => ({ x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-.5)*.3, vy: (Math.random()-.5)*.3, r: Math.random()*1.2+.4 }))
    let raf: number
    const draw = () => {
      ctx.clearRect(0,0,W,H)
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy
        if(p.x<0||p.x>W)p.vx*=-1
        if(p.y<0||p.y>H)p.vy*=-1
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle='rgba(10,132,255,.3)'; ctx.fill()
      })
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y)
        if(d<110){ ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y)
          ctx.strokeStyle=`rgba(10,132,255,${.07*(1-d/110)})`; ctx.lineWidth=.5; ctx.stroke() }
      }
      raf=requestAnimationFrame(draw)
    }
    draw()
    const onR=()=>{ W=c.width=window.innerWidth; H=c.height=window.innerHeight }
    window.addEventListener('resize',onR)
    return()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize',onR) }
  },[])
  return <canvas id="particles" ref={ref}/>
}

function Spotlight() {
  const {x,y}=useMouse()
  const [pos,setPos]=useState({x:'50%',y:'50%'})
  useEffect(()=>x.on('change',v=>setPos(p=>({...p,x:`${v}px`}))),[x])
  useEffect(()=>y.on('change',v=>setPos(p=>({...p,y:`${v}px`}))),[y])
  return <div className="spotlight" style={{background:`radial-gradient(600px at ${pos.x} ${pos.y},rgba(10,132,255,.07),transparent 70%)`}}/>
}

function ScrollProgress() {
  const [w,setW]=useState(0)
  useEffect(()=>{
    const h=()=>setW(window.scrollY/(document.body.scrollHeight-window.innerHeight)*100)
    window.addEventListener('scroll',h)
    return()=>window.removeEventListener('scroll',h)
  },[])
  return <div id="progress-bar" style={{width:`${w}%`,transition:'width .1s'}}/>
}

function Loader({onDone}:{onDone:()=>void}) {
  useEffect(()=>{ const t=setTimeout(onDone,2200); return()=>clearTimeout(t) },[onDone])
  return (
    <motion.div className="loader" exit={{opacity:0,transition:{duration:.6}}}>
      <motion.p initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:.2}} style={{fontSize:13,fontWeight:600,letterSpacing:'.16em',color:'rgba(255,255,255,.25)',textTransform:'uppercase'}}>Jay Chaudhari</motion.p>
      <div className="loader-bar"><div className="loader-fill"/></div>
      <motion.p initial={{opacity:0}} animate={{opacity:.25}} transition={{delay:.6}} style={{fontSize:11,letterSpacing:'.12em',color:'rgba(255,255,255,.5)'}}>PORTFOLIO · 2026</motion.p>
    </motion.div>
  )
}

// ✅ FIX 1 & 2: Typewriter — setState wrapped in setTimeout to avoid calling setState
// synchronously within an effect body (eslint react-hooks/set-state-in-effect)
function Typewriter() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [del, setDel] = useState(false)
  const idxRef = useRef(idx)

  useEffect(() => { idxRef.current = idx }, [idx])

  useEffect(() => {
    const target = ROLES[idx]
    let t: ReturnType<typeof setTimeout>

    if (!del && text.length < target.length) {
      t = setTimeout(() => setText(target.slice(0, text.length + 1)), 62)
    } else if (!del && text.length === target.length) {
      t = setTimeout(() => setDel(true), 2200)
    } else if (del && text.length > 0) {
      t = setTimeout(() => setText(text.slice(0, -1)), 34)
    } else {
      // ✅ Wrapped in setTimeout(0) — avoids cascading setState inside effect body
      t = setTimeout(() => {
        setDel(false)
        setIdx((idxRef.current + 1) % ROLES.length)
      }, 0)
    }

    return () => clearTimeout(t)
  }, [text, del, idx])

  return (
    <span className="grad-purple" style={{ fontWeight: 600 }}>
      {text}<span className="typewriter-cursor" />
    </span>
  )
}

function Counter({to,suffix=''}:{to:number,suffix?:string}) {
  const [v,setV]=useState(0)
  const ref=useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting){
        let s=0; const step=()=>{ s+=Math.ceil(to/40); if(s>=to){setV(to);return}; setV(s); requestAnimationFrame(step) }
        requestAnimationFrame(step); obs.disconnect()
      }
    },{threshold:.5})
    if(ref.current)obs.observe(ref.current)
    return()=>obs.disconnect()
  },[to])
  return <div ref={ref} className="counter-num">{v}{suffix}</div>
}

function Nav() {
  const [sc,setSc]=useState(false)
  const [open,setOpen]=useState(false)
  useEffect(()=>{ const h=()=>setSc(window.scrollY>40); window.addEventListener('scroll',h); return()=>window.removeEventListener('scroll',h) },[])
  const go=(id:string)=>{ document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setOpen(false) }
  return (
    <>
      <motion.nav initial={{y:-60,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.3,duration:.5}}
        style={{background:sc?'rgba(5,5,8,.92)':'rgba(5,5,8,.5)'}}>
        <span style={{fontSize:15,fontWeight:700,letterSpacing:'-.5px',background:'linear-gradient(135deg,#fff,#5ac8fa)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>JC.</span>
        {/* Desktop nav */}
        <div className="nav-desktop" style={{display:'flex',gap:28,alignItems:'center'}}>
          {['about','skills','projects','contact'].map(s=>(
            <button key={s} onClick={()=>go(s)} style={{background:'none',border:'none',color:'rgba(255,255,255,.45)',fontSize:13,fontWeight:500,cursor:'none',transition:'color .2s',textTransform:'capitalize',letterSpacing:'-.2px'}}
              onMouseEnter={e=>(e.currentTarget.style.color='#fff')} onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,.45)')}>{s}</button>
          ))}
          <a href="mailto:cjay49586@gmail.com" className="mag-btn btn-primary-mag" style={{fontSize:13,padding:'8px 20px',borderRadius:8}}>Hire me</a>
        </div>
        {/* Mobile hamburger */}
        <button className="nav-hamburger" onClick={()=>setOpen(o=>!o)}
          style={{display:'none',background:'none',border:'none',color:'#fff',cursor:'pointer',padding:4,flexDirection:'column',gap:5}}>
          <span style={{display:'block',width:22,height:2,background:'#fff',borderRadius:2,transition:'all .3s',transform:open?'rotate(45deg) translate(5px,5px)':'none'}}/>
          <span style={{display:'block',width:22,height:2,background:'#fff',borderRadius:2,transition:'all .3s',opacity:open?0:1}}/>
          <span style={{display:'block',width:22,height:2,background:'#fff',borderRadius:2,transition:'all .3s',transform:open?'rotate(-45deg) translate(5px,-5px)':'none'}}/>
        </button>
      </motion.nav>
      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
            className="nav-mobile-menu"
            style={{position:'fixed',top:60,left:0,right:0,zIndex:999,background:'rgba(5,5,8,.97)',padding:'20px 24px',display:'flex',flexDirection:'column',gap:4,borderBottom:'1px solid rgba(255,255,255,.08)'}}>
            {['about','skills','projects','contact'].map(s=>(
              <button key={s} onClick={()=>go(s)}
                style={{background:'none',border:'none',color:'rgba(255,255,255,.7)',fontSize:16,fontWeight:500,cursor:'pointer',textTransform:'capitalize',padding:'12px 0',textAlign:'left',borderBottom:'1px solid rgba(255,255,255,.05)'}}>
                {s}
              </button>
            ))}
            <a href="mailto:cjay49586@gmail.com" style={{marginTop:12,display:'block',textAlign:'center',padding:'12px',background:'#0a84ff',borderRadius:10,color:'#fff',textDecoration:'none',fontSize:14,fontWeight:600}}>
              Hire me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Hero() {
  return (
    <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',paddingTop:90,position:'relative'}}>
      <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.1,duration:.6}}
        style={{fontSize:13,fontWeight:500,letterSpacing:'.18em',color:'var(--accent)',textTransform:'uppercase',marginBottom:28,zIndex:2}}>
        Jay Chaudhari — Full-Stack Engineer
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.8, ease: "easeOut" }}
        style={{
          fontSize: "clamp(40px,7vw,84px)",
          fontWeight: 600,
          letterSpacing: "-2px",
          lineHeight: 1.1,
          marginBottom: 28,
          zIndex: 2,
          maxWidth: 950,
          color: "rgba(255,255,255,.95)",
        }}
      >
        Turning Ideas Into
        <br />
        <span className="grad">Production-Ready Software</span>
      </motion.h1>

      {/* ✅ FIX: Typewriter is now actually used here — resolves "defined but never used" warning */}
      <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.32,duration:.6}}
        style={{fontSize:18,color:'rgba(255,255,255,.55)',marginBottom:20,zIndex:2,minHeight:28}}>
        <Typewriter />
      </motion.div>

      <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.4,duration:.6}}
        style={{maxWidth:520,fontSize:17,color:'rgba(255,255,255,.4)',lineHeight:1.8,marginBottom:44,fontWeight:300,zIndex:2}}>
        Production-grade MERN apps, real-time data pipelines, and multi-language support — designed and shipped end to end from Ahmedabad, Gujarat.
      </motion.p>

      <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.55,duration:.6}}
        style={{display:'flex',gap:14,flexWrap:'wrap',justifyContent:'center',zIndex:2,marginBottom:40}}>
        <motion.button whileHover={{scale:1.04}} whileTap={{scale:0.97}}
          onClick={()=>document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})} className="mag-btn btn-primary-mag" style={{gap:8,display:'flex',alignItems:'center'}}>
          View my work <ExternalLink size={14}/>
        </motion.button>
        <motion.a whileHover={{scale:1.04}} whileTap={{scale:0.97}}
          href="https://github.com/jaychaudhary00" target="_blank" rel="noreferrer" className="mag-btn btn-outline-mag" style={{gap:8,display:'flex',alignItems:'center'}}>
          <GithubIcon size={14}/> GitHub
        </motion.a>
      </motion.div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7}}
        style={{display:'inline-flex',alignItems:'center',gap:8,zIndex:2}}>
        <span className="status-dot"/><span style={{fontSize:12,fontWeight:500,color:'#10b981',letterSpacing:'.04em'}}>Available for opportunities</span>
      </motion.div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}}
        style={{position:'absolute',bottom:44,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
        <motion.div animate={{y:[0,7,0]}} transition={{repeat:Infinity,duration:2.2}}>
          <ChevronDown size={16} color="rgba(255,255,255,.18)"/>
        </motion.div>
      </motion.div>
    </section>
  )
}

function Stats() {
  return (
    <section style={{paddingTop:0,paddingBottom:80}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:1,background:'rgba(255,255,255,.05)',borderRadius:16,overflow:'hidden',border:'1px solid rgba(255,255,255,.06)'}}>
        {[{n:5,s:'+',l:'Languages supported'},{n:4,s:'',l:'User roles'},{n:10,s:'+',l:'API integrations'},{n:1,s:'',l:'Production app shipped'}].map(({n,s,l})=>(
          <div key={l} style={{background:'#050508',padding:'40px 28px',textAlign:'center'}}>
            <Counter to={n} suffix={s}/>
            <p style={{fontSize:12,color:'rgba(255,255,255,.3)',marginTop:8,fontWeight:400}}>{l}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about">
      <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}}>
        <p style={{fontSize:11,fontWeight:600,letterSpacing:'.14em',color:'#0a84ff',textTransform:'uppercase',marginBottom:16}}>Journey</p>
        <h2 style={{fontSize:'clamp(32px,5vw,52px)',fontWeight:800,letterSpacing:'-2px',marginBottom:16,lineHeight:1.05}}>
          From curious student<br/><span className="grad">to production engineer.</span>
        </h2>
        <p style={{fontSize:16,color:'rgba(255,255,255,.38)',maxWidth:520,lineHeight:1.8,marginBottom:72,fontWeight:300}}>
          Based in Ahmedabad, Gujarat. Motivated by solving real problems for real users — especially in agriculture and rural India.
        </p>
      </motion.div>
      <div style={{paddingLeft:28,position:'relative'}}>
        <div style={{position:'absolute',left:0,top:0,bottom:0,width:1,background:'linear-gradient(to bottom,#0a84ff,rgba(10,132,255,.05))'}}/>
        {TIMELINE.map((t,i)=>(
          <motion.div key={t.year+t.title} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.12,duration:.5}}
            style={{position:'relative',paddingLeft:32,paddingBottom:i<TIMELINE.length-1?52:0}}>
            <div style={{position:'absolute',left:-5,top:6,width:10,height:10,borderRadius:'50%',background:t.color,boxShadow:`0 0 16px ${t.color}`}}/>
            <span style={{fontSize:11,fontWeight:700,color:t.color,letterSpacing:'.08em'}}>{t.year}</span>
            <h3 style={{fontSize:18,fontWeight:600,letterSpacing:'-.4px',margin:'6px 0 8px'}}>{t.title}</h3>
            <p style={{fontSize:14,color:'rgba(255,255,255,.38)',lineHeight:1.7,maxWidth:460,fontWeight:300}}>{t.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function SkillIcon({name}:{name:string}) {
  const icons: Record<string,React.ReactElement> = {
    Code2:<Code2 size={18}/>, Terminal:<Terminal size={18}/>, Zap:<Zap size={18}/>,
    Database:<Database size={18}/>, Globe:<Globe size={18}/>, Cpu:<Cpu size={18}/>
  }
  return icons[name] || <Code2 size={18}/>
}

function Skills() {
  return (
    <section id="skills">
      <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}}>
        <p style={{fontSize:11,fontWeight:600,letterSpacing:'.14em',color:'#0a84ff',textTransform:'uppercase',marginBottom:16}}>Capabilities</p>
        <h2 style={{fontSize:'clamp(32px,5vw,52px)',fontWeight:800,letterSpacing:'-2px',marginBottom:16,lineHeight:1.05}}>
          The full stack.<br/><span className="grad">Front to back.</span>
        </h2>
        <p style={{fontSize:16,color:'rgba(255,255,255,.38)',maxWidth:480,lineHeight:1.8,marginBottom:64,fontWeight:300}}>
          JavaScript and TypeScript across every layer — pixel-precise UIs to fault-tolerant APIs.
        </p>
      </motion.div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(195px,1fr))',gap:10}}>
        {SKILLS.map((s,i)=>(
          <motion.div key={s.name} className="skill-card glass" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.07,duration:.4}}
            whileHover={{scale:1.04,rotateX:-4,rotateY:4,transition:{duration:.15}}}
            style={{borderRadius:16,padding:'22px 20px',cursor:'none',perspective:800}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:14}}>
              <span style={{color:s.color,opacity:.85}}><SkillIcon name={s.icon}/></span>
              <span style={{fontSize:11,fontWeight:700,color:'rgba(255,255,255,.2)'}}>{s.level}%</span>
            </div>
            <p style={{fontSize:14,fontWeight:500,marginBottom:14,letterSpacing:'-.2px'}}>{s.name}</p>
            <div style={{height:2,background:'rgba(255,255,255,.06)',borderRadius:2}}>
              <motion.div initial={{width:0}} whileInView={{width:`${s.level}%`}} viewport={{once:true}} transition={{delay:i*.07+.3,duration:.8,ease:'easeOut'}}
                style={{height:'100%',borderRadius:2,background:`linear-gradient(90deg,${s.color}66,${s.color})`}}/>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.4}}
        style={{marginTop:28,display:'flex',flexWrap:'wrap',gap:8,alignItems:'center'}}>
        <span style={{fontSize:11,color:'rgba(255,255,255,.22)',marginRight:6}}>Also:</span>
        {['Tailwind CSS','Cloudinary','Firebase','Razorpay','Nodemailer','bcrypt','Git','Postman','MySQL','RBAC','i18n','JWT','Speech-to-Text'].map(t=>(
          <span key={t} className="tag-pill">{t}</span>
        ))}
      </motion.div>
    </section>
  )
}

function Projects() {
  const cardRef=useRef<HTMLDivElement>(null)
  const onMove=(e:React.MouseEvent<HTMLDivElement>)=>{
    const r=e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx',`${e.clientX-r.left}px`)
    e.currentTarget.style.setProperty('--my',`${e.clientY-r.top}px`)
  }
  return (
    <section id="projects">
      <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}}>
        <p style={{fontSize:11,fontWeight:600,letterSpacing:'.14em',color:'#0a84ff',textTransform:'uppercase',marginBottom:16}}>Work</p>
        <h2 style={{fontSize:'clamp(32px,5vw,52px)',fontWeight:800,letterSpacing:'-2px',marginBottom:16,lineHeight:1.05}}>
          Built solo.<br/><span className="grad">Shipped to production.</span>
        </h2>
        <p style={{fontSize:16,color:'rgba(255,255,255,.38)',maxWidth:480,lineHeight:1.8,marginBottom:64,fontWeight:300}}>
          End-to-end full-stack application architected, built, and deployed independently.
        </p>
      </motion.div>
      <motion.div ref={cardRef} className="proj-card glass" onMouseMove={onMove}
        initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}}
        style={{borderRadius:24,overflow:'hidden'}}>
        <div className="card-glow"/>
        <div style={{padding:'clamp(24px,5vw,44px) clamp(20px,5vw,48px) 0'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(16,185,129,.08)',border:'1px solid rgba(16,185,129,.18)',borderRadius:99,padding:'5px 14px',marginBottom:24}}>
            <span className="status-dot"/><span style={{fontSize:11,fontWeight:600,color:'#10b981',letterSpacing:'.07em',textTransform:'uppercase'}}>Flagship Project</span>
          </div>
          <h3 style={{fontSize:'clamp(28px,4vw,46px)',fontWeight:800,letterSpacing:'-1.5px',marginBottom:12}}>AgroAI</h3>
          <p style={{fontSize:14,fontWeight:500,color:'rgba(255,255,255,.3)',marginBottom:18,letterSpacing:'-.2px'}}>AI-powered agricultural platform for Bharat</p>
          <p style={{fontSize:15,color:'rgba(255,255,255,.45)',lineHeight:1.8,maxWidth:580,fontWeight:300,marginBottom:30}}>
            Multi-role platform serving Indian farmers with AI chatbot, voice assistant, live mandi prices, marketplace with payments, and support for 5 languages. Architected and shipped solo.
          </p>
        </div>
        <div style={{padding:'0 clamp(20px,5vw,48px)',display:'flex',flexWrap:'wrap',gap:7,marginBottom:36}}>
          {PROJECT_TAGS.map(t=><span key={t} className="tag-pill">{t}</span>)}
        </div>
        <div style={{borderTop:'1px solid rgba(255,255,255,.06)',padding:`32px clamp(20px,5vw,48px)`,display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))',gap:16}}>
          {PROJECT_FEATURES.map((f,fi)=>(
            <motion.div key={f} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:fi*.06}}
              style={{display:'flex',alignItems:'flex-start',gap:10}}>
              <div style={{width:20,height:20,borderRadius:6,background:'rgba(16,185,129,.1)',border:'1px solid rgba(16,185,129,.18)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>
                <Check size={11} color="#10b981"/>
              </div>
              <span style={{fontSize:13,color:'rgba(255,255,255,.5)',lineHeight:1.55}}>{f}</span>
            </motion.div>
          ))}
        </div>
        <div style={{borderTop:'1px solid rgba(255,255,255,.06)',padding:`24px clamp(20px,5vw,48px)`,display:'flex',gap:12,flexWrap:'wrap'}}>
          <a href="https://agroai-platform-git-main-jay-chadharu-s-projects.vercel.app" target="_blank" rel="noreferrer" className="mag-btn btn-primary-mag" style={{gap:8,display:'flex',alignItems:'center',fontSize:13}}>
            Live demo <ExternalLink size={14}/>
          </a>
          <a href="https://github.com/jaychaudhary00/ai-agriculture-platform" target="_blank" rel="noreferrer" className="mag-btn btn-outline-mag" style={{gap:8,display:'flex',alignItems:'center',fontSize:13}}>
            <GithubIcon size={14}/> View source
          </a>
        </div>
      </motion.div>
    </section>
  )
}

function Contact() {
  const [copied,setCopied]=useState(false)
  const [sent,setSent]=useState(false)
  const [sending,setSending]=useState(false)
  const [error,setError]=useState('')
  const [form,setForm]=useState({name:'',email:'',msg:''})
  const copy=()=>{ navigator.clipboard.writeText('cjay49586@gmail.com'); setCopied(true); setTimeout(()=>setCopied(false),2000) }

  const send = async () => {
    if (!form.name || !form.email || !form.msg) { setError('Saare fields bharo.'); return }
    setSending(true); setError('')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.msg },
        EMAILJS_PUBLIC_KEY
      )
      setSent(true)
    } catch {
      setError('Message send nahi hua. Dobara try karo.')
    } finally {
      setSending(false)
    }
  }
  const links=[
    {icon:<GithubIcon size={17}/>,label:'GitHub',value:'jaychaudhary00',href:'https://github.com/jaychaudhary00'},
    {icon:<LinkedinIcon size={17}/>,label:'LinkedIn',value:'chaudhari-jay',href:'https://www.linkedin.com/in/chaudhari-jay-b51163299'},
    {icon:<Phone size={17}/>,label:'Phone',value:'+91 7990617895',href:'tel:+917990617895'},
    {icon:<MapPin size={17}/>,label:'Location',value:'Ahmedabad, Gujarat',href:'#'},
  ]
  return (
    <section id="contact">
      <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}}>
        <p style={{fontSize:11,fontWeight:600,letterSpacing:'.14em',color:'#0a84ff',textTransform:'uppercase',marginBottom:16}}>Contact</p>
        <h2 style={{fontSize:'clamp(32px,5vw,52px)',fontWeight:800,letterSpacing:'-2px',marginBottom:16,lineHeight:1.05}}>
          Let's build<br/><span className="grad">something real.</span>
        </h2>
        <p style={{fontSize:16,color:'rgba(255,255,255,.38)',maxWidth:480,lineHeight:1.8,marginBottom:64,fontWeight:300}}>
          Open to internships, full-time, and remote roles. Surat · Ahmedabad · Gandhinagar · Remote.
        </p>
      </motion.div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:20}}>
        <motion.div initial={{opacity:0,x:-24}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.5}}
          className="glass" style={{borderRadius:20,padding:'32px 28px'}}>
          <AnimatePresence mode="wait">
            {sent?(
              <motion.div key="ok" initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} style={{textAlign:'center',padding:'40px 0'}}>
                <motion.div animate={{scale:[0,1.2,1]}} transition={{duration:.4}}
                  style={{width:52,height:52,borderRadius:'50%',background:'rgba(16,185,129,.1)',border:'1px solid rgba(16,185,129,.25)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px'}}>
                  <Check size={22} color="#10b981"/>
                </motion.div>
                <p style={{fontSize:17,fontWeight:600,marginBottom:8}}>Message received!</p>
                <p style={{fontSize:13,color:'rgba(255,255,255,.35)'}}>I'll get back within 24 hours.</p>
              </motion.div>
            ):(
              <motion.div key="form" initial={{opacity:0}} animate={{opacity:1}}>
                <p style={{fontSize:15,fontWeight:600,marginBottom:22,letterSpacing:'-.3px'}}>Send a message</p>
                {[{f:'name',ph:'Your name'},{f:'email',ph:'Your email'}].map(({f,ph})=>(
                  <input key={f} type={f==='email'?'email':'text'} placeholder={ph}
                    value={form[f as 'name'|'email']} onChange={e=>setForm({...form,[f]:e.target.value})}
                    style={{display:'block',width:'100%',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',borderRadius:10,padding:'11px 14px',color:'#f1f1f3',fontSize:14,fontFamily:'Inter',outline:'none',marginBottom:12}}/>
                ))}
                <textarea placeholder="Your message…" value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})}
                  style={{display:'block',width:'100%',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',borderRadius:10,padding:'11px 14px',color:'#f1f1f3',fontSize:14,fontFamily:'Inter',outline:'none',resize:'vertical',minHeight:96,marginBottom:16}}/>
                {error && <p style={{fontSize:12,color:'#f87171',marginBottom:10}}>{error}</p>}
                <button onClick={send} disabled={sending} className="mag-btn btn-primary-mag" style={{width:'100%',justifyContent:'center',display:'flex',alignItems:'center',fontSize:14,opacity:sending?0.6:1}}>
                  {sending ? 'Sending…' : 'Send message'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          <motion.div initial={{opacity:0,x:24}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.5}}
            className="glass" style={{borderRadius:14,padding:'18px 22px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <Mail size={17} color="#0a84ff"/>
              <div>
                <p style={{fontSize:10,color:'rgba(255,255,255,.28)',marginBottom:2,textTransform:'uppercase',letterSpacing:'.08em'}}>Email</p>
                <p style={{fontSize:13,fontWeight:500}}>cjay49586@gmail.com</p>
              </div>
            </div>
            <button onClick={copy} className="mag-btn btn-outline-mag" style={{padding:'6px 14px',fontSize:12,gap:6,display:'flex',alignItems:'center'}}>
              <AnimatePresence mode="wait">
                {copied?<motion.span key="c" initial={{scale:0}} animate={{scale:1}}><Check size={11}/></motion.span>
                  :<motion.span key="u" initial={{scale:0}} animate={{scale:1}}><Copy size={11}/></motion.span>}
              </AnimatePresence>
              {copied?'Copied':'Copy'}
            </button>
          </motion.div>
          {links.map((l,i)=>(
            <motion.a key={l.label} href={l.href} target={l.href.startsWith('http')?'_blank':undefined} rel="noreferrer"
              initial={{opacity:0,x:24}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.08,duration:.4}}
              className="glass" style={{borderRadius:14,padding:'18px 22px',display:'flex',alignItems:'center',gap:12,textDecoration:'none',color:'#f1f1f3',cursor:'none'}}
              whileHover={{background:'rgba(255,255,255,.05)'}}>
              <span style={{color:'#0a84ff'}}>{l.icon}</span>
              <div>
                <p style={{fontSize:10,color:'rgba(255,255,255,.28)',marginBottom:2,textTransform:'uppercase',letterSpacing:'.08em'}}>{l.label}</p>
                <p style={{fontSize:13,fontWeight:500}}>{l.value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [loaded,setLoaded]=useState(false)
  return (
    <>
      <AnimatePresence>{!loaded&&<Loader onDone={()=>setLoaded(true)}/>}</AnimatePresence>
      <Cursor/>
      <Particles/>
      <Spotlight/>
      <ScrollProgress/>
      <motion.div initial={{opacity:0}} animate={{opacity:loaded?1:0}} transition={{duration:.5}}>
        <Nav/>
        <Hero/>
        <Stats/>
        <About/>
        <Skills/>
        <Projects/>
        <Contact/>
        <footer style={{borderTop:'1px solid rgba(255,255,255,.05)',padding:'36px 6vw',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:14}}>
          <span style={{fontSize:13,color:'rgba(255,255,255,.18)'}}>Jay Chaudhari © 2026</span>
          <span style={{fontSize:11,color:'rgba(255,255,255,.14)',letterSpacing:'.12em'}}>MERN · AI · FULL-STACK</span>
        </footer>
      </motion.div>
    </>
  )
}