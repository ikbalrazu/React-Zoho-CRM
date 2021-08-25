import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import Loader from "react-loader-spinner";

export default function Table({data, show}) {

    return <div>
        <table className="mid">
            <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
                visible={show}
            />
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>

                {
                    data?.map((user, index) => (
                        <tr>
                            <td>{user.First_Name}</td>
                            <td>{user.Last_Name}</td>
                            <td>{user.Email}</td>
                            <td>{user.Phone}</td>
                        </tr>
                    ))
                }

                </table>
    </div>
}