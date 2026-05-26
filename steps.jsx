/* Mimo Assessment Flow — Step screens */

// ============================================================
// STEP 1 — Posisi & detail
// ============================================================
function StepPosisi({ data, set, density }) {
  const levels = [
    { v:'junior', label:'Junior' },
    { v:'mid', label:'Mid' },
    { v:'senior', label:'Senior' },
    { v:'staff', label:'Staff' },
    { v:'principal', label:'Principal' },
  ];
  const depths = [
    { v:'skill', title:'Skill check', desc:'Verifikasi cepat untuk shortlist awal.', pill:'~15 menit' },
    { v:'standard', title:'Standar', desc:'Evaluasi menyeluruh untuk kandidat aktif.', pill:'~30 menit' },
    { v:'deep', title:'Mendalam', desc:'Studi kasus & coding untuk tahap final.', pill:'~60 menit' },
  ];
  return (
    <>
      <div className="section">
        <h3>Detail posisi</h3>
        <p className="sec-sub">Beri tahu Mimo posisi apa yang Anda rekrut — Mimo akan menyesuaikan pertanyaan, rubrik, dan benchmark industri secara otomatis.</p>

        <div className="field-row">
          <div className="fld">
            <label className="lbl">Nama posisi</label>
            <input type="text" value={data.role} onChange={e=>set({role:e.target.value})} placeholder="cth. Backend Engineer" />
          </div>
          <div className="fld">
            <label className="lbl">Departemen</label>
            <div className="sel"><span>{data.dept}</span><Icon name="chevron-down" size={16} /></div>
          </div>
        </div>

        <div className="field-row single">
          <div className="fld">
            <label className="lbl">Level seniority</label>
            <Chips value={data.level} onChange={v=>set({level:v})} options={levels} />
          </div>
        </div>

        <div className="field-row">
          <div className="fld">
            <label className="lbl">Hiring manager</label>
            <div className="sel">
              <span className="flex-row">
                <span className="av sm" style={{width:22,height:22,fontSize:10}}>BS</span>
                Budi Santoso
              </span>
              <Icon name="chevron-down" size={16} />
            </div>
          </div>
          <div className="fld">
            <label className="lbl">Deadline rekrutmen <span className="hint">(opsional)</span></label>
            <div className="sel"><span>15 Juni 2026</span><Icon name="calendar" size={16} /></div>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Kedalaman asesmen</h3>
        <p className="sec-sub">Mimo merekomendasikan <b style={{color:'var(--mimo-700)'}}>Standar</b> untuk posisi Senior Backend Engineer. Anda dapat mengubahnya kapan saja.</p>
        <RadioCards value={data.depth} onChange={v=>set({depth:v})} options={depths} />
      </div>

      <div className="section">
        <h3>Skill yang dievaluasi</h3>
        <p className="sec-sub">Mimo telah memilih skill berdasarkan posisi. Klik untuk menambah atau menghapus.</p>
        <div className="chips" style={{marginBottom:12}}>
          {data.skills.map(s => (
            <button key={s} className="chip on" onClick={()=>set({skills:data.skills.filter(x=>x!==s)})}>
              {s}<Icon name="x" size={12} />
            </button>
          ))}
          <button className="chip" onClick={()=>set({skills:[...data.skills,'Redis']})}>
            <Icon name="plus" size={14} />Tambah skill
          </button>
        </div>
        <AiStrip onAccept={()=>set({skills:[...new Set([...data.skills,'Kubernetes','Redis','gRPC'])]})}>
          Berdasarkan ribuan asesmen serupa, kandidat <b>Senior Backend Engineer</b> teratas biasanya juga dievaluasi pada <b>Kubernetes</b>, <b>Redis</b>, dan <b>gRPC</b>. Tambahkan ke daftar?
        </AiStrip>
      </div>
    </>
  );
}

