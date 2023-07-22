import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Modal, Row, Col, Container } from "react-bootstrap";
import { firestore } from "../config/firestore";
import { addDoc, collection } from "@firebase/firestore";

function CustomerModal({ open, handleClose }) {
  const ref = collection(firestore, "customer_master");

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    try {
      if (values !== 0) {
        console.log(values);
        await addDoc(ref, { ...values });
        alert("Added successfully");
        handleClose();
      } else {
        alert("Error: Please check the data");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding document");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Formik
            initialValues={{
              fullname: "",
              phoneno: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.fullname) {
                errors.fullname = "Required";
              }
              if (!values.phoneno) {
                errors.phoneno = "Required";
              }
              return errors;
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Row className="mb-3">
                  <Col>
                    <label htmlFor="fullname" className="form-label">
                      Name
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="fullname"
                      name="fullname"
                    />
                    <ErrorMessage
                      name="fullname"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <label htmlFor="phoneno" className="form-label">
                      Phone Number
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="phoneno"
                      name="phoneno"
                    />
                    <ErrorMessage
                      name="phoneno"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col xs={6} md={4} lg={3}>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-100"
                    >
                      Add
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default CustomerModal;
