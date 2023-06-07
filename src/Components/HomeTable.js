import React from 'react'
import { Card,Table, Row,Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../services/base_url';


function HomeTable({displayData,handleDelete}) {
    console.log(displayData);
  return (
    <>
    <div className="container mt-2">
        <Row>
            <div className="col">
                <Card className='shadow'>
                  <Table className='align-items-center' responsive="sm">
                     <thead>
                        <tr className='table-warning'>
                            <th>No</th>
                            <th>Full Name</th>
                            <th>E mail</th>
                            <th>Mobile</th>
                            <th>Status</th>
                            <th>Profile</th>
                            <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {
                            displayData?.length>0? displayData.map((item,index)=>(
                       <tr>
                            <td>{index+1}</td>
                            <td>{item.fname} &nbsp; {item.lname} </td>
                            <td>{item.email}</td>
                            <td>{item.mobile}</td>
                            <td>
                                <Dropdown>
                                <Dropdown.Toggle variant={item.status==="Active"?"success":"danger"} id="dropdown-basic">
                                {item.status}
                                </Dropdown.Toggle>
                                </Dropdown>
                            </td>
                            <td>
                            <img 
                            className='rounded-circle' width={'50px'} height={'50px'} 
                            src={`${BASE_URL}/uploads/${item.profile}`} alt="profile" />
                            </td>
                            <td>
                                <Dropdown>
                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                                </Dropdown.Toggle>
    
                                <Dropdown.Menu>
                                <Dropdown.Item>
                                <Link style={{textDecoration:'none'}} to={`/profile/${item._id}`}>
                                <i class="fa-solid fa-eye"></i> 
                                <span className='fs-5 text-dark ms-1'>View</span>
                                </Link>
                                </Dropdown.Item>

                                <Dropdown.Item>
                                <Link style={{textDecoration:'none'}} to={`/edit/${item._id}`}>
                                <i class="fa-solid fa-pen"></i> 
                                <span className='fs-5 text-dark ms-1'>Edit</span>
                                </Link>
                                </Dropdown.Item>

                                <Dropdown.Item onClick={()=>handleDelete(item._id)}>
                                <i class="fa-solid fa-trash"></i> 
                                <span className='fs-5 text-dark ms-1'>Delete</span>
                                </Dropdown.Item>

                                </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                            )):
                            <tr><p className='text-danger text-center fs-3 mt-3 w-100'>Sorry..!!! Nothing to display.....</p></tr>
                        }
                       
                     </tbody>
                  </Table>
                </Card>
            </div>
        </Row>
    </div>
    </>
  )
}

export default HomeTable