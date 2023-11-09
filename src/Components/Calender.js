import React, { useContext, useState } from 'react';
import axios from 'axios';
import Mycontext from '../Context';
import { dateorder } from './utlis/Apis';

function Calender({ id }) {
    const { item, setitem,userdata } = useContext(Mycontext)
    const [date, setdate] = useState({})

    const handler = (e) => {
        const { name, value } = e.target;
        setdate({ ...date, [name]: value })
    }

    

    const submit = (e) => {
        e.preventDefault();
        const email=userdata.email
       setdate({...date,email})
       
        axios.post(`${dateorder}/${id}`, date)
            .then(res => {
                const index = item.findIndex((value) => value._id === id)
                item[index].hours = res.data
                setitem([...item])
            })
            .catch(error => {
                return (error)
            })
    }
    return (
        <div>
            <form>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>start Date</label>
                        <input type='date' name='fromDate' className='form-control' onChange={handler}  ></input>
                    </div>
                    <div class="form-group col-md-6">
                        <label>start Time</label>
                        <input type='time' name='fromTime' className='form-control' onChange={handler} ></input>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>end Date</label>
                        <input name='toDate' className='form-control' type='date' onChange={handler} ></input>
                    </div>
                    <div class="form-group col-md-6">
                        <label>End Time</label>
                        <input type='time' className='form-control' name='toTime' onChange={handler} ></input>
                    </div>
                </div>
                <button className='btn btn-primary' onClick={submit}>Check Total</button>
            </form>

        </div>
    );
}

export default Calender;