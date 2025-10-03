// import React, { useEffect, useState } from "react";
//
// const ProfileForm = ({ onSaved, disabled }) => {
//     const [form, setForm] = useState({ fullName: "", email: "", phone: "", bio: "" });
//     const [saving, setSaving] = useState(false);
//
//     useEffect(() => {
//         fetch("http://localhost:8080/profile")
//             .then((r) => r.json())
//             .then((data) => {
//                 if (data) setForm({ fullName: data.fullName || "", email: data.email || "", phone: data.phone || "", bio: data.bio || "" });
//             })
//             .catch((e) => console.warn("Profile load failed", e));
//     }, []);
//
//     const saveEverything = async () => {
//         setSaving(true);
//         try {
//             await fetch("http://localhost:8080/profile", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(form),
//             });
//
//             const res = await fetch("http://localhost:8080/progress/complete", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ section: "profile" }),
//             });
//             const progress = await res.json();
//
//             if (onSaved) onSaved(progress);
//             alert("Profile saved and marked complete!");
//         } catch (err) {
//             console.error(err);
//             alert("Error saving — check backend console");
//         } finally {
//             setSaving(false);
//         }
//     };
//
//     return (
//         <div className="form-body">
//             <div className="form-left">
//                 <label className="block small mb-2">Full name</label>
//                 <input className="input" name="fullName" value={form.fullName} onChange={(e)=>setForm({...form, fullName:e.target.value})} />
//                 <div style={{height:12}} />
//                 <label className="block small mb-2">Email</label>
//                 <input className="input" name="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
//                 <div style={{height:12}} />
//                 <label className="block small mb-2">Phone</label>
//                 <input className="input" name="phone" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} />
//                 <div style={{height:12}} />
//                 <label className="block small mb-2">Short bio / summary</label>
//                 <textarea className="textarea" name="bio" value={form.bio} onChange={(e)=>setForm({...form, bio:e.target.value})} />
//             </div>
//
//             <div className="form-right">
//                 <div style={{ marginBottom: 10 }}>
//                     <div className="small">Preview</div>
//                     <div style={{background:"#fafafa", borderRadius:10, padding:12, minHeight:120, border:"1px solid #eef2ff"}}>
//                         <div style={{fontWeight:700}}>{form.fullName || "Your name"}</div>
//                         <div style={{color:"#6b7280", fontSize:13}}>{form.email || "email@example.com"}</div>
//                         <div style={{marginTop:8, color:"#374151"}}>{form.bio || "Short personal summary..."}</div>
//                     </div>
//                 </div>
//
//                 <div style={{ display: "flex", gap: 12 }}>
//                     <button className="btn btn-ghost" onClick={()=>{ setForm({ fullName:"", email:"", phone:"", bio:"" }); }}>
//                         Clear
//                     </button>
//                     <button className="btn btn-primary" onClick={saveEverything} disabled={saving || disabled}>
//                         {saving ? "Saving..." : "Save & Complete"}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default ProfileForm;
