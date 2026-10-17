const OWNER_EMAIL = "mail id "; // Replace with the inbox that receives bookings
const SPREADSHEET_ID = ""; // Optional: paste a Google Sheet ID to save submissions
function doPost(e) {
  try {
    const p=e.parameter||{};
    const fields={name:"Name",email:"Email",phone:"Phone number",service:"Service",date:"Date",time:"Time",location:"Location"};
    Object.keys(fields).forEach(k=>{if(!String(p[k]||"").trim())throw new Error(fields[k]+" is required.");});
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email))throw new Error("Invalid email address.");
    const business=String(p.business||"Booking Website");
    const body="New booking request\n\nBusiness: "+business+"\nName: "+p.name+"\nEmail: "+p.email+"\nPhone: "+p.phone+"\nService: "+p.service+"\nDate: "+p.date+"\nTime: "+p.time+"\nLocation: "+p.location+"\nAdditional details: "+(p.message||"Not provided")+"\n\nThis is a request, not a confirmed booking.";
    MailApp.sendEmail({to:OWNER_EMAIL,subject:"New booking request — "+business,body:body,replyTo:p.email,name:business+" Booking"});
    MailApp.sendEmail({to:p.email,subject:"We received your booking request — "+business,body:"Hi "+p.name+",\n\nWe received your booking request. This email confirms receipt only; your booking is not confirmed until we contact you.\n\n"+body+"\n\nRegards,\n"+business});
    if(SPREADSHEET_ID){SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0].appendRow([new Date(),p.name,p.email,p.phone,p.service,p.date,p.time,p.location,p.message||""]);}
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) { console.error(err); return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)})).setMimeType(ContentService.MimeType.JSON); }
}
