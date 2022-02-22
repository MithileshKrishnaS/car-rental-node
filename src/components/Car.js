import React,{useState} from 'react';
import { useEffect } from 'react';

var url="http://127.0.0.1:8081/";
const Car = () => {

    const [car,getCar]=useState([]);
    const [disp,dispCar]=useState([])

    function postDetail()
    {
        var each={
            carId:0,
            carModel:'',
            carNo:'',
            status:''
        }
        each.carId=document.getElementById("cid").value;
        each.carModel=document.getElementById("carModel").value;
        each.carNo=document.getElementById("carNo").value;
        each.status=document.getElementById("status").value;
        console.log(each)
        fetch(url+"saveCar", {
            method: "POST",
            body: JSON.stringify(each),
            headers: {
                Authorization: 'Bearer abcdxyz',
                'Content-Type': 'application/json',
            },
        })
        .then((res)=>res.json())
        .then((json)=>{
            getCar(json)
        })
        
        document.getElementById("cid").value  =   '';
        document.getElementById("carModel").value   =   '';
        document.getElementById("carNo").value  =   '';
        document.getElementById("status").value =   '';
    }

    function deletes(id)
    {
        
        console.log(id);
        fetch(url+"deleteCar/"+id, {
            method: "POST",
            headers: {
                Authorization: 'Bearer abcdxyz',
                'Content-Type': 'application/json',
            },
        })
        .then((res)=>res.json())
        .then((json)=>{
            getCar(json)
        })
    }

    function updates()
    {
        var id=0;
        var each={
            carModel:'',
            carNo:'',
            status:''
        }
        id=document.getElementById("ucid").value;
        each.carModel=document.getElementById("ucarModel").value;
        each.carNo=document.getElementById("ucarNo").value;
        each.status=document.getElementById("ustatus").value;
        
        fetch(url+"editCar/"+id, {
            method: "POST",
            body: JSON.stringify(each),
            headers: {
                Authorization: 'Bearer abcdxyz',
                'Content-Type': 'application/json',
            },
        })
        .then((res)=>res.json())
        .then((json)=>{
            getCar(json)
        })

        document.getElementById("ucid").value  =   '';
        document.getElementById("ucarModel").value   =   '';
        document.getElementById("ucarNo").value  =   '';
        document.getElementById("ustatus").value =   '';
    }

    function dispId()
    {
        var id=document.getElementById("did").value;
        fetch(url+"getCarid/"+id)
        .then((res)=>res.json())
        .then((json)=>{
            dispCar(json)
        })
        document.getElementById("did").value='';

    }

    
    useEffect(()=>{
        fetch(url+'getCar')
        .then((res)=>res.json())
        .then((json)=>{
            getCar(json)
        })
    },[])

    return (
        <div>
            <div className="whole">
                <div>
                    <h2>Insert cars</h2>
                    <input type="text" placeholder="carId" id="cid"></input><br></br><br></br>
                    <input type="text" placeholder="carModel" id="carModel"  ></input><br></br><br></br>
                    <input type="text" placeholder="carNo" id="carNo" ></input><br></br><br></br>
                    <input type="text" placeholder="status" id="status"></input><br></br><br></br>
                    <button onClick={postDetail}>submit</button> 
                </div>

                <div>
                    <h2>Display By id</h2>
                    <input type="text" placeholder="carId" id="did"></input><br></br><br></br>
                    <button onClick={dispId}>submit</button> <br></br><br></br>
                    {disp.map((input,index)=>{
                        return(
                        <div className="each">
                        <div className="each-ele">
                            <p>ID : {input.carId} </p>
                            <p>NAME : {input.carModel} </p>
                            <p>NO : {input.carNo} </p>
                            <p>STATUS : {input.status} </p>
                        </div><br></br><br></br>
                        <button onClick={()=>{deletes(input.carId)}}>delete</button>
                        </div> )
                    })}
                </div>
                <div>
                    <h2>Update cars</h2>
                    <input type="text" placeholder="Enter carId to update" id="ucid"></input><br></br><br></br>
                    <input type="text" placeholder="carModel" id="ucarModel"  ></input><br></br><br></br>
                    <input type="text" placeholder="carNo" id="ucarNo" ></input><br></br><br></br>
                    <input type="text" placeholder="status" id="ustatus"></input><br></br><br></br>
                    <button onClick={updates}>submit</button> 
                </div>

            </div>
            <br></br><br></br><br></br><br></br>
            <div className="display">
                {car.map((input,index)=>{
                    return(
                    <div className="each"> 
                        <div className="each-ele">
                            <p>ID : {input.carId} </p>
                            <p>NAME : {input.carModel} </p>
                            <p>NO : {input.carNo} </p>
                            <p>STATUS : {input.status} </p>
                        </div><br></br><br></br>
                        <button onClick={()=>{deletes(input.carId)}}>delete</button>
                    </div>  )
                })}
            </div>
            <br></br>
        </div>
    )
}

export default Car
