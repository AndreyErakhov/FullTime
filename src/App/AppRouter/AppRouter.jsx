import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../routes/index";




function AppRouter (){
    return(
      
         <Routes>
            {routes.map(route =>
                <Route  element={route.element} 
                    path={route.path} 
                    index={route.index}
                    key={route}
                    
                    >
                </Route>
                  
           )}
            </Routes> 
        
    )
}

export default AppRouter