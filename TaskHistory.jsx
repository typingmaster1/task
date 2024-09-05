// import React, { useEffect, useState } from 'react';
// import { Layout, Row, Col, Card, Form, Input, Button, Select, Typography, List } from 'antd';
// import { db } from '../module/AuthenticationFirebase';
// import { collection, addDoc, deleteDoc, doc, query, onSnapshot } from "firebase/firestore";

// const { Content } = Layout;
// const { Text } = Typography;
// const { Option } = Select;

// const TaskHistory = () => {
//   const [todo, setTodo] = useState('');
//   const [status, setStatus] = useState('');
//   const [dicp, setDicp] = useState('');
//   const [tasks, setTasks] = useState([]);
//   const [history, setHistory] = useState([]);

//   const handleChange = (value) => {
//     setStatus(value);
//   };

//   const addData = async (values) => {
//     try {
//       const docRef = await addDoc(collection(db, "users"), {
//         task: values.todo,
//         status: values.status,
//         dicp: values.dicp,
//       });

//       // Log to history
//       await addDoc(collection(db, "history"), {
//         taskId: docRef.id,
//         task: values.todo,
//         status: values.status,
//         dicp: values.dicp,
//         action: "Added",
//         timestamp: new Date(),
//       });

//       console.log("Document written with ID: ", docRef.id);
//       setTodo('');
//       setDicp('');
//       setStatus('');
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//   };

//   const deleteTask = async (taskId) => {
//     try {
//       await deleteDoc(doc(db, "users", taskId));

//       // Log to history
//       await addDoc(collection(db, "history"), {
//         taskId: taskId,
//         action: "Deleted",
//         timestamp: new Date(),
//       });

//       console.log("Document successfully deleted!");
//     } catch (e) {
//       console.error("Error removing document: ", e);
//     }
//   };

//   useEffect(() => {
//     const getData = async () => {
//       const q = query(collection(db, 'users'));

//       const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         const users = [];
//         querySnapshot.forEach((doc) => {
//           users.push({ id: doc.id, ...doc.data() });
//         });
//         setTasks(users);
//         console.log('Current tasks: ', users);
//       });

//       return () => unsubscribe();
//     };

//     const getHistory = async () => {
//       const q = query(collection(db, 'history'));

//       const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         const historyLogs = [];
//         querySnapshot.forEach((doc) => {
//           historyLogs.push(doc.data());
//         });
//         setHistory(historyLogs);
//         console.log('Task history: ', historyLogs);
//       });

//       return () => unsubscribe();
//     };

//     getData();
//     getHistory();
//   }, []);

//   const filterTasksByStatus = (status) => {
//     return tasks.filter(task => task.status === status);
//   };

//   // Define colors for each status
//   const statusColors = {
//     'To Do': '#FF0000',       // Light grey
//     'In Progress': '#e6f7ff',  // Light blue
//     'Completed': '#d9f7be'     // Light green
//   };

//   return (
//     <Layout style={{ padding: '24px' }}>
//       <Content>
//         {/* Top Section */}
//         <Card title="Add New Task" bordered={false} style={{ marginBottom: '24px', border: '1px solid #d9d9d9' }}>
//           <Form layout="vertical" onFinish={addData}>
//             <Form.Item
//               label="Enter a todo"
//               name="todo"
//               rules={[{ required: true, message: 'Please input your task!' }]}
//             >
//               <Input value={todo} onChange={e => setTodo(e.target.value)} />
//             </Form.Item>
//             <Form.Item
//               label="Description"
//               name="dicp"
//               rules={[{ required: true, message: 'Please input the description!' }]}
//             >
//               <Input value={dicp} onChange={e => setDicp(e.target.value)} />
//             </Form.Item>
//             <Form.Item
//               label="Select a status"
//               name="status"
//               rules={[{ required: true, message: 'Please select a status!' }]}
//             >
//               <Select value={status} onChange={handleChange}>
//                 <Option value="To Do">To Do</Option>
//                 <Option value="In Progress">In Progress</Option>
//                 <Option value="Completed">Completed</Option>
//               </Select>
//             </Form.Item>
//             <Form.Item>
//               <Button type="primary" htmlType="submit">Add Todo</Button>
//             </Form.Item>
//           </Form>
//         </Card>

//         {/* Task Sections */}
//         <Row gutter={16}>
//           {['To Do', 'In Progress', 'Completed'].map(status => (
//             <Col span={8} key={status}>
//               <Card
//                 title={status}
//                 bordered
//                 style={{ 
//                   marginBottom: '16px', 
//                   border: '1px solid #d9d9d9',
//                   borderRadius: '4px', // Consistent border radius
//                   minHeight: '300px',
//                   backgroundColor: statusColors[status] // Apply color based on status
//                 }}
//               >
//                 {filterTasksByStatus(status).length > 0 ? (
//                   filterTasksByStatus(status).map((task) => (
//                     <Card 
//                       key={task.id} 
//                       style={{ 
//                         marginBottom: '12px', 
//                         border: '1px solid #d9d9d9',
//                         borderRadius: '4px' // Consistent border radius
//                       }}
//                     >
//                       <Text strong>Name: </Text>{task.task}<br />
//                       <Text>Desc: {task.dicp}</Text><br />
//                       <Button danger onClick={() => deleteTask(task.id)}>Delete</Button>
//                     </Card>
//                   ))
//                 ) : (
//                   <Text>No tasks available</Text> // Placeholder text when there are no tasks
//                 )}
//               </Card>
//             </Col>
//           ))}
//         </Row>

