import clientPromise from "./mongodb";
const DB_NAME = "portfolio";
const COLLECTION = "portfolio";

async function getCol(){ try{ const c=await clientPromise; return c ? c.db(DB_NAME).collection(COLLECTION) : null }catch{ return null } }
async function getStore(){ try{ const col=await getCol(); if(!col) return {contactMessages:[]}; const d=await col.findOne({_id:"site" as any}); return d||{contactMessages:[]} }catch{ return {contactMessages:[]} } }

export const localGetContactMessages = async()=>{ const s=await getStore(); return (s as any).contactMessages||[] }
export const localInsertContactMessage = async(data:any)=>{ try{ const col=await getCol(); if(col) await col.updateOne({_id:"site" as any},{$push:{contactMessages:{...data,created_at:new Date().toISOString()}}} as any,{upsert:true})}catch{} return true }
export const localGetSiteData = getStore;
export default getStore; 