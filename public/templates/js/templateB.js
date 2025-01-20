const summaryContent=document.querySelector('.summaryContent')
const skillLists=document.querySelectorAll('.skillList')
const allHeadings=document.querySelectorAll('.allHeadings')
const downloadBtn=document.querySelector('.downloadBtn')
const lists=document.querySelectorAll('li')
const wholeContainer = document.querySelector(".wholeContainer");
const mainIcon = document.querySelector(".bodyBtn");
const plusIcon = document.querySelector(".plusicon");
const deleteIcon = document.querySelector(".deleteIcon");
const boldIcon=document.querySelector('.boldIcon')
const normalIcon=document.querySelector('.normalIcon')
const listContainers=document.querySelectorAll('ul')
const span1=document.querySelectorAll('.span1')
const span2=document.querySelectorAll('.span2')
const skillParent=document.querySelectorAll('.skillParent')

let skillData=`<span class="boldList font-bold span1" contenteditable="true">User Heading:</span>
           <span class="span2" contenteditable="true">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam modi error, quo eveniet 
             aperiam neque.</span>`
let isBold=false
let listData=`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam modi error, quo eveniet aperiam neque.`
let data=`Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, placeat iure architecto consequatur ex sequi vero voluptates doloremque culpa non earum quis et, minus asperiores ea facilis voluptate necessitatibus fugit aliquid vel praesentium! Excepturi deleniti omnis molestiae provident illo eos?`
let span1Data=`User Heading:`
let span2Data=`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam modi error, quo eveniet 
             aperiam neque.`
summaryContent.addEventListener('focus',()=>{
  if(summaryContent.innerText===data){
 summaryContent.innerText=''
  }
})
summaryContent.addEventListener('blur',()=>{
  if(summaryContent.innerHTML===''){
    summaryContent.innerText=data

  }
})

function handlerFocusBlur(elements,defaultContent,isHtml=true){
 elements.forEach((subElement)=>{
  subElement.addEventListener('focus',()=>{
    
    const currentContent = isHtml ? subElement.innerHTML.trim() : subElement.innerText.trim();
    if (currentContent ===defaultContent.trim()) {
      subElement[isHtml ? 'innerHTML' : 'innerText'] = '';
      
    }
    
  })
  subElement.addEventListener('blur',()=>{
    const currentContent = isHtml ? subElement.innerHTML.trim() : subElement.innerText.trim();
  if(currentContent==''){
    subElement[isHtml?'innerHTML':'innerText']= defaultContent
  }
  })
})
  
}

handlerFocusBlur(span1,span1Data,true)
handlerFocusBlur(span2,span2Data,true)
handlerFocusBlur(allHeadings,"Lorem ipsum dolor sit amet.")
handlerFocusBlur(lists,`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam modi error, quo eveniet aperiam neque.`)



let cloneDiv=null
let selectListContainer=null
let selectListElement=null
let parentContainer=null
let skillParentContainer=null


wholeContainer.addEventListener('click',(e)=>{
  if (selectListContainer) {
    selectListContainer.classList.remove("showBorder");
    selectListContainer = null;
  }
  if (selectListElement) {
    selectListElement.classList.remove("selected");
    selectListElement = null;
  }
//  For Containers
  if(e.target.tagName==='UL' || e.target.closest("skillParentContainer")){
     selectListContainer=e.target
     parentContainer=selectListContainer.closest('.selectedParentContainer')
     selectListContainer.classList.add('showBorder')
     skillParentContainer= selectListContainer.classList.contains("skillParentContainer")
     
     
      if(parentContainer || selectListContainer){
       let optionalContainer=null
       skillParentContainer?(optionalContainer= selectListContainer):(optionalContainer=parentContainer)
      
        optionalContainer.style.position='relative'
        mainIcon.style.display='flex'
        optionalContainer.appendChild(mainIcon)
        mainIcon.style.position='absolute'
        mainIcon.style.top='5px'
       
   }
  }
  if(e.target.tagName==='H1'){
    selectListElement.classList.remove("selected")
  }
// For Lists
  if(e.target.tagName==='LI'){
    selectListElement=e.target
    selectListElement.classList.add("selected")
    if(selectListContainer){
    selectListContainer.classList.remove('showBorder')
  }

  attachListItemBehavior(selectListElement);
  }
 
  function attachListItemBehavior(selectListElement){

     if(!selectListElement.dataset.keydownAttached){
        selectListElement.addEventListener('keydown',(e)=>{
         e.stopImmediatePropagation();
          if(e.key==='Enter'){
          e.preventDefault()
          cloneDiv = selectListElement.cloneNode(true); 
          delete cloneDiv.dataset.keydownAttached; 
         cloneDiv.classList.remove('selected')
        
           if(selectListElement.closest('.skillParentContainer')){
             cloneDiv.innerHTML=skillData
             selectListElement.closest('.skillParentContainer').appendChild(cloneDiv);
             
            }
            else{
              cloneDiv.innerText=listData
              selectListElement.closest('ul').appendChild(cloneDiv);
            }
            addFocusBlurToItem(cloneDiv)
            attachListItemBehavior(cloneDiv)
         }
        })
        selectListElement.dataset.keydownAttached = true;
        }
  }
 })
      
 
 function addFocusBlurToItem(listItem) {
    listItem.addEventListener('focus', (e) => {
    if (listItem.innerText==listData ) {
    listItem.innerText = '';
    }
  });

  listItem.addEventListener('blur', () => {
  
    if (listItem.innerHTML === '') {
      listItem.innerText =listData;
    
    }
  });
}

plusIcon.addEventListener('click',(e)=>{
  e.stopPropagation()
 if(selectListContainer && selectListContainer.closest('.selectedParentContainer')){
  const cloneParentDiv=selectListContainer.cloneNode(true)
  cloneParentDiv.classList.remove('showBorder')
  parentContainer.closest('.selectedParentContainer').appendChild(cloneParentDiv)
}

})

deleteIcon.addEventListener('click',(e)=>{
  if(selectListElement && selectListElement.classList.contains('selected')){
    console.log(selectListElement);
    selectListElement.remove()
    selectListElement.classList.remove('selected')
    selectListElement=null
    return
  }
  if(selectListContainer){
    selectListContainer.remove()
    selectListContainer=null
   
  }
})



downloadBtn.addEventListener('click', function (event) {
  wholeContainer.classList.add("hidden-border");
  const opt = {
    margin: [0.5, -0.2, 0.7, 0],
    padding:[10,5,10,5],
    filename: "resumeFile.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf()
    .set(opt)
    .from(wholeContainer)
    .save()
    .then(() => {
      wholeContainer.classList.remove("hidden-border");
    });
})