//         {/* History Section */}
//         <Card 
//           title="Task History" 
//           bordered={false} 
//           style={{ 
//             marginTop: '24px', 
//             border: '1px solid #d9d9d9',
//             borderRadius: '4px',
//             minHeight: '300px' // Ensuring a minimum height for consistency
//           }}
//         >
//           <List
//             dataSource={history}
//             renderItem={(entry) => (
//               <List.Item>
//                 <List.Item.Meta
//                   title={`Task ID: ${entry.task || 'N/A'}`}
//                   description={`Action: ${entry.action} | Timestamp: ${new Date(entry.timestamp.toDate()).toLocaleString()} | Description: ${entry.dicp || 'N/A'}`}
//                 />
//               </List.Item>
//             )}
//           />
//         </Card>
//       </Content>
//     </Layout>
//   );
// };

// export default TaskHistory;



import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Card, Form, Input, Button, Select, Typography, List } from 'antd';
import { db } from '../module/AuthenticationFirebase';
import { collection, addDoc, deleteDoc, doc, query, onSnapshot } from "firebase/firestore";

const { Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

const TaskHistory = () => {
  const [todo, setTodo] = useState('');
  const [status, setStatus] = useState('');
  const [dicp, setDicp] = useState('');
  const [tasks, setTasks] = useState([]);
  const [history, setHistory] = useState([]);

  const handleChange = (value) => {
    setStatus(value);
  };

  const addData = async (values) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        task: values.todo,
        status: values.status,
        dicp: values.dicp,
      });

      // Log to history
      await addDoc(collection(db, "history"), {
        taskId: docRef.id,
        task: values.todo,
        status: values.status,
        dicp: values.dicp,
        action: "Added",
        timestamp: new Date(),
      });

      console.log("Document written with ID: ", docRef.id);
      setTodo('');
      setDicp('');
      setStatus('');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "users", taskId));

      // Log to history
      await addDoc(collection(db, "history"), {
        taskId: taskId,
        action: "Deleted",
        timestamp: new Date(),
      });

      console.log("Document successfully deleted!");
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  };

  const deleteHistory = async (historyId) => {
    try {
      await deleteDoc(doc(db, "history", historyId));
      console.log("History document successfully deleted!");
    } catch (e) {
      console.error("Error removing history document: ", e);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const q = query(collection(db, 'users'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
        setTasks(users);
        console.log('Current tasks: ', users);
      });

      return () => unsubscribe();
    };

    const getHistory = async () => {
      const q = query(collection(db, 'history'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const historyLogs = [];
        querySnapshot.forEach((doc) => {
          historyLogs.push({ id: doc.id, ...doc.data() });
        });
        setHistory(historyLogs);
        console.log('Task history: ', historyLogs);
      });

      return () => unsubscribe();
    };

    getData();
    getHistory();
  }, []);

  const filterTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  // Define colors for each status
  const statusColors = {
    'To Do': '#FF0000',       // Red
    'In Progress': '#e6f7ff',  // Light blue
    'Completed': '#d9f7be'     // Light green
  };

  return (
    <Layout style={{ padding: '24px' }}>
      <Content>
        {/* Top Section */}
        <Card title="Add New Task" bordered={false} style={{ marginBottom: '24px', border: '1px solid #d9d9d9' }}>
          <Form layout="vertical" onFinish={addData}>
            <Form.Item
              label="Enter a todo"
              name="todo"
              rules={[{ required: true, message: 'Please input your task!' }]}
            >
              <Input value={todo} onChange={e => setTodo(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Description"
              name="dicp"
              rules={[{ required: true, message: 'Please input the description!' }]}
            >
              <Input value={dicp} onChange={e => setDicp(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Select a status"
              name="status"
              rules={[{ required: true, message: 'Please select a status!' }]}
            >
              <Select value={status} onChange={handleChange}>
                <Option value="To Do">To Do</Option>
                <Option value="In Progress">In Progress</Option>
                <Option value="Completed">Completed</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Add Todo</Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Task Sections */}
        <Row gutter={16}>
          {['To Do', 'In Progress', 'Completed'].map(status => (
            <Col span={8} key={status}>
              <Card
                title={status}
                bordered
                style={{ 
                  marginBottom: '16px', 
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px', // Consistent border radius
                  minHeight: '300px',
                  backgroundColor: statusColors[status] // Apply color based on status
                }}
              >
                {filterTasksByStatus(status).length > 0 ? (
                  filterTasksByStatus(status).map((task) => (
                    <Card 
                      key={task.id} 
                      style={{ 
                        marginBottom: '12px', 
                        border: '1px solid #d9d9d9',
                        borderRadius: '4px' // Consistent border radius
                      }}
                    >
                      <Text strong>Name: </Text>{task.task}<br />
                      <Text>Desc: {task.dicp}</Text><br />
                      <Button danger onClick={() => deleteTask(task.id)}>Delete</Button>
                    </Card>
                  ))
                ) : (
                  <Text>No tasks available</Text> // Placeholder text when there are no tasks
                )}
              </Card>
            </Col>
          ))}
        </Row>

        {/* History Section */}
        <Card 
          title="Task History" 
          bordered={false} 
          style={{ 
            marginTop: '24px', 
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            minHeight: '300px' // Ensuring a minimum height for consistency
          }}
        >
          <List
            dataSource={history}
            renderItem={(entry) => (
              <List.Item
                actions={[
                  <Button type="link" danger onClick={() => deleteHistory(entry.id)}>Delete</Button>
                ]}
              >
                <List.Item.Meta
                  title={`Task ID: ${entry.task || 'N/A'}`}
                  description={`Action: ${entry.action} | Timestamp: ${new Date(entry.timestamp.toDate()).toLocaleString()} | Description: ${entry.dicp || 'N/A'}`}
                />
              </List.Item>
            )}
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default TaskHistory;
