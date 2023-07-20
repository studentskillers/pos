import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Modal } from "react-bootstrap";
import { firestore } from "../config/firestore";
import { addDoc, collection} from "@firebase/firestore";

function CustomerModal({ open, handleClose }) {

    const ref=collection(firestore,"customer_master");

    const handleSubmit = async (values) => {
        console.log(values);
        try {
          if (values!== 0) {
            console.log(values);
            await addDoc(ref, {...values});
            alert("Added successfully");
            handleClose();
          } else {
            alert("Error: Please check the data");
          }
        } catch (error) {
          console.error("Error adding document: ", error);
          alert("Error adding document");
        }
      };
      

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            fullname: "",
            phoneno: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.fullname) {
              errors.name = "Required";
            }
            if (!values.phoneno) {
              errors.phoneno = "Required";
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-3">
              <label htmlFor="fullname" className="form-label">
                Name
              </label>
              <Field
                type="text"
                className="form-control"
                id="fullname"
                name="fullname"
              />
              <ErrorMessage name="fullname" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneno" className="form-label">
                Phone Number
              </label>
              <Field
                type="text"
                className="form-control"
                id="phoneno"
                name="phoneno"
              />
              <ErrorMessage name="phoneno" component="div" className="text-danger" />
            </div>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default CustomerModal;
