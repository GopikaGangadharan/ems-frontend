import React, { useEffect, useState ,useContext } from 'react'
import { Form,Button, Alert } from 'react-bootstrap'
import HomeTable from '../Components/HomeTable'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../Components/LoadingSpinner'
import { deleteContext, editContext, registerContext } from '../Components/ContextShare';
import { getusersapi, removeUser } from '../services/allApis'



function Home() {

  // get editContext using useContext
  const {editData,seteditData} = useContext(editContext)

  // get deleteContext using useContext
  const {deleteData,setdeleteData} = useContext(deleteContext)

  // state to hold serachbaritems
  const [searchKey,setSearchKey] =useState("")
  // console.log(searchKey);

  // state to hold all users
  const [allusers,setallusers] = useState([])

  // define handle delete user
  const deleteUser = async(id)=>{
    console.log('inside delete function: '+id);
    // make api call to service
    const res = await removeUser(id)
    console.log(res);
    if(res.status===200){
      // data successfully delete
      setdeleteData(res.data)
      // call api getuser api
      getallusersDetails()
    }
    else{
      console.log("Error");
    }
  }


  // define a function to call getallusers api
  const getallusersDetails = async ()=>{
    const serverResponse = await getusersapi(searchKey)
    // console.log(serverResponse);
    setallusers(serverResponse.data)
  }

  console.log(allusers);

  // get register context using useContext
  const {registerData,setregisterData} = useContext(registerContext)


  // cretae state to display spinner
  const [showSpin,setShowSpin] = useState(true)

  // navigate to another page-useNavigate
  const navigate = useNavigate()

  // to redirect to register page when add btn clicked
  const addUser =()=>{

  // navigate to register
  navigate('/Register')
  };

  useEffect(()=>{

    // call getusersapi
    getallusersDetails()
   

    // set showspin as false after 2s  
    setTimeout(()=>{
      setShowSpin(false)
    },2000)
  },[searchKey])

  return (
    <>
{
  registerData? <Alert className='bg-success ' style={{fontSize:'1.3rem'}} variant='success' onClose={()=>setregisterData("")}
  dismissible>{registerData.fname.toUpperCase()} Successfully Registered...</Alert> :""
}
{
  editData? <Alert className='bg-success ' style={{fontSize:'1.3rem'}} variant='success' onClose={()=>seteditData("")}
  dismissible>{editData.fname.toUpperCase()} Successfully updated...</Alert> :""
}
{
  deleteData? <Alert className='bg-danger ' style={{fontSize:'1.3rem'}} variant='danger' onClose={()=>setdeleteData("")}
  dismissible>{deleteData.fname.toUpperCase()} Successfully deleted...</Alert> :""
}
      <div className='container mt-5'>
          <div className="frist-div">
              {/* search add btn */}
              <div className="search-add d-flex justify-content-between">
                 {/* search */}
                 <div className="search col-md-4">
                  <Form className='d-flex'>
                  <Form.Control required type="text" placeholder="Search Employee"
                   onChange={e=>setSearchKey(e.target.value)}
                  />
                  <Button className='ms-2' variant='primary'>Search</Button>
                  </Form>
                 </div>
                 <div className="add">
                  <button onClick={addUser} className='btn btn-info'><i class="fa-solid fa-user-plus me-2"></i>Add</button>
                 </div>
              </div>
          </div>
  
          <div className="sec-div mt-3 mb-3">
  
            {
              showSpin ?(
              <div>
              <LoadingSpinner/>
            </div>)
            :
            (<div>
            <h2 className='text-center mt-5'>List of Employees</h2>
            {/* table */}
            <HomeTable  displayData={allusers}
            handleDelete ={deleteUser} />
            </div>)
            }
  
          </div>
      </div>

    </>
  )
}

export default Home