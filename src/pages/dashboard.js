import React from 'react';
import { useState, useEffect } from 'react';
import SideMenu from './sideMenu';
import TopBar from './topBar';
import { firestore } from "../config/firestore";
import { doc,getDocs, addDoc, updateDoc, deleteDoc, collection } from "@firebase/firestore";
import { Button, Modal, Row, Col, Container } from "react-bootstrap";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// https://firebase.google.com/docs/firestore/manage-data/add-data
// https://firebase.google.com/docs/firestore/manage-data/delete-data
function Dashboard() {
    const db = collection(firestore, "todos");
    const [addSubject, setAddSubject] = useState("");
    const [editSubject, setEditSubject] = useState("");
    const [editSubjectId, setEditSubjectId] = useState("");
    
    const [todoList, setTodoList] = useState();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getTodoList()
    }, [])

    async function getTodoList() {
        const todoData = await getDocs(db);
        const dataList = todoData.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTodoList(dataList);
        console.log(dataList);
    }


    const handleAddTodo = (e) => {
        e.preventDefault();
        if (addSubject !== "") {
            addDoc(db, { Subject:addSubject, completed: false });
            setAddSubject("");
            getTodoList()
        }
    }



    const handleClose = () => {
        setOpen(false);
    };


    const handleEdit = (editData) => {
        console.log(editData)
        setEditSubject(editData.Subject)
        setEditSubjectId(editData.id)
        
        setOpen(true); //open Modal 
    }



    const handleUpdateTodo = (e) => {
        e.preventDefault();
        if (editSubject !== "") {
            console.log(editSubject,editSubjectId)
            const Ref = doc(db, editSubjectId);
            updateDoc(Ref, {
                Subject: editSubject
              });
            setEditSubject("");
            setEditSubjectId("");
            setOpen(false); //close the modal
            getTodoList() //reoad todo list
        }
    }







    const handleDelete = (delDataId) => {
        console.log(delDataId)
        deleteDoc(doc(db,delDataId));
        getTodoList()
    }


    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">
            <SideMenu></SideMenu>
            {/* <!--  Main wrapper --> */}
            <div className="body-wrapper">
                <TopBar></TopBar>

                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title fw-semibold mb-4">Today Planner</h5>
                            <form onSubmit={handleAddTodo}>
                                <div className="input-container">
                                    <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                                        <input type="text" className="form-control"
                                            placeholder='what do you want to do?'
                                            value={addSubject}
                                            onChange={(e) => setAddSubject(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                                        <button className='btn btn-primary'>Add-Todo</button>
                                    </div>
                                </div>
                            </form>


                            <div>
                                <table className="table table-striped table-responsive">
                                    <thead>
                                        <tr>
                                            <th>Todo</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {todoList?.map(function (data, index) {
                                            return <>
                                                <tr key={data.index}>
                                                    <td>{data.Subject}</td>
                                                    <td>
                                                        <button className="button-edit" onClick={() => handleEdit(data)}> <EditIcon id="i" /> </button>
                                                        <button className="button-delete" onClick={() => handleDelete(data.id)}>
                                                            <DeleteIcon id="i" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            </>
                                        })}
                                    </tbody>
                                </table>
                            </div>


                            <Modal show={open} onHide={()=>{setOpen(false)}} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Todo</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <form onSubmit={handleUpdateTodo}>
                                        <div className="input-container">
                                            <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                                                <input type="text" className="form-control"
                                                    placeholder='what do you want to do?'
                                                    value={editSubject}
                                                    onChange={(e) => setEditSubject(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                                                <button className='btn btn-primary'>Update-Todo</button>
                                            </div>
                                        </div>
                                    </form>


                                </Modal.Body>
                            </Modal>




                        </div>
                    </div>
                </div>
            </div>

        </div>
    )


}
export default Dashboard;

