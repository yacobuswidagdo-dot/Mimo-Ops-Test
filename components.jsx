/* Mimo Assessment Flow — shared components */
const { useState, useEffect, useRef, useMemo } = React;

// Lucide icon component — hydrates after mount
function Icon({ name, size, style, className }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', name);
      ref.current.appendChild(el);
      window.lucide.createIcons({ attrs: { width: size || 16, height: size || 16 } });
    }
  }, [name, size]);
  return <span ref={ref} className={'icn ' + (className||'')} style={{display:'inline-flex',alignItems:'center',justifyContent:'center', ...(style||{})}} />;
}

// Sidebar (dark)
function Sidebar({ activeKey }) {
  const items = [
    { k:'ringkasan', label:'Ringkasan', i:'layout-dashboard' },
    { k:'kandidat', label:'Kandidat', i:'users', count:'2.341' },
    { k:'pipeline', label:'Pipeline', i:'git-branch' },
    { k:'asesmen', label:'Asesmen AI', i:'sparkles', badge:'Baru' },
    { k:'insights', label:'Insights', i:'bar-chart-3' },
    { k:'posisi', label:'Posisi', i:'briefcase' },
    { k:'laporan', label:'Laporan', i:'file-text' },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <img src="assets/mimo-icon.png" alt="Mimo" className="mark" />
        <span className="wordmark">mimo</span>
        <span className="env-pill">Ops</span>
      </div>
      <div className="sidebar-search">
        <Icon name="search" size={16} />
        <input placeholder="Cari kandidat, posisi…" />
        <kbd>⌘K</kbd>
      </div>
      <nav className="nav">
        {items.map(it => (
          <a key={it.k} className={'nav-item' + (it.k===activeKey ? ' active' : '')}>
            <Icon name={it.i} size={18} />
            {it.label}
            {it.count && <span className="count">{it.count}</span>}
            {it.badge && <span className="badge-new">{it.badge}</span>}
          </a>
        ))}
      </nav>
      <div className="nav-section-title">Workspace</div>
      <nav className="nav">
        <a className="nav-item"><Icon name="users-2" size={18} />Tim</a>
        <a className="nav-item"><Icon name="plug" size={18} />Integrasi</a>
        <a className="nav-item"><Icon name="settings" size={18} />Pengaturan</a>
      </nav>
      <div className="sidebar-footer">
        <div className="usage">
          <div className="usage-head"><span>Kuota asesmen</span><span className="usage-meta">88 / 100</span></div>
          <div className="usage-bar"><div style={{width:'88%'}} /></div>
          <a className="usage-cta">Tambah paket →</a>
        </div>
        <div className="user">
          <div className="av">AR</div>
          <div className="user-meta">
            <div className="user-name">Aurelia Ningrum</div>
            <div className="user-role">Hiring Lead · PT Kulina</div>
          </div>
          <span className="dim"><Icon name="chevrons-up-down" size={16} /></span>
        </div>
      </div>
    </aside>
  );
}

