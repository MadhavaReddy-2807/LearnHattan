import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import path from 'path'
import Spaces from './Spaces/Spaces'
import Sidebar from './sidebar/Sidebar'
import Addcontext from './space/[spaceid]/addcontext/Addcontext'
import View from './space/[spaceid]/view/View'
import Questpage from './space/[spaceid]/view/[index]/questpage/Questpage'
import Editvalue from './space/[spaceid]/view/[index]/questpage/editvalue/Editvalue'
import Editcontent from './space/[spaceid]/view/[index]/questpage/editcontent/Editcontent'
const router=createBrowserRouter([
  {element:<App/>,
    children:[
      {
        path:'/',
        element:<Spaces/>
        
      },
      {
        path:'/spaces',
        element:<Spaces/>
      },
      {
        path:'/space/:spaceid/addcontext',
        element:<Addcontext/>
      }
      ,{
        path:'/space/:spaceid/view',
        element:<View/>
      }
      ,{
        path:'/space/:spaceid/view/:index/questpage',
        element:<Questpage/>
      },
      {
        path:'/space/:spaceid/view/:index/questpage/editvalue',
        element:<Editvalue/>
      },
      {
        path:'/space/:spaceid/view/:index/questpage/editcontent',
        element:<Editcontent/>
      },
    ]
  },
  {
    
    path:'/spaces',
    element:<Spaces/>
  },
  {
    path:'/space/:spaceid/addcontext',
    element:<Addcontext/>
  },{
    path:'/space/:spaceid/view',
    element:<View/>
  }
  ,{
    path:'/space/:spaceid/view/:index/questpage',
    element:<Questpage/>
  },
  {
    path:'/space/:spaceid/view/:index/questpage/editvalue',
    element:<Editvalue/>
  },   {
    path:'/space/:spaceid/view/:index/questpage/editcontent',
    element:<Editcontent/>
  },
  
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
          {/* <Sidebar/> */}

    <RouterProvider router={router}/>
  </StrictMode>,
)
