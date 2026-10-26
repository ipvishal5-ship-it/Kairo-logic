"use client";
import { useState } from "react";
import { Database, FolderOpen, FileText, Users, LockKeyhole, Check, Layers, History, ShieldCheck } from "lucide-react";
import { BrandMark } from "./brand";
const views = [
  {label:"Records", icon:Database, title:"Everything has its place.", description:"Structured records. Connected information.", rows:[
    {icon:FolderOpen, title:"Case records", detail:"Details, documents and actions together", tag:"Organised"},
    {icon:Layers, title:"Borrower information", detail:"Consistent fields within each record", tag:"Structured"},
    {icon:History, title:"Case activity", detail:"Updates linked to the work they belong to", tag:"Connected"},
  ]},
  {label:"Documents", icon:FileText, title:"Files stay in context.", description:"Documents connected to the right record.", rows:[
    {icon:FileText, title:"Case documents", detail:"Notices and orders linked to each case", tag:"Linked"},
    {icon:FolderOpen, title:"Approved templates", detail:"Case fields mapped for document preparation", tag:"Reusable"},
    {icon:Layers, title:"Field evidence", detail:"Visit photographs kept with the case", tag:"In context"},
  ]},
  {label:"Team access", icon:Users, title:"The right view for each role.", description:"Permissions defined during your setup.", rows:[
    {icon:Users, title:"Management", detail:"An overview of cases and responsibilities", tag:"Overview"},
    {icon:FileText, title:"Legal team", detail:"Assigned cases and relevant documents", tag:"Case work"},
    {icon:ShieldCheck, title:"Field team", detail:"Assigned visits and case evidence", tag:"Field work"},
  ]},
];
export default function DigitalWorkspace(){
  const [active,setActive]=useState(0);const view=views[active];
  return <div className="digital-workspace" aria-label="Illustrative digital workspace">
    <div className="digital-toolbar"><span><span className="digital-k"><BrandMark className="digital-k-mark" /></span> YOUR WORKSPACE</span><span>Illustrative setup</span></div>
    <div className="digital-intro"><div className="digital-vault" aria-hidden="true"><Database size={36}/><span><LockKeyhole size={16}/></span></div><div><p>ONE CONNECTED SYSTEM</p><h3>A place for every record.</h3></div></div>
    <div className="digital-view-buttons" role="group" aria-label="Explore workspace views">{views.map((v,i)=>{const Icon=v.icon;return <button key={v.label} aria-pressed={i===active} onClick={()=>setActive(i)}><Icon size={20}/>{v.label}</button>})}</div>
    <div className="digital-view" aria-live="polite"><div className="digital-view-heading"><h4>{view.title}</h4><p>{view.description}</p></div>
    <div className="digital-records">{view.rows.map(r=>{const Icon=r.icon;return <div className="digital-record" key={r.title}><span className="digital-record-icon"><Icon size={23}/></span><div><strong>{r.title}</strong><p>{r.detail}</p></div><span className="digital-record-tag">{r.tag}</span></div>})}</div></div>
    <div className="digital-security"><LockKeyhole size={19}/><span>Access configured by responsibility.</span><Check size={18}/></div>
  </div>
}
