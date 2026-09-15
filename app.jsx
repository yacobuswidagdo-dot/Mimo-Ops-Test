/* Mimo Assessment Flow — main app */
const { useState: useStateA, useEffect: useEffectA } = React;

const INITIAL_DATA = {
  name: 'Senior Backend Engineer · Q2 2026',
  status: 'Draf',
  role: 'Backend Engineer',
  dept: 'Engineering',
  level: 'senior',
  depth: 'standard',
  skills: ['Go', 'Sistem terdistribusi', 'PostgreSQL', 'Docker', 'API design'],
  dimensions: [
    { name:'Kompetensi teknis', weight: 40 },
    { name:'Pemecahan masalah', weight: 25 },
    { name:'Desain sistem', weight: 20 },
    { name:'Komunikasi', weight: 15 },
  ],
  questions: [
    { id:1, title:'Implementasikan rate limiter dengan token bucket', sub:'Bahasa: Go, Python, atau JavaScript', type:'code', minutes:8, byAi:true },
    { id:2, title:'Apa kompleksitas waktu binary search?', sub:'4 opsi pilihan ganda', type:'mcq', minutes:1, byAi:true },
    { id:3, title:'Rancang skema database untuk sistem booking event', sub:'Jawaban terbuka — diagram & penjelasan', type:'scenario', minutes:12, byAi:true },
    { id:4, title:'Debug: kenapa endpoint ini 5x lebih lambat dari biasanya?', sub:'Skenario realistis dengan log & trace', type:'scenario', minutes:8, byAi:true },
    { id:5, title:'Tulis SQL untuk laporan retensi 30-hari', sub:'PostgreSQL · CTE diperbolehkan', type:'code', minutes:6, byAi:true },
    { id:6, title:'Jelaskan trade-off antara optimistic vs pessimistic locking', sub:'Video 2 menit · evaluasi komunikasi', type:'video', minutes:3, byAi:false },
    { id:7, title:'Manakah pernyataan yang benar tentang gRPC?', sub:'Pilih semua yang sesuai', type:'mcq', minutes:1, byAi:true },
  ],
  rubric: [
    { name:'Kompetensi teknis', desc:'Penguasaan bahasa, framework, dan tool inti.', weight: 40 },
    { name:'Pemecahan masalah', desc:'Kualitas pendekatan, edge case, dan iterasi.', weight: 25 },
    { name:'Desain sistem', desc:'Arsitektur, trade-off, dan kemampuan skalabilitas.', weight: 20 },
    { name:'Komunikasi', desc:'Penjelasan dalam jawaban tertulis & video.', weight: 15 },
  ],
  passing: 72,
  antiCheat: [
    { k:'tab', name:'Lacak perpindahan tab', desc:'Catat kapan kandidat membuka tab lain — dilaporkan, bukan otomatis didiskualifikasi.', icon:'monitor', on:true, recommended:true },
    { k:'paste', name:'Deteksi salin-tempel besar', desc:'Tandai blok jawaban yang ditempel >300 karakter sekaligus.', icon:'clipboard-paste', on:true, recommended:true },
    { k:'ai', name:'Deteksi konten AI', desc:'Mimo membandingkan pola jawaban dengan model generatif umum.', icon:'sparkles', on:true, recommended:true },
    { k:'cam', name:'Rekam kamera (proctoring)', desc:'Memerlukan persetujuan kandidat. Direkomendasikan untuk asesmen final saja.', icon:'video', on:false, recommended:false },
    { k:'id', name:'Verifikasi identitas', desc:'Cocokkan foto KTP dengan webcam sebelum mulai.', icon:'badge-check', on:false, recommended:false },
  ],
  candidateCount: 12,
  pool: [
    { id:'c1', name:'Aurelia Ningrum', email:'aurelia@perusahaan.id', initials:'AR', pos:'Backend Engineer', source:'LinkedIn' },
    { id:'c2', name:'Bagas Pratama', email:'bagas.p@mail.id', initials:'BP', pos:'Backend Engineer', source:'Referral', color:'linear-gradient(135deg,#7DB1FF,#0049AD)' },
    { id:'c3', name:'Citra Wulandari', email:'citra@perusahaan.id', initials:'CW', pos:'Senior Backend', source:'Karir.com', color:'linear-gradient(135deg,#4F95FF,#005CD9)' },
    { id:'c4', name:'Dimas Raharjo', email:'dimas.r@mail.id', initials:'DR', pos:'Backend Engineer', source:'Pipeline' },
    { id:'c5', name:'Elang Firmansyah', email:'elang@mail.id', initials:'EF', pos:'Tech Lead', source:'Referral', color:'linear-gradient(135deg,#7DB1FF,#0049AD)' },
    { id:'c6', name:'Farah Habibah', email:'farah.h@mail.id', initials:'FH', pos:'Senior Backend', source:'LinkedIn', color:'linear-gradient(135deg,#4F95FF,#005CD9)' },
    { id:'c7', name:'Gilang Mahendra', email:'gilang@mail.id', initials:'GM', pos:'Backend Engineer', source:'Pipeline' },
    { id:'c8', name:'Hana Setiawan', email:'hana.s@mail.id', initials:'HS', pos:'Senior Backend', source:'Karir.com', color:'linear-gradient(135deg,#7DB1FF,#0049AD)' },
    { id:'c9', name:'Indra Kusuma', email:'indra.k@mail.id', initials:'IK', pos:'Tech Lead', source:'Referral' },
    { id:'c10', name:'Joko Saputra', email:'joko.s@mail.id', initials:'JS', pos:'Backend Engineer', source:'Pipeline', color:'linear-gradient(135deg,#4F95FF,#005CD9)' },
    { id:'c11', name:'Kayla Pertiwi', email:'kayla.p@mail.id', initials:'KP', pos:'Senior Backend', source:'LinkedIn' },
    { id:'c12', name:'Lukman Hakim', email:'lukman@mail.id', initials:'LH', pos:'Backend Engineer', source:'Karir.com', color:'linear-gradient(135deg,#7DB1FF,#0049AD)' },
  ],
  selected: ['c1','c2','c3','c4','c6','c8','c9','c10','c11','c12'],
  timing: 'now',
  deadline: 7,
};

