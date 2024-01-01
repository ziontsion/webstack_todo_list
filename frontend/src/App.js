import React, { useEffect, useRef, useState } from "react";
import List from "./components/List";
import axios from "axios"
import { baseURL } from "./utils/constant";
import { Button, Col, Container, Form, Row } from "react-bootstrap"



const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      setTasks(res.data)
    });
  }, [updateUI]);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addTask = () => {
    axios.post(`${baseURL}/save`, { task: input }).then((res) => {
      console.log(res.data);
      setInput("");
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setUpdateId(id);
  };

  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateId}`, { task: input }).then((res) => {
      console.log(res.data);
      setUpdateId((prevState) => !prevState);
      setUpdateId(null);
      setInput("");
    });

  };

  const LandingPage = () => {
    return (
      <div className="landing-page">
        <Container>
          <Row className="justify-content-center align-items-center vh-100">
            <Col md={6} className="text-center">
              <h1>Welcome to my to-do App</h1>
              <p>A simple to do list application</p>
              {/* <link to="/todo"> */}
              <Button variant="success"> Get Started</Button>
              {/* </Link> */}
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  return (
    <main>

      <div className="landing-page">
        <Container>
          <Row className="justify-content-center align-items-center vh-100">
            <Col md={6} className="text-center">
              <h1>Welcome to my to-do App</h1>
              
              {/* <link to="/todo"> */}
              <Button onClick={handleClick} variant="success"> Get Started</Button>
              {/* </Link> */}
            </Col>
          </Row>
        </Container>
      </div>

      <h1 ref={ref} className='title'> To Do List </h1>

      <div className='input_holder' style={{marginBottom:20}}>
        <input type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {/* <Form.Control type="email" placeholder="name@example.com" /> */}

        <button type='submit' onClick={updateId ? updateTask : addTask}>
          {updateId ? "update task" : "Add Task"}
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <List
            key={task._id}
            id={task._id}
            task={task.task}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
      </ul>
      <div style={{marginBottom:300}}></div>
    </main>
  )
}

export default App