import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnimalsIndex from './pages/animals'
import MasterPage from './pages/layouts/masterPage'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import ProfilePage from './pages/profile'
import DashboardPage from './pages/admin/dashboard'
import AnimalsView from './pages/animals/view'
import ABMAnimals from './pages/admin/animals'
import ABMAnimalsView from './pages/admin/animals/view'
import ABMUsers from './pages/admin/users'
import ABMUsersView from './pages/admin/users/view'
import ABMRaces from './pages/admin/races'
import ABMRacesView from './pages/admin/races/view'
import ABMSpecies from './pages/admin/species'
import ABMSpeciesView from './pages/admin/species/view'
import PageNotFound from './pages/pageNotFound'
import ResetPassword from './pages/resetPassword'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

function App() {
  let navigate = useNavigate()
  
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token == null){
      navigate('/login', {replace:true})
    }
  }, [])

  // useEffect(()=>{
  //   const token = localStorage.getItem('token')
  //   if(token == null){
  //     navigate('/login', {replace:true})
  //   }
  // }, [navigate])
  
  function onLogin(user, token){
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    navigate('/', {replace:true})
  }
  function onLogout(){
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/login', {replace:true})
  }
 
  return (
    <>
      <Routes>
            <Route path='/' element={<MasterPage  onLogout={onLogout} ><HomePage/></MasterPage>} />
            <Route path='/login' element={<MasterPage onLogout={onLogout}><LoginPage onLogin={onLogin}/></MasterPage>} />
            <Route path='/register' element={<MasterPage onLogout={onLogout}><RegisterPage/></MasterPage>} />
            <Route path='/reset-password/:email' element={<MasterPage  onLogout={onLogout} ><ResetPassword/></MasterPage>} />
            <Route path='/profile' element={<MasterPage onLogout={onLogout}><ProfilePage/></MasterPage>} />
            <Route path='/animals' element={<MasterPage  onLogout={onLogout} ><AnimalsIndex/></MasterPage>} />
            <Route path='/animals/:id' element={<MasterPage  onLogout={onLogout} ><AnimalsView/></MasterPage>} />
            <Route path='/admin/dashboard' element={<MasterPage  onLogout={onLogout} ><DashboardPage/></MasterPage>} />
            <Route path='/admin/animals' element={<MasterPage  onLogout={onLogout} ><ABMAnimals/></MasterPage>} />
            <Route path='/admin/animals/:id' element={<MasterPage  onLogout={onLogout} ><ABMAnimalsView/></MasterPage>} />
            <Route path='/admin/users' element={<MasterPage  onLogout={onLogout} ><ABMUsers/></MasterPage>} />
            <Route path='/admin/users/:id' element={<MasterPage  onLogout={onLogout} ><ABMUsersView/></MasterPage>} />
            <Route path='/admin/races' element={<MasterPage  onLogout={onLogout} ><ABMRaces/></MasterPage>} />
            <Route path='/admin/races/:id' element={<MasterPage  onLogout={onLogout} ><ABMRacesView/></MasterPage>} />
            <Route path='/admin/species' element={<MasterPage  onLogout={onLogout} ><ABMSpecies/></MasterPage>} />
            <Route path='/admin/species/:id' element={<MasterPage  onLogout={onLogout} ><ABMSpeciesView/></MasterPage>} />
            <Route path='*' element={<MasterPage  onLogout={onLogout} ><PageNotFound/></MasterPage>} />
      </Routes>
    </>
  );
}

export default App;