// Stepper
function Stepper({ steps, current, onJump, vertical }) {
  return (
    <div className={'stepper' + (vertical ? ' vert' : '')}>
      {steps.map((s, i) => {
        const isDone = i < current;
        const isActive = i === current;
        return (
          <div key={s.k} className={'step' + (isDone ? ' done' : '') + (isActive ? ' active' : '')} onClick={() => onJump(i)}>
            <div className="num">
              {isDone ? <Icon name="check" size={14} /> : (i+1)}
            </div>
            <div className="label">
              <span className="eyebrow">Langkah {i+1}</span>
              <span className="name">{s.title}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Chip group
function Chips({ value, onChange, options }) {
  return (
    <div className="chips">
      {options.map(o => (
        <button key={o.v} type="button" className={'chip' + (value === o.v ? ' on' : '')} onClick={() => onChange(o.v)}>
          {o.i && <Icon name={o.i} size={14} />}
          {o.label}
        </button>
      ))}
    </div>
  );
}

// Radio cards
function RadioCards({ value, onChange, options }) {
  return (
    <div className="rcards">
      {options.map(o => (
        <div key={o.v} className={'rcard' + (value===o.v ? ' on' : '')} onClick={() => onChange(o.v)}>
          <div className="rc-head">
            <div>
              <div className="rc-title">{o.title}</div>
              <div className="rc-desc">{o.desc}</div>
            </div>
            <span className="rdot" />
          </div>
          {o.pill && <div style={{marginTop:6}}><span className="rc-pill">{o.pill}</span></div>}
        </div>
      ))}
    </div>
  );
}

// Toggle
function Toggle({ on, onChange, label }) {
  return (
    <button type="button" className={'toggle' + (on ? ' on' : '')} onClick={() => onChange(!on)}>
      <span className="tw" />
      {label && <span className="tlbl">{label}</span>}
    </button>
  );
}

// AI suggestion strip
function AiStrip({ children, onAccept, onDismiss, acceptLabel = 'Terapkan saran' }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className="ai-strip">
      <div className="ic-bubble brand ai-pulse"><Icon name="sparkles" size={14} /></div>
      <div style={{flex:1,minWidth:0}}>
        <p>{children}</p>
        <div className="ais-actions">
          {onAccept && <button className="ais-link" onClick={onAccept}>{acceptLabel}</button>}
          <button className="ais-link" style={{color:'var(--fg-tertiary)'}} onClick={() => { setDismissed(true); onDismiss && onDismiss(); }}>Abaikan</button>
        </div>
      </div>
    </div>
  );
}

// Rail card wrapper
function RailCard({ icon = 'sparkles', title, meta, children }) {
  return (
    <div className="rail-card">
      <div className="rc-head2">
        <div className="ic-bubble brand"><Icon name={icon} size={16} /></div>
        <h4>{title}</h4>
        {meta && <span className="rc-meta">{meta}</span>}
      </div>
      <div className="rc-body">{children}</div>
    </div>
  );
}

// Page header
function PageHeader({ name, onName, status, savedAt }) {
  return (
    <header className="page-header" style={{paddingBottom:8}}>
      <div className="crumbs">
        <span>Workspace</span><Icon name="chevron-right" size={14} />
        <span>Asesmen AI</span><Icon name="chevron-right" size={14} />
        <span style={{color:'var(--fg-secondary)'}}>Asesmen baru</span>
      </div>
      <div className="page-title-row">
        <div style={{minWidth:0,flex:1}}>
          <div className="page-name-row">
            <input className="editable" value={name} onChange={e=>onName(e.target.value)} />
            <span className="draft-pill">{status}</span>
          </div>
          <p className="page-sub">Mimo akan menyiapkan asesmen sesuai posisi dan level — Anda tetap memegang kontrol penuh atas pertanyaan dan kriteria penilaian.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary"><Icon name="eye" size={16} />Pratinjau kandidat</button>
          <button className="btn btn-secondary"><Icon name="more-horizontal" size={16} /></button>
        </div>
      </div>
    </header>
  );
}

// Action bar
function ActionBar({ stepIdx, totalSteps, onBack, onContinue, onSaveDraft, onLaunch, savedAt }) {
  const isLast = stepIdx === totalSteps - 1;
  return (
    <div className="action-bar">
      <div className="ab-left">
        <span className="save-dot" />
        Tersimpan otomatis · {savedAt}
      </div>
      <div className="ab-right">
        {stepIdx > 0 && (
          <button className="btn btn-secondary" onClick={onBack}>
            <Icon name="arrow-left" size={16} />Kembali
          </button>
        )}
        <button className="btn btn-secondary" onClick={onSaveDraft}>Simpan sebagai draf</button>
        {isLast ? (
          <button className="btn btn-primary" onClick={onLaunch}>
            <Icon name="send" size={16} />Kirim undangan
          </button>
        ) : (
          <button className="btn btn-primary" onClick={onContinue}>
            Lanjut · {stepIdx+2} dari {totalSteps}
            <Icon name="arrow-right" size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { Icon, Sidebar, Stepper, Chips, RadioCards, Toggle, AiStrip, RailCard, PageHeader, ActionBar });