function RailPosisi({ data }) {
  return (
    <>
      <RailCard title="Mimo akan mengevaluasi" meta={data.dimensions.length + ' dimensi'} icon="target">
        <p>Setelah posisi ini dibuat, kandidat akan diukur pada dimensi berikut:</p>
        <ul style={{listStyle:'none',padding:0,margin:'10px 0 0',display:'flex',flexDirection:'column',gap:8}}>
          {data.dimensions.map(d => (
            <li key={d.name} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{font:'500 13px/18px var(--font-sans)',color:'var(--fg-secondary)'}}>{d.name}</span>
              <span style={{font:'500 12px/16px var(--font-mono)',color:'var(--fg-tertiary)'}}>{d.weight}%</span>
            </li>
          ))}
        </ul>
        <div className="divider" />
        <p style={{fontSize:12,color:'var(--fg-tertiary)',margin:0}}>Bobot dapat diatur di langkah <b>Penilaian</b>.</p>
      </RailCard>

      <RailCard title="Benchmark industri" icon="bar-chart-2">
        <p>Untuk posisi <b>Senior Backend Engineer</b> di Indonesia:</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:6}}>
          <div style={{padding:10,background:'var(--gray-50)',borderRadius:8}}>
            <div style={{font:'600 18px/24px var(--font-sans)',color:'var(--fg-primary)'}}>72</div>
            <div style={{font:'500 11px/14px var(--font-sans)',color:'var(--fg-tertiary)',textTransform:'uppercase',letterSpacing:'.04em'}}>Median skor</div>
          </div>
          <div style={{padding:10,background:'var(--gray-50)',borderRadius:8}}>
            <div style={{font:'600 18px/24px var(--font-sans)',color:'var(--fg-primary)'}}>34<span style={{fontSize:13,color:'var(--fg-tertiary)'}}> mnt</span></div>
            <div style={{font:'500 11px/14px var(--font-sans)',color:'var(--fg-tertiary)',textTransform:'uppercase',letterSpacing:'.04em'}}>Waktu rata-rata</div>
          </div>
        </div>
      </RailCard>
    </>
  );
}

// ============================================================
// STEP 2 — Bangun asesmen (questions)
// ============================================================
function StepBangun({ data, set }) {
  const toggleQ = (id) => {
    set({ questions: data.questions.filter(q => q.id !== id) });
  };

  const totalMin = data.questions.reduce((a,q)=>a+q.minutes, 0);
  const typeBadge = (t) => {
    const map = {
      code:{cls:'code',i:'code-2',label:'Coding'},
      mcq:{cls:'mcq',i:'list',label:'Pilihan'},
      scenario:{cls:'scenario',i:'message-square',label:'Skenario'},
      video:{cls:'video',i:'video',label:'Video'},
    };
    return map[t];
  };
  return (
    <>
      <div className="section">
        <div className="flex-row between" style={{marginBottom:6}}>
          <h3 style={{margin:0}}>Daftar pertanyaan</h3>
          <span className="pill brand">
            <Icon name="sparkles" size={12} />
            {data.questions.filter(q=>q.byAi).length} disusun oleh Mimo
          </span>
        </div>
        <p className="sec-sub">Mimo telah menyiapkan <b>{data.questions.length} pertanyaan</b> ({totalMin} menit total) berdasarkan posisi dan level. Anda dapat menyusun ulang, mengedit, atau menambah pertanyaan sendiri.</p>

        <AiStrip onAccept={()=>{}} acceptLabel="Buat ulang dengan Mimo">
          Ingin variasi pertanyaan yang berbeda? Mimo dapat menyusun ulang seluruh asesmen dalam <b>~12 detik</b>, dengan tingkat kesulitan yang sama.
        </AiStrip>

        <div className="qlist">
          {data.questions.map((q, idx) => {
            const b = typeBadge(q.type);
            return (
              <div key={q.id} className="qrow">
                <Icon name="grip-vertical" size={18} className="drag" />
                <span className="qnum">{String(idx+1).padStart(2,'0')}</span>
                <div className="qtitle">
                  {q.title}
                  <span className="qsub">{q.sub}</span>
                </div>
                <span className={'qbadge '+b.cls}><Icon name={b.i} size={11} />{b.label}</span>
                <span className="qtime">{q.minutes} mnt</span>
                {q.byAi && <span className="qai"><Icon name="sparkles" size={10} />AI</span>}
                <button className="icon-btn" onClick={()=>toggleQ(q.id)} title="Hapus">
                  <Icon name="trash-2" size={16} />
                </button>
              </div>
            );
          })}
        </div>

        <div className="qadd">
          <button className="ac"><Icon name="library" size={16} />Dari bank soal</button>
          <button className="ac"><Icon name="sparkles" size={16} />Mimo: buat baru</button>
          <button className="ac"><Icon name="plus-circle" size={16} />Tulis sendiri</button>
        </div>
      </div>
    </>
  );
}

