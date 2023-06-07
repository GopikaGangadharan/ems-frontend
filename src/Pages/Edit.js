import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Form, Row , Alert } from 'react-bootstrap';
import Select from 'react-select';
import LoadingSpinner from '../Components/LoadingSpinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css' ;
import { updateUser,viewprofile } from '../services/allApis';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../services/base_url';
import { editContext } from '../Components/ContextShare';




function Edit() {


// get editContext
const {editData,seteditData} = useContext(editContext)
  
 // get parameter from url
 const {id} = useParams()
// state to hold existing image from server
const [exisitingImg,setexistingImg] = useState("")


//  get details of given id from server
const getUserProfile = async ()=>{
  // calll viewprofile of service
  const {data} = await viewprofile(id)
  setuserdata(data);
  setStatus(data.status)
  setexistingImg(data.profile)
}

  // error msg
  const [errorMsg,setErrorMsg] = useState("")

  // use  useNavigate hook
  const navigate = useNavigate()

  // state display spinner
  const [showSpin,setShowSpin] = useState(true)

  // status
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' }
    
  ];

  //create state to hold userInputdata
  const [userdata,setuserdata] = useState({
    fname:"",
    lname:"",
    email:"",
    mobile:"",
    gender:"",
    location:""
  })


  // create status for hold status
  const [status,setStatus] = useState("Active")

  // create status for hold image
  const [image,setImage] = useState("")

  // craete state to holde profile picture
  const [preview,setPreview] = useState("")

  // to update userdata when user enter the input using html
  const userDetails =(e)=>{
    const{name,value}=e.target
    setuserdata({...userdata,[name]:value})
  }


  // to update status state
  const updateState =(e)=>{
    setStatus(e.value)
  }

  // to update image state
  const setProfile = (e)=>{
    setImage(e.target.files[0])
  }

  // console.log(userdata);
  // console.log(status);
  // console.log(image);

  useEffect(()=>{
    getUserProfile()
  },[id])

  useEffect(()=>{

    if(image){
      setexistingImg("")
      // update priew picture
      setPreview(URL.createObjectURL(image))
    }

    // set showspin as false after 2s 
    setTimeout(()=>{
      setShowSpin(false)
    },2000)
  },[image])


  // defining register submition
  const handleSubmit= async (e)=>{
    // prevent  click event to stop reload
    e.preventDefault()
    // get user inputs data from the form
    const {fname,lname,email,mobile,gender,location} = userdata
    if(fname===""){
      toast.error("First Name Required")
    }
    else if(lname===""){
      toast.error("Last Name Required")
    }
    else if(email===""){
      toast.error("Email Required")
    }
    else if(mobile===""){
      toast.error("Mobile Number Required")
    }
    else if(gender===""){
      toast.error("Gender Required")
    }
    else if(image===""){
      toast.error("Image Required")
    }
    else if(location===""){
      toast.error("Location Required")
    }
    else{
      // make edit api call

      // headerconfig
      const  headerConfig = {
        "Conent-Type":"multipart/form-data"
      }
      // body -formDATA
    const data = new FormData()
    data.append("user_profile",image || exisitingImg)
    data.append("fname",fname)
    data.append("lname",lname)
    data.append("email",email)
    data.append("mobile",mobile)
    data.append("gender",gender)
    data.append("status",status)
    data.append("location",location)

    // api call
    const response = await updateUser(id,data,headerConfig)
    if (response.status===200){
      
      // share response data to other components via context
      seteditData(response.data)
      // navigate to home page
      navigate('/')
    }
    else{
      setErrorMsg("Error")
    }

    }
   
  }


  return (
    <>

    {
      errorMsg?<Alert variant='danger' className='bg-danger' style={{fontSize:'1.2rem'}}  onClose={()=>setErrorMsg("")} dismissible>
      {errorMsg}</Alert> : ""
    }


{
  showSpin?
  (
    <div>
    <LoadingSpinner/>
  </div>):(
    <div className="container mt-5">
      <h2 className='text-center mt-5'>Upate Employee Details</h2>
      <Card className='shadow mt-3 p-3'>


      <div className='text-center mb-3'>
        <img 
        className='border p-1 rounded-circle' 
        width={'100px'} height={'100px'} 
        src={ preview?preview: `${BASE_URL}/uploads/${exisitingImg}`}
        alt="profile" />
      </div>

      <Form>
        <Row>

          {/* First Name */}
          <Form.Group className='col-lg-6 mb-2'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
            name='fname'
           
            value={userdata.fname}
            onChange={userDetails}
            required
            type='text'
            placeholder='First Name'/>
          </Form.Group>

          {/* Last Name */}
          <Form.Group className='col-lg-6 mb-2'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
            name='lname'
            onChange={userDetails}
            value={userdata.lname}
            required
            type='text'
            placeholder='Last Name'/>
          </Form.Group>

          {/* Email Address */}
          <Form.Group className='col-lg-6 mb-2'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
            name='email'
            onChange={userDetails}
            value={userdata.email}
            required
            type='email'
            placeholder='Email'/>
          </Form.Group>

          {/* Mobile */}
          <Form.Group className='col-lg-6 mb-2'>
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
            name='mobile'
            onChange={userDetails}
            value={userdata.mobile}
            required
            type='text'
            placeholder='Mobile'/>
          </Form.Group>

          {/* Gender */}
          <Form.Group className='col-lg-6 mb-2'>
            <Form.Label>Gender</Form.Label>
            <Form.Check
            type={'radio'}
            label={'Male'}
            name='gender'
            value={"Male"}
            checked={userdata.gender==="Male"?true:false}
            onChange={userDetails}

            />
            <Form.Check
            type={'radio'}
            label={'Female'}
            name={'gender'}
            value={"Female"}
            checked={userdata.gender==="Female"?true:false}
            onChange={userDetails}

            />
          </Form.Group>

          {/* Status */}
          <Form.Group className='col-lg-6 mb-2'>
            <Form.Label>Select Employee Status</Form.Label>
            <Select className='text-dark form-control' options={options} defaultInputValue={status}
            onChange={updateState} />
          </Form.Group>

          {/* upload photo */}
          <Form.Group className='col-lg-6 mb-2'>
            <Form.Label>Choose Profile Picture</Form.Label>
            <Form.Control name='user_profile' required type='file' onChange={setProfile}/>
          </Form.Group>

          {/* location */}
          <Form.Group className='col-lg-6 mb-2'>
            <Form.Label> Enter Employee Location</Form.Label>
            <Form.Control
            name='location'
            onChange={userDetails}
            value={userdata.location}
            required
            type='text'
            placeholder='Employee Location'/>
          </Form.Group>

          {/* submit */}
          <Button onClick={handleSubmit} className='btn btn-info mt-3'>Submit</Button>

        </Row>
      </Form>
      </Card>
    </div>
  )
    
    }
    <ToastContainer position='top-center' />
    </>
  );
}

export default Edit