import React, { useEffect, useState } from 'react'
import { Card, Row } from 'react-bootstrap'
import LoadingSpinner from '../Components/LoadingSpinner'
import {useParams} from 'react-router-dom'
import { viewprofile } from '../services/allApis'
import { BASE_URL } from '../services/base_url'





function Profile() {

  // use useparams hook to get path parameter of route
  const {id} = useParams()
  console.log(id);

  // create state to display spinner
  const [showSpin,setShowSpin] = useState(true)

  // create state to hold user details
  const [userDetails,setuserdetails] = useState({})


  //define function to get profile for a spicific user
  const getProfile = async () =>{
  //  api call-viewprofile
  const {data} = await viewprofile(id)
  setuserdetails(data);
  }


useEffect(()=>{
  // call getProfile function
  getProfile()
  // set showspin as false after 2s
  setTimeout(()=>{
    setShowSpin(false)
  },2000)
},[]);

  return (
    <>
   { 
   showSpin?(
    <LoadingSpinner/>):
    (<div className="container mt-5">
      <Card className='shadow col-lg-6 mx-auto'>
        <Card.Body>
           <Row>
            <div className="col">
              <div className="profile-img d-flex justify-content-center">
                <img className='border p-1 rounded-circle'
                width={"200px"}
                height={"200px"}
                src={`${BASE_URL}/uploads/${userDetails.profile}`} alt="profile" />
              </div>
            </div>
           </Row>
           <div className="text-center mt-3">
            <h3>{userDetails.fname} &nbsp; {userDetails.lname}</h3>
            <h5><i class="fa-solid fa-envelope text-dark"></i> : {userDetails.email}</h5>
            <h5><i class="fa-solid fa-phone text-dark"></i> : {userDetails.mobile}</h5>
            <h5><i class="fa-solid fa-venus-mars text-dark"></i> : {userDetails.gender}</h5>
            <h5><i class="fa-solid fa-location-dot text-dark"></i> : {userDetails.location}</h5>
            <h5><i class="fa-solid fa-chart-line text-dark"></i> : {userDetails.status}</h5>
           </div>
        </Card.Body>
      </Card>
    </div>)
    }
    </>
  )
}

export default Profile