function RailBangun({ data }) {
  const totalMin = data.questions.reduce((a,q)=>a+q.minutes, 0);
  const counts = data.questions.reduce((a,q)=>{ a[q.type] = (a[q.type]||0)+1; return a; }, {});
  const colors = { code:'var(--mimo-500)', mcq:'var(--gray-400)', scenario:'#A855F7', video:'var(--warning-500)' };
  const labels = { code:'Coding', mcq:'Pilihan', scenario:'Skenario', video:'Video' };
  const total = Object.values(counts).reduce((a,b)=>a+b,0);

  let offset = 0;
  const segs = Object.entries(counts).map(([k,v]) => {
    const len = (v/total) * 100;
    const seg = { k, color: colors[k], offset, len };
    offset += len;
    return seg;
  });
  return (
    <>
      <RailCard title="Komposisi asesmen" meta={`${totalMin} menit`} icon="pie-chart">
        <div className="donut">
          <svg width="100" height="100" viewBox="0 0 42 42">
            <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--gray-100)" strokeWidth="6"/>
            {segs.map(s => (
              <circle key={s.k} cx="21" cy="21" r="15.9" fill="none" stroke={s.color} strokeWidth="6"
                strokeDasharray={`${s.len} ${100-s.len}`} strokeDashoffset={-s.offset}
                transform="rotate(-90 21 21)" />
            ))}
            <text x="21" y="21" textAnchor="middle" dy="2" style={{font:'600 8px Inter',fill:'var(--fg-primary)'}}>{data.questions.length}</text>
            <text x="21" y="27" textAnchor="middle" style={{font:'500 3px Inter',fill:'var(--fg-tertiary)',letterSpacing:'.06em'}}>SOAL</text>
          </svg>
          <div className="donut-leg">
            {Object.entries(counts).map(([k,v]) => (
              <span key={k}><i className="dot" style={{background:colors[k]}} />{labels[k]} · {v}</span>
            ))}
          </div>
        </div>
      </RailCard>

      <RailCard title="Pratinjau kandidat" icon="eye">
        <div className="cand-preview">
          <div className="cp-screen">
            <div className="cp-bar"><div /></div>
            <div style={{font:'500 11px/14px var(--font-mono)',color:'var(--fg-tertiary)',marginBottom:6}}>SOAL 04 DARI {data.questions.length}</div>
            <p className="cp-q">Implementasikan rate limiter sederhana dengan algoritma token bucket.</p>
            <div className="cp-code">{`function rateLimit(req) {\n  // tulis solusi Anda…\n}`}</div>
            <div className="cp-meta"><span>⏱ 8 menit</span><span>Coding</span></div>
          </div>
        </div>
      </RailCard>
    </>
  );
}

