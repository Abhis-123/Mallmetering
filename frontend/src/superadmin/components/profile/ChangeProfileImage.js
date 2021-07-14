import React, { Component } from 'react'
import { Button,Container } from 'shards-react'
import DefaultImage from '../../assets/images/0.jpg'
class ChangeProfileImage extends Component {
    constructor(props){
        super(props)
        this.state = {
            file:"",
            new:false
        }
        this.handleimageupload= this.handleimageupload.bind(this)
    }

    handleimageupload(e){
        e.preventDefault()
            this.setState({
                file:URL.createObjectURL(e.target.files[0]),
                new:true
            })
    }
    UNSAFE_componentWillMount(){
        if(this.state.new===false){
            this.setState({
                file:DefaultImage
            })
        }
        
    }
    render() {
        return (

            <Container fluid className="main-content-container  mt-3">
    <div className="card login-card">
          <div className="row no-gutters">
            <div className="">
              <div className="card-body">
              <div className="card-header text-center">
                                Upload New Profile Image  
                        </div>
                        <div className="card-body">
                            <div className="row">
                            <div className="col-4"></div>
                            <div className="image-preview col-4 fluid  align-items-center">
                                <img  style={{maxWidth:"100px",
                                              borderRadius:"50%"}} className="profile circle" src={this.state.file} alt="profile"/>     
                            </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-4">Select image</div>
                                <div className="col-4 pl-4">
                             <input type="file"  className="input ml-4"onChange={this.handleimageupload}/>                            </div>
                                </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-lg-4 col-md-6"></div>
                             <Button className="col-lg-4"theme="primary" onClick={this.upload} >Upload</Button>
                         </div>
               
                <nav className="login-card-footer-nav">
                </nav>
              </div>
            </div>
          </div>
        </div>
        </Container>




           
        )
    } 
}

export default ChangeProfileImage
