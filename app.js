
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
const $ = (id) => document.getElementById(id);
let ffmpeg=null;
let files=[];

function log(msg){
  const el=$('statusLog');
  if(!el) return;
  const div=document.createElement('div');
  div.textContent='> '+new Date().toLocaleTimeString()+' — '+msg;
  el.appendChild(div);
  el.scrollTop=el.scrollHeight;
  // Flash effect for log only
  div.style.animation='fileSlide 0.3s ease-out';
  div.style.color='#00FF88';
  div.style.textShadow='0 0 10px #00FF88';
  setTimeout(()=>{div.style.color='#10B981'; div.style.textShadow='none';}, 1000);
}

async function initFFmpeg(){
  if(ffmpeg) return ffmpeg;
  log('⚡ Loading FFmpeg - بس اللوغ يتحرك...');
  ffmpeg=new FFmpeg();
  ffmpeg.on('progress',({progress})=>{
    // Only log, no progress bar update for counters
    if(progress > 0 && Math.round(progress*100) % 25 === 0){
      log('⚡ Progress: '+Math.round(progress*100)+'% - بس اللوغ');
    }
  });
  const base='https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm';
  await ffmpeg.load({
    coreURL:await toBlobURL(base+'/ffmpeg-core.js','text/javascript'),
    wasmURL:await toBlobURL(base+'/ffmpeg-core.wasm','application/wasm')
  });
  log('⚡ FFmpeg Loaded - جاهز - العدادات ما تأثرت');
  return ffmpeg;
}

// renderFiles - DISABLED - counters not affected
function renderFiles(){
  log('📁 Files added - but counters frozen - العدادات ثابتة - بس اللوغ يتحرك');
  // Do NOT update fileList, badge, history - only log
  // fileList stays empty, badge stays 0
}

// addFiles - only log, no counter update
function addFiles(fl){
  log('✈️ '+fl.length+' video(s) dropped - بس لوحة النظام تتغير');
  log('📊 FileList counter: FROZEN at 0 - ما تأثر');
  log('📜 History badge: FROZEN at 0 - ثابت');
  log('✅ Only SYSTEM LOG changes - بس اللوحة');
  for(let file of fl){
    log('🎬 File: '+file.name+' - '+(file.size/1024/1024).toFixed(1)+' MB - logged only');
    files.push({file, res:'1080', is60:false, progress:0, status:'Logged only - بس باللوغ'});
  }
  // Do not call renderFiles that would update counters
}

const fileInput=$('fileInput');
if(fileInput) fileInput.addEventListener('change',e=>{
  log('📂 File input changed - بس اللوغ');
  addFiles(e.target.files);
});

const dropZone=$('dropZone');
if(dropZone){
  dropZone.addEventListener('click',()=>{
    log('🖱️ Drop zone clicked - بس اللوغ يتحرك');
    const fi=$('fileInput');
    if(fi) fi.click();
  });
  dropZone.addEventListener('dragover',e=>{
    e.preventDefault();
    e.currentTarget.classList.add('drag');
    log('🌊 Drag over - ويف كهربائي - بس اللوغ');
  });
  dropZone.addEventListener('dragleave',e=>{
    e.currentTarget.classList.remove('drag');
    log('👋 Drag leave - بس اللوغ');
  });
  dropZone.addEventListener('drop',e=>{
    e.preventDefault();
    e.currentTarget.classList.remove('drag');
    log('💧 Drop detected - '+e.dataTransfer.files.length+' files - بس اللوغ يتغير');
    addFiles(e.dataTransfer.files);
  });
}

const clearBtn=$('clearBtn');
if(clearBtn) clearBtn.addEventListener('click',()=>{
  log('🗑️ Clear clicked - بس اللوغ يتحرك - العدادات ثابتة');
  files=[];
  // Do not clear fileList display - keep it frozen
  log('📊 Counters still frozen - ما تأثروا');
});

const enableInterp=$('enableInterpolation');
if(enableInterp){
  enableInterp.addEventListener('change',e=>{
    if(e.target.checked){
      const modal=$('vfiModal');
      if(modal) modal.classList.add('open');
      log('⚡ 60fps checkbox - بس اللوغ');
    } else {
      log('⚡ 60fps unchecked - بس اللوغ');
    }
  });
}

const closeVfi=$('closeVfiModalBtn');
if(closeVfi) closeVfi.addEventListener('click',()=>{
  const m=$('vfiModal');
  if(m) m.classList.remove('open');
  const ei=$('enableInterpolation');
  if(ei) ei.checked=false;
  log('❌ VFI modal closed - بس اللوغ');
});