// ============================================================
// STEP 3 — Atur penilaian
// ============================================================
function StepPenilaian({ data, set }) {
  const updateWeight = (i, v) => {
    const next = [...data.rubric];
    next[i] = { ...next[i], weight: v };
    set({ rubric: next });
  };
  const total = data.rubric.reduce((a,r)=>a+r.weight, 0);
  const totalCls = total === 100 ? 'ok' : 'warn';

  const autoBalance = () => {
    const each = Math.floor(100 / data.rubric.length);
    const rem = 100 - each * data.rubric.length;
    set({ rubric: data.rubric.map((r,i)=>({...r, weight: each + (i===0 ? rem : 0)})) });
  };

  return (
    <>
      <div className="section">
        <h3>Rubrik penilaian</h3>
        <p className="sec-sub">Atur bobot tiap dimensi. Skor akhir kandidat adalah rata-rata tertimbang dari semua dimensi.</p>

        <div className="rubric">
          {data.rubric.map((r,i) => (
            <div key={r.name} className="row">
              <div>
                <div className="rname">{r.name}</div>
                <div className="rdesc">{r.desc}</div>
              </div>
              <input type="range" className="slider" min="0" max="60" value={r.weight} onChange={e=>updateWeight(i, +e.target.value)} />
              <div className="rval">{r.weight}%</div>
            </div>
          ))}
          <div className="rubric-foot">
            <div className="rf-lbl flex-row" style={{gap:10}}>
              Total bobot
              <button className="ais-link" style={{font:'600 12px/16px var(--font-sans)',color:'var(--mimo-700)',background:'none',border:0,cursor:'pointer'}} onClick={autoBalance}>
                <Icon name="wand-2" size={12} /> Auto-balance
              </button>
            </div>
            <div className={'rf-val ' + totalCls}>
              {total}% {total !== 100 && <span style={{font:'500 12px/16px var(--font-sans)',marginLeft:6}}>· perlu 100%</span>}
              {total === 100 && <Icon name="check" size={14} style={{marginLeft:4}} />}
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Ambang kelulusan</h3>
        <p className="sec-sub">Kandidat dengan skor di bawah ambang ini akan otomatis ditandai <b>tidak lolos</b>. Mimo akan tetap mengirim laporan lengkap.</p>
        <div className="field-row single">
          <div className="fld">
            <div className="flex-row between"><label className="lbl">Skor minimum lulus</label>
              <span style={{font:'600 14px/20px var(--font-mono)',color:'var(--fg-primary)'}}>{data.passing}/100</span>
            </div>
            <input type="range" className="slider" min="30" max="95" value={data.passing} onChange={e=>set({passing:+e.target.value})} />
            <div className="help">
              {data.passing < 60 && 'Ambang rendah — banyak kandidat akan lolos untuk tinjauan manual.'}
              {data.passing >= 60 && data.passing < 80 && 'Ambang seimbang — direkomendasikan untuk posisi Senior.'}
              {data.passing >= 80 && 'Ambang tinggi — hanya kandidat terbaik yang akan diteruskan.'}
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Integritas asesmen</h3>
        <p className="sec-sub">Kontrol bagaimana Mimo memastikan hasil yang adil. Setiap deteksi dilaporkan dengan tingkat keyakinan, bukan otomatis didiskualifikasi.</p>
        {data.antiCheat.map((ac, i) => (
          <div key={ac.k} className="ac-row">
            <div className="acl">
              <div className="acn">
                <Icon name={ac.icon} size={16} style={{color:'var(--fg-tertiary)'}} />
                {ac.name}
                {ac.recommended && <span className="pill brand" style={{marginLeft:6}}>Direkomendasikan</span>}
              </div>
              <div className="acd">{ac.desc}</div>
            </div>
            <Toggle on={ac.on} onChange={v=>{
              const next = [...data.antiCheat]; next[i] = {...ac, on:v}; set({antiCheat:next});
            }} />
          </div>
        ))}
      </div>
    </>
  );
}

function RailPenilaian({ data }) {
  const projected = Math.round(data.candidateCount * (0.92 - (data.passing - 50) * 0.012));
  return (
    <>
      <RailCard title="Simulasi hasil" meta="berdasar data 1.892 asesmen" icon="activity">
        <p>Dengan setting saat ini, dari <b>{data.candidateCount} kandidat</b> yang diundang:</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:10}}>
          <div style={{padding:12,background:'var(--success-50)',border:'1px solid var(--success-200)',borderRadius:10}}>
            <div style={{font:'600 22px/28px var(--font-sans)',color:'var(--success-700)'}}>~{projected}</div>
            <div style={{font:'500 11px/16px var(--font-sans)',color:'var(--success-700)',textTransform:'uppercase',letterSpacing:'.04em'}}>Akan lolos</div>
          </div>
          <div style={{padding:12,background:'var(--gray-50)',border:'1px solid var(--border-secondary)',borderRadius:10}}>
            <div style={{font:'600 22px/28px var(--font-sans)',color:'var(--fg-secondary)'}}>~{data.candidateCount - projected}</div>
            <div style={{font:'500 11px/16px var(--font-sans)',color:'var(--fg-tertiary)',textTransform:'uppercase',letterSpacing:'.04em'}}>Disaring</div>
          </div>
        </div>
        <div className="divider" />
        <p style={{fontSize:12,color:'var(--fg-tertiary)',margin:0}}>
          <Icon name="info" size={12} style={{verticalAlign:-1,marginRight:4}} />
          Simulasi mempertimbangkan distribusi skor historis untuk posisi serupa.
        </p>
      </RailCard>

      <RailCard title="Tips dari Mimo" icon="lightbulb">
        <p style={{margin:0}}>Untuk posisi <b>Senior</b>, ambang <b>70-75</b> menghasilkan saringan optimal: cukup ketat untuk menyaring, cukup lebar untuk memberi ruang interpretasi tim Anda.</p>
      </RailCard>
    </>
  );
}

