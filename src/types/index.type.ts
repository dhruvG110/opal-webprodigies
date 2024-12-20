export type WorkSpaceProps={
    data:{
        subscription:{
            plan :"FREE" | "PRO" 
        } | null
        workspace:{
            id:string
            name:string 
            type:"PERSONAL" | "PUBLIC"
        }[]
        members:{
            Workspace:{
                id:string
                name:string
                type:"PERSONAL" | "PUBLIC"
            }
        }[]
    }
}