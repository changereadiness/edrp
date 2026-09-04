const listings={
"EDRP-000001":{title:"Caterpillar 3516 Diesel Generator",category:"Generators & Power Generation",condition:"Used — Excellent",manufacturer:"Caterpillar",model:"3516",location:"Canada",spec:"1,500 kW · 50 Hz",availability:"Contact EDRP",description:"Diesel generator available from a Canadian industrial company. Contact EDRP for seller details, current availability and additional information."},
"EDRP-000002":{title:"Industrial Centrifugal Pump",category:"Pumps",condition:"Used — Good",manufacturer:"Flowserve",model:"Mark 3",location:"Thailand",spec:"Process pump",availability:"Contact EDRP",description:"Industrial centrifugal process pump available from a company in Thailand. Contact EDRP for current availability and seller details."},
"EDRP-000003":{title:"Atlas Copco Air Compressor",category:"Compressors",condition:"Used — Excellent",manufacturer:"Atlas Copco",model:"GA 75",location:"Malaysia",spec:"75 kW",availability:"Contact EDRP",description:"Atlas Copco GA 75 air compressor available from a Malaysian industrial company."},
"EDRP-000004":{title:"SDLG Wheel Loader",category:"Construction Equipment",condition:"Demo",manufacturer:"SDLG",model:"LG936L",location:"Canada",spec:"3.0 t class",availability:"Contact EDRP",description:"Demo SDLG wheel loader available in Canada. Contact EDRP for current availability and seller details."},
"EDRP-000005":{title:"Toyota Electric Forklift",category:"Material Handling Equipment",condition:"Used — Good",manufacturer:"Toyota",model:"8F",location:"Japan",spec:"2.5 t",availability:"Contact EDRP",description:"Used Toyota electric forklift available in Japan."},
"EDRP-000006":{title:"Mazak CNC Vertical Machining Center",category:"Machine Tools",condition:"Used — Good",manufacturer:"Mazak",model:"VCN",location:"Canada",spec:"CNC machining",availability:"Contact EDRP",description:"Mazak CNC vertical machining center available from a Canadian industrial company."}
};
const id=new URLSearchParams(location.search).get("id")||"EDRP-000001",item=listings[id];
if(item){
document.title=`${item.title} | EDRP`;
const map={"listing-id":id,"listing-category":item.category,"listing-condition":item.condition,"listing-title":item.title,"listing-location":item.location,"listing-manufacturer":item.manufacturer,"listing-model":item.model,"listing-spec":item.spec,"listing-availability":item.availability,"listing-description":item.description};
Object.entries(map).forEach(([k,v])=>document.getElementById(k).textContent=v);
document.getElementById("listing-contact").href=`contact.html?id=${encodeURIComponent(id)}`;
}else{
document.title="Listing Not Found | EDRP";
document.getElementById("listing-title").textContent="Listing not found";
document.getElementById("listing-description").textContent="This equipment listing could not be found.";
document.querySelector(".listing-layout").style.display="none";
}
