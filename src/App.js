import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Table from './Table.js';

function App() {

    const [email, setEmail] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [phone, setPhone] = useState('')

    const [flag, setFlag] = useState(false)

    var temp = [];

    const [search, setSearch] = useState('')

    const [show, setShow] = useState(false);

    const [data, setData] = useState(null);
  
    const handleEmailChange = event => {
        setEmail(event.target.value)
    };
    const handlePhoneChange = event => {
        setPhone(event.target.value)
    };
    const handleFnameChange = event => {
        setFname(event.target.value)
    };
    const handleLnameChange = event => {
        setLname(event.target.value)
    };


    const handleSearchChange = async event => {
        await setSearch(event.target.value)
        if (search){
            for (let i=0; i<data?.length; i++){
                let fname = data[i]?.First_Name
                if(fname?.toLowerCase()?.includes(search.toLowerCase())){
                    temp.push(data[i]);
                }
            }
            console.log(temp);
            if(temp){
                setData(temp);
            }
            setFlag(true);
            console.log(search);
        }
        // else{
        //     setFlag(false);
        // }
        
    };


    const handleSubmit = event => {
        // event.preventDefault();
        console.log(email,fname,lname,phone);

        const formData = { First_Name: fname, Last_Name: lname, Email: email, Phone: phone };

        axios.post(`http://127.0.0.1:5000/add`, formData);

    };

    const handleSearchFormSubmit = event => {
        event.preventDefault();

        
    }

    useEffect(() => {
        setShow(true);
        
        if( !flag ){
            axios.get(`http://127.0.0.1:5000/users`)
            .then(res => {
                const data = res.data;
                setData(data.data);
                setShow(false);
            })
        }

    }, [flag, data]);


  return (
      <React.Fragment>
          <div class="container register-form">
          <form onSubmit={handleSubmit}>
              <div class="note">
                  <p>Register User To Zoho Portal</p>
              </div>

              <div class="form-content">
                  <div class="row">
                      <div class="col-md-6">
                          <div class="form-group">
                              <input type="text" class="form-control" placeholder="First Name *" onChange={handleFnameChange} value={fname}/>
                          </div>
                          <div class="form-group">
                              <input type="text" class="form-control" placeholder="Last Name *" onChange={handleLnameChange} value={lname}/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="form-group">
                              <input type="email" class="form-control" placeholder="Email *" onChange={handleEmailChange} value={email}/>
                          </div>
                          <div class="form-group">
                              <input type="phone" class="form-control" placeholder="Phone *" onChange={handlePhoneChange} value={phone}/>
                          </div>
                      </div>
                  </div>
                  <button type="submit" class="btnSubmit">Submit</button>
              </div>
              </form>
      </div>

      <div className="container">
            <input class="form-control mr-sm-2 w-100" type="search" placeholder="Search" aria-label="Search" onChange={handleSearchChange} value={search} />
      </div>

        <Table data={data} show={show} />

        
        </React.Fragment>
  );
}

export default App;