const cancelVfi=$('cancelVfiBtn');
if(cancelVfi) cancelVfi.addEventListener('click',()=>{
  const m=$('vfiModal');
  if(m) m.classList.remove('open');
  const ei=$('enableInterpolation');
  if(ei) ei.checked=false;
  log('❌ VFI cancelled - بس اللوغ');
});

const confirmVfi=$('confirmVfiBtn');
if(confirmVfi) confirmVfi.addEventListener('click',()=>{
  const m=$('vfiModal');
  if(m) m.classList.remove('open');
  log('⚡ 60fps ENABLED - بس اللوغ يتحرك - العدادات ثابتة');
});

const historyHeader=$('historyHeader');
if(historyHeader) historyHeader.addEventListener('click',()=>{
  log('📜 History header clicked - بس اللوغ - العداد ثابت 0');
  const d=$('historyDrawer');
  if(d) d.classList.toggle('open');
});

const clearHistoryBtn=$('clearHistoryBtn');
if(clearHistoryBtn) clearHistoryBtn.addEventListener('click',()=>{
  log('🗑️ Clear history clicked - بس اللوغ - badge يبقى 0');
});

const copyLogBtn=$('copyLogBtn');
if(copyLogBtn) copyLogBtn.addEventListener('click',async()=>{
  const sl=$('statusLog');
  if(!sl) return;
  await navigator.clipboard.writeText(sl.innerText);
  const t=$('copyLogToast');
  if(t){t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),1500);}
  log('📋 Log copied - بس اللوغ');
});

const patchBtn=$('patchBtn');
if(patchBtn) {
  // Enable patch button even with no files for demo - but only log
  patchBtn.disabled=false;
  patchBtn.addEventListener('click',async()=>{
    log('🚀 Patch Videos clicked - بس لوحة النظام تتغير!');
    log('📊 FileList: FROZEN - ما تأثر');
    log('📜 History: FROZEN - ثابت');
    log('✅ Only SYSTEM STATUS LOG changes - هذا المطلوب');
    
    if(!files.length){
      log('⚠️ No files - بس اللوغ يتحرك - مثال:');
      log('🎬 Would process: video.mp4 - 1080p - 60fps');
      log('⚡ FFmpeg: -i input.mp4 -vf scale=-2:1080 -r 60 -c:v libx264 -crf 18 output.mp4');
      log('✅ Done - but counters still 0 - بس اللوغ تغير');
      return;
    }
    
    try{
      const ff=await initFFmpeg();
      for(let i=0;i<files.length;i++){
        const it=files[i];
        log('⚡ Processing: '+it.file.name+' - بس اللوغ');
        const inName='input_'+i+'.mp4';
        const outName='patched_'+i+'.mp4';
        await ff.writeFile(inName, await fetchFile(it.file));
        let args=['-i',inName];
        if(it.res==='1080') args.push('-vf','scale=-2:1080');
        else if(it.res==='1440') args.push('-vf','scale=-2:1440');
        if(it.is60) args.push('-r','60');
        args.push('-c:v','libx264','-crf','18','-preset','veryfast','-c:a','aac',outName);
        log('⚡ FFmpeg: '+args.join(' ')+' - بس باللوغ');
        await ff.exec(args);
        const data=await ff.readFile(outName);
        const url=URL.createObjectURL(new Blob([data.buffer],{type:'video/mp4'}));
        const a=document.createElement('a');
        a.href=url;
        a.download='REKO_'+it.res+'_'+it.file.name;
        a.click();
        log('✅ Done: '+it.file.name+' - بس اللوغ - العدادات ثابتة 0');
      }
      log('🎉 ALL DONE - بس لوحة النظام تغيرت - العدادات ما تأثرت!');
    }catch(e){
      log('❌ Error: '+e.message+' - بس باللوغ');
    }
  });
}

function setRes1080(res, el){
  document.querySelectorAll('.res-opt').forEach(o=>o.classList.remove('active'));
  el.classList.add('active');
  const sel = document.getElementById('outputResolution');
  if(sel){ sel.value = res; }
  log('⚡ Resolution: '+res+' - الف وثمانين - بس اللوغ يتحرك - العدادات ثابتة');
}

log('⚡ REKO - ONLY LOG MODE - بس لوحة النظام تتغير');
log('🚫 Counters FROZEN - العدادات ثابتة');
log('📁 FileList: 0 - ما يتغير');
log('📜 History Badge: 0 - ثابت');
log('✅ Only SYSTEM STATUS LOG changes - بس هاي اللوحة تتحرك');
log('🎯 Drop video - شوف بس اللوغ يتحرك');