const STEPS = [
  { k:'posisi', title:'Detail posisi', icon:'briefcase' },
  { k:'bangun', title:'Bangun asesmen', icon:'sparkles' },
  { k:'penilaian', title:'Atur penilaian', icon:'sliders' },
  { k:'kandidat', title:'Undang kandidat', icon:'mail' },
  { k:'tinjau', title:'Tinjau & jalankan', icon:'rocket' },
];

const TWEAK_DEFAULTS = {
  "stepperLayout": "horizontal",
  "showRail": true,
  "density": "comfortable",
};

function App() {
  const [step, setStep] = useStateA(0);
  const [data, setData] = useStateA(INITIAL_DATA);
  const [savedAt, setSavedAt] = useStateA('baru saja');
  const [showLaunch, setShowLaunch] = useStateA(false);
  const [showCelebration, setShowCelebration] = useStateA(false);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffectA(() => {
    if (data.candidateCount !== data.selected.length) {
      setData(d => ({...d, candidateCount: d.selected.length}));
    }
  }, [data.selected.length]);

  const set = (patch) => {
    setData(d => ({...d, ...patch}));
    setSavedAt('baru saja');
  };

  const handleContinue = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      window.scrollTo({top:0, behavior:'smooth'});
    }
  };
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      window.scrollTo({top:0, behavior:'smooth'});
    }
  };
  const handleJump = (i) => {
    setStep(i);
    window.scrollTo({top:0, behavior:'smooth'});
  };
  const handleLaunch = () => setShowLaunch(true);
  const confirmLaunch = () => {
    setShowLaunch(false);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 4000);
  };

  useEffectA(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  const StepComponent = [StepPosisi, StepBangun, StepPenilaian, StepKandidat, StepTinjau][step];
  const RailComponent = [RailPosisi, RailBangun, RailPenilaian, RailKandidat, RailTinjau][step];

  const showRail = t.showRail;
  const vertical = t.stepperLayout === 'vertical';

  return (
    <div className={'app' + (t.density === 'compact' ? ' compact' : '')}>
      <Sidebar activeKey="asesmen" />
      <main className="main" style={{paddingBottom:80}}>
        <PageHeader name={data.name} onName={n=>set({name:n})} status={data.status} />

        <div className="stepper-wrap">
          <Stepper steps={STEPS} current={step} onJump={handleJump} vertical={vertical} />
        </div>

        <section className={'wizard' + (showRail ? '' : ' no-rail')}>
          <div className="col">
            <StepComponent data={data} set={set} onJump={handleJump} density={t.density} />
          </div>
          {showRail && (
            <div className="col">
              <RailComponent data={data} />
            </div>
          )}
        </section>

        <ActionBar
          stepIdx={step}
          totalSteps={STEPS.length}
          onBack={handleBack}
          onContinue={handleContinue}
          onSaveDraft={()=>setSavedAt('baru saja')}
          onLaunch={handleLaunch}
          savedAt={savedAt}
        />
      </main>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Tampilan">
          <TweakRadio label="Layout stepper" value={t.stepperLayout} onChange={v=>setTweak('stepperLayout', v)}
            options={[{value:'horizontal',label:'Horizontal'},{value:'vertical',label:'Vertikal'}]} />
          <TweakRadio label="Density" value={t.density} onChange={v=>setTweak('density', v)}
            options={[{value:'comfortable',label:'Nyaman'},{value:'compact',label:'Padat'}]} />
          <TweakToggle label="Panel pendamping" value={t.showRail} onChange={v=>setTweak('showRail', v)} />
        </TweakSection>
        <TweakSection label="Navigasi cepat">
          {STEPS.map((s,i) => (
            <TweakButton key={s.k} label={`${i+1}. ${s.title}`} onClick={()=>handleJump(i)} secondary={i!==step} />
          ))}
        </TweakSection>
      </TweaksPanel>

      {showLaunch && (
        <div className="overlay open" onClick={e=>{ if (e.target.classList.contains('overlay')) setShowLaunch(false); }}>
          <div className="modal" style={{width:480}}>
            <div className="modal-head">
              <div className="ic-bubble lg brand"><Icon name="send" size={24} /></div>
              <button className="icon-btn" onClick={()=>setShowLaunch(false)}><Icon name="x" size={18} /></button>
            </div>
            <h2 className="modal-title">Kirim undangan ke {data.selected.length} kandidat?</h2>
            <p className="modal-sub">
              Email undangan akan dikirim sekarang. Mimo akan otomatis mengevaluasi setiap kandidat setelah mereka menyelesaikan asesmen — Anda akan menerima notifikasi.
            </p>
            <div style={{padding:14,background:'var(--gray-50)',borderRadius:10,marginBottom:20,display:'flex',flexDirection:'column',gap:6,font:'400 13px/19px var(--font-sans)',color:'var(--fg-secondary)'}}>
              <div className="flex-row between"><span>Kandidat</span><b style={{color:'var(--fg-primary)'}}>{data.selected.length} orang</b></div>
              <div className="flex-row between"><span>Posisi</span><b style={{color:'var(--fg-primary)'}}>{data.role}</b></div>
              <div className="flex-row between"><span>Estimasi biaya</span><b style={{color:'var(--fg-primary)',fontFamily:'var(--font-mono)'}}>Rp {(data.selected.length * 5000).toLocaleString('id-ID')}</b></div>
            </div>
            <div className="modal-foot">
              <button className="btn btn-secondary" onClick={()=>setShowLaunch(false)}>Tinjau lagi</button>
              <button className="btn btn-primary" onClick={confirmLaunch}>
                <Icon name="send" size={16} />Ya, kirim undangan
              </button>
            </div>
          </div>
        </div>
      )}

      {showCelebration && (
        <div style={{position:'fixed',top:24,right:24,zIndex:1000,background:'white',border:'1px solid var(--success-200)',borderRadius:12,boxShadow:'var(--shadow-lg)',padding:'14px 18px',display:'flex',alignItems:'center',gap:12,maxWidth:380,animation:'slideIn .3s ease-out'}}>
          <div style={{width:36,height:36,borderRadius:'50%',background:'var(--success-50)',color:'var(--success-700)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <Icon name="check-circle-2" size={20} />
          </div>
          <div>
            <div style={{font:'600 14px/20px var(--font-sans)',color:'var(--fg-primary)'}}>Asesmen diluncurkan</div>
            <div style={{font:'400 13px/18px var(--font-sans)',color:'var(--fg-tertiary)'}}>{data.selected.length} undangan terkirim · pantau di Asesmen AI</div>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
