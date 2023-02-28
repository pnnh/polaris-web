'use client'

import { handleRegisterSubmit } from '@/models/account'
import React, { useState } from 'react'  
 

export default function Home () { 
  const [displayName, setDisplayName] = useState('') 
  return <div>
        <h1>注册页面</h1>
        <div className="section">
    <div className="container">
        <div className="columns">
            <div className="column is-4">
                    <div className="field">
                        <label className="label">Display name</label>
                        <div className="control has-icons-left has-icons-right">
                            <input className="input" type="text" placeholder="Anders Åberg" name="displayName"
                                value={displayName} onChange={(event) => {
                                  setDisplayName(event.target.value)
                                }}/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </div>

                    <div className="field"> 
                        <button onClick={(event) => {
                          handleRegisterSubmit('', displayName)
                        }}>注册用户</button>
                    </div> 
            </div> 
        </div>
    </div>
</div>
         
    </div>
}


