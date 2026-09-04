const EDRP_FORM_RECIPIENT="REPLACE_WITH_YOUR_EDRP_EMAIL";
const qs=new URLSearchParams(location.search);
const listing=qs.get("id");
document.querySelectorAll(".edrp-form").forEach(form=>{
if(listing&&form.elements.listing_id)form.elements.listing_id.value=listing;
form.addEventListener("submit",e=>{
e.preventDefault();
const result=form.querySelector(".form-result");
if(EDRP_FORM_RECIPIENT==="contact@sayudi.com"){
result.textContent="The form is ready. Configure EDRP_FORM_RECIPIENT in js/forms.js before publishing.";
result.className="form-result error";return;
}
const subject=form.dataset.formType==="seller"?"EDRP equipment submission":`EDRP equipment inquiry${listing?" — "+listing:""}`;
const lines=[];
for(const el of form.elements)if(el.name&&el.type!=="submit"&&el.type!=="checkbox"&&el.value.trim())lines.push(`${el.name.replaceAll("_"," ")}: ${el.value.trim()}`);
location.href=`mailto:${EDRP_FORM_RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
result.textContent="Your email application should now open with the submission prepared.";
result.className="form-result success";
});
});
