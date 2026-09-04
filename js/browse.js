const listings = [
  {id:"EDRP-000001",title:"Caterpillar 3516 Diesel Generator",category:"Generators & Power Generation",manufacturer:"Caterpillar",model:"3516",condition:"Used — Excellent",country:"Canada",spec:"1,500 kW · 50 Hz",verified:true},
  {id:"EDRP-000002",title:"Industrial Centrifugal Pump",category:"Pumps",manufacturer:"Flowserve",model:"Mark 3",condition:"Used — Good",country:"Thailand",spec:"Process pump",verified:true},
  {id:"EDRP-000003",title:"Atlas Copco Air Compressor",category:"Compressors",manufacturer:"Atlas Copco",model:"GA 75",condition:"Used — Excellent",country:"Malaysia",spec:"75 kW",verified:true},
  {id:"EDRP-000004",title:"SDLG Wheel Loader",category:"Construction Equipment",manufacturer:"SDLG",model:"LG936L",condition:"Demo",country:"Canada",spec:"3.0 t class",verified:true},
  {id:"EDRP-000005",title:"Toyota Electric Forklift",category:"Material Handling Equipment",manufacturer:"Toyota",model:"8F",condition:"Used — Good",country:"Japan",spec:"2.5 t",verified:true},
  {id:"EDRP-000006",title:"Mazak CNC Vertical Machining Center",category:"Machine Tools",manufacturer:"Mazak",model:"VCN",condition:"Used — Good",country:"Canada",spec:"CNC machining",verified:true}
];

const grid=document.getElementById("listingGrid"), empty=document.getElementById("emptyState"), count=document.getElementById("resultCount");

function card(x){
  return `<a class="listing-card" href="listing.html?id=${encodeURIComponent(x.id)}">
    <div class="listing-image"><span>INDUSTRIAL EQUIPMENT</span></div>
    <div class="listing-body">
      <div class="listing-meta"><span>${x.category}</span>${x.verified?'<b>EDRP Verified</b>':''}</div>
      <h2>${x.title}</h2><p>${x.manufacturer} · ${x.model}</p>
      <div class="listing-details"><span>${x.condition}</span><span>${x.country}</span></div>
      <div class="listing-spec">${x.spec}</div>
      <div class="listing-id">${x.id}</div>
    </div>
  </a>`;
}
function render(){
  const q=document.getElementById("search").value.trim().toLowerCase();
  const category=document.getElementById("category").value;
  const condition=document.getElementById("condition").value;
  const filtered=listings.filter(x=>{
    const hay=`${x.title} ${x.manufacturer} ${x.model} ${x.category} ${x.country} ${x.spec}`.toLowerCase();
    return (!q||hay.includes(q))&&(!category||x.category===category)&&(!condition||x.condition===condition);
  });
  count.textContent=filtered.length;
  grid.innerHTML=filtered.map(card).join("");
  empty.hidden=filtered.length!==0;
}
["search","category","condition"].forEach(id=>{
  document.getElementById(id).addEventListener("input",render);
  document.getElementById(id).addEventListener("change",render);
});
document.getElementById("searchBtn").addEventListener("click",render);
render();
