import { buildActivity, buildAppsScriptPayload, createSeededRandom, gradeObjectiveAnswers, toPublicActivity } from "../../server/activity";
import { STUDENTS } from "../../server/students";

const APPS_SCRIPT_URL=process.env.GOOGLE_APPS_SCRIPT_URL||"https://script.google.com/macros/s/AKfycbzGAB0aifvKGD5NU5rrvupIk2UruQoC1HBE_PxsrzPmdDHCmzfd6PHf3tXkZhm5B5sX/exec";
const success=(json:unknown)=>({result:{data:{json}}});
const failure=(e:unknown)=>({error:{json:{message:e instanceof Error?e.message:"Erro interno.",code:-32603,data:{code:"INTERNAL_SERVER_ERROR",httpStatus:500}}}});
type Attempt={studentId:string;accessKey:string};
function idOf(value:Attempt){return "v1."+Buffer.from(JSON.stringify(value)).toString("base64url");}
function parseId(id:string){if(!id.startsWith("v1."))throw new Error("Atividade inválida.");const v=JSON.parse(Buffer.from(id.slice(3),"base64url").toString("utf8"));if(!v.studentId||!v.accessKey)throw new Error("Atividade inválida.");return v as Attempt;}
function activity(studentId:string,accessKey:string,id:string){
 const s=STUDENTS.find(x=>String(x.number)===studentId);if(!s)throw new Error("Estudante não encontrado na turma 2ª Série C.");
 return buildActivity({id,studentId,studentNumber:s.number,studentName:s.name,studentRa:s.ra,studentDigit:s.digit,studentEmail:s.email,random:createSeededRandom(accessKey)});
}
async function run(path:string,input:any){
 if(path==="activity.connection")return {connected:true,sheet:"2ªBIO 3º"};
 if(path==="activity.students")return STUDENTS.map(s=>({id:String(s.number),name:s.name,number:s.number,ra:s.ra,digit:s.digit,email:s.email}));
 if(path==="activity.preview")return toPublicActivity(activity("1",input?.accessKey||"preview","preview"));
 if(path==="activity.create"){if(!input?.id||!input?.accessKey)throw new Error("Dados de acesso inválidos.");const id=idOf({studentId:input.id,accessKey:input.accessKey});return toPublicActivity(activity(input.id,input.accessKey,id));}
 if(path==="activity.submit"){
  if(!input?.activityId||!Array.isArray(input.answers)||input.answers.length!==10)throw new Error("Respostas inválidas.");
  const a=parseId(input.activityId),stored=activity(a.studentId,a.accessKey,input.activityId),grade=gradeObjectiveAnswers(stored,input.answers);
  try{const r=await fetch(APPS_SCRIPT_URL,{method:"POST",redirect:"follow",headers:{"content-type":"text/plain;charset=utf-8"},body:JSON.stringify(buildAppsScriptPayload(stored,input.answers,grade))});const raw=await r.text();let data:any={};try{data=JSON.parse(raw)}catch{}if(!r.ok||data.status==="error")throw new Error(data.message||"O Apps Script recusou o registro.");return {accepted:true,syncStatus:"SYNCED",score:grade.correct,total:grade.total,row:data.row};}
  catch(e){return {accepted:true,syncStatus:"SYNC_FAILED",score:grade.correct,total:grade.total,message:e instanceof Error?e.message:"Não foi possível sincronizar com a planilha."};}
 }
 throw new Error("Procedimento não encontrado.");
}
export default async function handler(req:any,res:any){
 try{const paths=String(req.query.trpc||"").split(",").filter(Boolean);const raw=req.method==="GET"?req.query.input:req.body;const inputs=typeof raw==="string"?JSON.parse(raw):raw;const output=await Promise.all(paths.map(async(path:string,i:number)=>{try{return success(await run(path,inputs?.[String(i)]?.json));}catch(e){return failure(e);}}));res.status(200).json(paths.length>1||req.query.batch==="1"?output:output[0]);}
 catch(e){res.status(500).json(failure(e));}
}