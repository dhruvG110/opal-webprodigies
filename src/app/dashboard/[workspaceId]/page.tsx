 import React from 'react'
 
 const ComponetStuff = async({params}) => {
  const param  = await params
  console.log(param.workspaceId)
   return (
     <div>
         <h1>Dashboard</h1>
     </div>
   )
 }
 
 export default ComponetStuff
 