// ============================================================
// STEP 4 — Undang kandidat
// ============================================================
function StepKandidat({ data, set }) {
  const [tab, setTab] = React.useState('pool');
  const [search, setSearch] = React.useState('');

  const toggleCand = (id) => {
    const sel = new Set(data.selected);
    if (sel.has(id)) sel.delete(id); else sel.add(id);
    set({ selected: [...sel] });
  };
  const filtered = data.pool.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));
  const selectAll = () => set({ selected: filtered.map(c=>c.id) });

  return (
    <>
      <div className="section">
        <h3>Pilih kandidat</h3>
        <p className="sec-sub">Undang kandidat dari pipeline yang sudah ada, unggah CSV, atau bagikan link publik untuk pendaftaran terbuka.</p>

        <div className="cand-tabs">
          <button className={tab==='pool'?'on':''} onClick={()=>setTab('pool')}><Icon name="users" size={14} />Dari pipeline</button>
          <button className={tab==='csv'?'on':''} onClick={()=>setTab('csv')}><Icon name="file-up" size={14} />Unggah CSV</button>
          <button className={tab==='email'?'on':''} onClick={()=>setTab('email')}><Icon name="mail" size={14} />Tempel email</button>
          <button className={tab==='link'?'on':''} onClick={()=>setTab('link')}><Icon name="link" size={14} />Link publik</button>
        </div>

        {tab==='pool' && (
          <>
            <div className="cand-toolbar">
              <div className="searchfield" style={{flex:1}}>
                <Icon name="search" size={14} />
                <input placeholder="Cari nama atau email" value={search} onChange={e=>setSearch(e.target.value)} />
              </div>
              <button className="btn btn-secondary sm"><Icon name="filter" size={14} />Filter · Backend Eng.</button>
            </div>

            {data.selected.length > 0 && (
              <div className="bulk-bar">
                <Icon name="check-circle-2" size={16} style={{color:'var(--mimo-600)'}} />
                <span className="bbm"><b>{data.selected.length}</b> dari {filtered.length} kandidat terpilih</span>
                <div style={{marginLeft:'auto',display:'flex',gap:8}}>
                  <button className="ais-link" onClick={selectAll}>Pilih semua</button>
                  <button className="ais-link" style={{color:'var(--fg-tertiary)'}} onClick={()=>set({selected:[]})}>Kosongkan</button>
                </div>
              </div>
            )}

            <div className="cand-list">
              {filtered.map(c => {
                const on = data.selected.includes(c.id);
                return (
                  <div key={c.id} className={'cand-row' + (on?' on':'')} onClick={()=>toggleCand(c.id)}>
                    <span className={'cbox' + (on?' on':'')}>
                      {on && <Icon name="check" size={12} />}
                    </span>
                    <div className="who">
                      <div className="av sm" style={{background: c.color || 'linear-gradient(135deg,var(--mimo-400),var(--mimo-700))'}}>{c.initials}</div>
                      <div>
                        <div className="who-name">{c.name}</div>
                        <div className="who-meta">{c.email}</div>
                      </div>
                    </div>
                    <div className="pos">{c.pos}</div>
                    <div className="src">{c.source}</div>
                    <button className="icon-btn" onClick={e=>e.stopPropagation()}><Icon name="external-link" size={14} /></button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {tab==='csv' && (
          <div style={{padding:'40px 24px',textAlign:'center',background:'var(--gray-50)',border:'2px dashed var(--border-primary)',borderRadius:12}}>
            <Icon name="upload-cloud" size={32} style={{color:'var(--fg-tertiary)',display:'block',margin:'0 auto 12px'}} />
            <p style={{margin:'0 0 4px',font:'600 14px/20px var(--font-sans)',color:'var(--fg-primary)'}}>Tarik file CSV ke sini</p>
            <p style={{margin:'0 0 14px',font:'400 13px/19px var(--font-sans)',color:'var(--fg-tertiary)'}}>Format: nama, email, posisi. Maks. 500 kandidat per file.</p>
            <button className="btn btn-secondary"><Icon name="file-down" size={14} />Unduh template</button>
          </div>
        )}

        {tab==='email' && (
          <div className="fld">
            <textarea placeholder="aurelia@perusahaan.id&#10;bagas@mail.id&#10;…" style={{minHeight:140,fontFamily:'var(--font-mono)',fontSize:13}}></textarea>
            <div className="help">Pisahkan setiap email dengan baris baru atau koma. Mimo akan mengirim undangan dengan link unik untuk setiap kandidat.</div>
          </div>
        )}

        {tab==='link' && (
          <div className="fld">
            <label className="lbl">Link asesmen publik</label>
            <div className="flex-row" style={{gap:8}}>
              <input value="https://asesmen.mimo.id/inv/be-sr-2026-q2" readOnly style={{fontFamily:'var(--font-mono)',fontSize:13}} />
              <button className="btn btn-secondary"><Icon name="copy" size={14} />Salin</button>
            </div>
            <div className="help">Siapa pun dengan link ini dapat memulai asesmen. Cocok untuk job board atau halaman karier.</div>
          </div>
        )}
      </div>

      <div className="section">
        <h3>Jadwal pengiriman</h3>
        <p className="sec-sub">Atur kapan undangan dikirim dan berapa lama kandidat punya waktu untuk menyelesaikan asesmen.</p>
        <div className="field-row">
          <div className="fld">
            <label className="lbl">Kirim undangan</label>
            <Chips value={data.timing} onChange={v=>set({timing:v})} options={[
              {v:'now', label:'Segera', i:'send'},
              {v:'schedule', label:'Jadwalkan', i:'calendar-clock'},
            ]} />
          </div>
          <div className="fld">
            <label className="lbl">Batas waktu menyelesaikan</label>
            <div className="sel"><span>{data.deadline} hari setelah undangan</span><Icon name="chevron-down" size={16} /></div>
          </div>
        </div>
        <div className="flex-row" style={{marginTop:14,padding:'10px 14px',background:'var(--mimo-50)',border:'1px solid var(--mimo-200)',borderRadius:10}}>
          <Icon name="bell" size={16} style={{color:'var(--mimo-600)'}} />
          <span style={{font:'400 13px/18px var(--font-sans)',color:'var(--fg-secondary)'}}>
            Mimo akan otomatis mengirim pengingat <b>2 hari sebelum deadline</b> ke kandidat yang belum mulai.
          </span>
        </div>
      </div>
    </>
  );
}

function RailKandidat({ data }) {
  return (
    <>
      <RailCard title="Ringkasan undangan" icon="send">
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <div style={{display:'flex',justifyContent:'space-between'}}><span className="muted" style={{fontSize:13}}>Kandidat terpilih</span><b style={{fontFamily:'var(--font-mono)',fontVariantNumeric:'tabular-nums'}}>{data.selected.length}</b></div>
          <div style={{display:'flex',justifyContent:'space-between'}}><span className="muted" style={{fontSize:13}}>Pengiriman</span><span style={{fontWeight:500}}>{data.timing === 'now' ? 'Segera' : 'Terjadwal'}</span></div>
          <div style={{display:'flex',justifyContent:'space-between'}}><span className="muted" style={{fontSize:13}}>Batas waktu</span><span style={{fontWeight:500}}>{data.deadline} hari</span></div>
        </div>
      </RailCard>

      <RailCard title="Pratinjau email" icon="mail">
        <div className="email-pv">
          <div className="epv-head">
            <div className="from">Dari: <b>tim@mimo.id</b> · untuk Aurelia Ningrum</div>
            <div className="subj">Anda diundang untuk asesmen Senior Backend Engineer</div>
          </div>
          <div className="epv-body">
            <h5>Halo Aurelia,</h5>
            <p style={{margin:'0 0 8px'}}>PT Kulina mengundang Anda untuk mengerjakan asesmen singkat (~30 menit) sebagai bagian dari proses Senior Backend Engineer.</p>
            <div className="epv-cta">Mulai asesmen<Icon name="arrow-right" size={14} /></div>
            <p style={{margin:0,fontSize:12,color:'var(--fg-tertiary)'}}>Berlaku sampai 2 Juni 2026 · Powered by Mimo</p>
          </div>
        </div>
      </RailCard>
    </>
  );
}

// ============================================================
// STEP 5 — Tinjau & jalankan
// ============================================================
function StepTinjau({ data, set, onJump }) {
  const totalMin = data.questions.reduce((a,q)=>a+q.minutes, 0);
  const costPer = 5000;
  const cost = data.selected.length * costPer;
  return (
    <>
      <div className="summary">
        <div className="sm-head">
          <div>
            <span className="pill brand" style={{marginBottom:10,display:'inline-flex'}}><Icon name="check-circle-2" size={12} />Siap diluncurkan</span>
            <h3>{data.name}</h3>
            <p>Tinjau seluruh konfigurasi di bawah ini sebelum mengirim undangan. Anda masih dapat mengedit setelah peluncuran selama belum ada kandidat yang mulai.</p>
          </div>
        </div>
        <div className="sm-grid">
          <div className="sm-stat"><div className="smv">{data.selected.length}</div><div className="sml">Kandidat</div></div>
          <div className="sm-stat"><div className="smv">{data.questions.length}</div><div className="sml">Pertanyaan</div></div>
          <div className="sm-stat"><div className="smv">{totalMin}<span style={{fontSize:14,color:'var(--fg-tertiary)'}}> mnt</span></div><div className="sml">Durasi</div></div>
          <div className="sm-stat"><div className="smv">~3<span style={{fontSize:14,color:'var(--fg-tertiary)'}}> mnt</span></div><div className="sml">Evaluasi Mimo</div></div>
        </div>

        <div className="sm-section">
          <div className="skey">Posisi</div>
          <div className="sval">
            <div><b>{data.role}</b> · {data.level.charAt(0).toUpperCase()+data.level.slice(1)} · {data.dept}</div>
            <div style={{color:'var(--fg-tertiary)',fontSize:13,marginTop:4}}>Skill: {data.skills.slice(0,5).join(', ')}{data.skills.length>5?` +${data.skills.length-5}`:''}</div>
          </div>
          <button className="sedit" onClick={()=>onJump(0)}>Edit</button>
        </div>

        <div className="sm-section">
          <div className="skey">Asesmen</div>
          <div className="sval">
            <ul>
              <li><Icon name="check" size={14} />{data.questions.length} pertanyaan ({totalMin} menit) — {data.questions.filter(q=>q.byAi).length} disusun Mimo</li>
              <li><Icon name="check" size={14} />Kedalaman: {data.depth === 'standard' ? 'Standar' : data.depth === 'skill' ? 'Skill check' : 'Mendalam'}</li>
            </ul>
          </div>
          <button className="sedit" onClick={()=>onJump(1)}>Edit</button>
        </div>

        <div className="sm-section">
          <div className="skey">Penilaian</div>
          <div className="sval">
            <ul>
              <li><Icon name="check" size={14} />Ambang lulus: <b>{data.passing}/100</b></li>
              <li><Icon name="check" size={14} />Rubrik: {data.rubric.map(r=>`${r.name} ${r.weight}%`).join(', ')}</li>
              <li><Icon name="check" size={14} />Integritas: {data.antiCheat.filter(a=>a.on).length} dari {data.antiCheat.length} kontrol aktif</li>
            </ul>
          </div>
          <button className="sedit" onClick={()=>onJump(2)}>Edit</button>
        </div>

        <div className="sm-section">
          <div className="skey">Kandidat</div>
          <div className="sval">
            <div><b>{data.selected.length} kandidat</b> dipilih dari pipeline</div>
            <div style={{color:'var(--fg-tertiary)',fontSize:13,marginTop:4}}>Dikirim {data.timing==='now'?'segera':'terjadwal'} · Batas {data.deadline} hari · Pengingat otomatis aktif</div>
          </div>
          <button className="sedit" onClick={()=>onJump(3)}>Edit</button>
        </div>
      </div>

      <div className="section">
        <h3>Estimasi biaya & kuota</h3>
        <p className="sec-sub">Mimo akan memotong kuota dan biaya saat kandidat <b>menyelesaikan</b> asesmen — bukan saat undangan dikirim.</p>
        <div className="cost">
          <div className="crow">
            <span>{data.selected.length} undangan × Rp {costPer.toLocaleString('id-ID')}</span>
            <span className="cv">Rp {cost.toLocaleString('id-ID')}</span>
          </div>
          <div className="crow">
            <span>Evaluasi AI mendalam</span>
            <span className="cv" style={{color:'var(--success-700)'}}>Termasuk</span>
          </div>
          <div className="crow">
            <span>Penyimpanan rekaman & laporan</span>
            <span className="cv" style={{color:'var(--success-700)'}}>Termasuk</span>
          </div>
          <div className="crow tot">
            <span>Total (maks.)</span>
            <span className="cv">Rp {cost.toLocaleString('id-ID')}</span>
          </div>
        </div>
        <div style={{marginTop:12,padding:'10px 14px',background:'var(--warning-50)',border:'1px solid var(--warning-200)',borderRadius:10,display:'flex',gap:10,alignItems:'flex-start'}}>
          <Icon name="alert-triangle" size={16} style={{color:'var(--warning-700)',marginTop:2,flexShrink:0}} />
          <div style={{font:'400 13px/18px var(--font-sans)',color:'var(--fg-secondary)'}}>
            <b>Kuota tersisa setelah peluncuran:</b> {100 - 88 - data.selected.length} dari 100. Pertimbangkan untuk <a style={{color:'var(--mimo-700)',fontWeight:600,textDecoration:'none',cursor:'pointer'}}>menambah paket</a> jika Anda merencanakan asesmen lain bulan ini.
          </div>
        </div>
      </div>
    </>
  );
}

function RailTinjau({ data }) {
  return (
    <>
      <RailCard title="Setelah Anda meluncurkan" icon="rocket">
        <ol style={{margin:0,padding:'0 0 0 18px',display:'flex',flexDirection:'column',gap:10,color:'var(--fg-secondary)',font:'400 13px/19px var(--font-sans)'}}>
          <li>Email undangan terkirim ke {data.selected.length} kandidat dalam <b>~2 menit</b></li>
          <li>Anda dapat memantau progres di halaman <b>Asesmen AI</b> secara real-time</li>
          <li>Mimo otomatis evaluasi dan memberi skor begitu kandidat selesai</li>
          <li>Laporan ringkas dikirim ke hiring manager setiap pagi pukul 08:00</li>
        </ol>
      </RailCard>

      <RailCard title="Checklist akhir" icon="list-checks">
        <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:8}}>
          {[
            {ok:true, t:`${data.questions.length} pertanyaan siap`},
            {ok:true, t:'Rubrik berjumlah 100%'},
            {ok:true, t:`${data.selected.length} kandidat terpilih`},
            {ok:true, t:'Email template diuji'},
          ].map((c,i)=>(
            <li key={i} style={{display:'flex',gap:8,alignItems:'center',font:'400 13px/19px var(--font-sans)',color:'var(--fg-secondary)'}}>
              <span style={{width:18,height:18,borderRadius:'50%',background:'var(--success-50)',color:'var(--success-700)',display:'inline-flex',alignItems:'center',justifyContent:'center',border:'1px solid var(--success-200)'}}>
                <Icon name="check" size={11} />
              </span>
              {c.t}
            </li>
          ))}
        </ul>
      </RailCard>
    </>
  );
}

Object.assign(window, { StepPosisi, RailPosisi, StepBangun, RailBangun, StepPenilaian, RailPenilaian, StepKandidat, RailKandidat, StepTinjau, RailTinjau });
