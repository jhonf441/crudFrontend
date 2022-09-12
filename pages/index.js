import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import "antd/dist/antd.min.css";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";

import {
  createUser,
  deleteUser,
  editUser,
  readUser,
  clearState,
  readAllUser,
} from "../slices/userSlice";
import moment from "moment";
import React, { useState, useEffect, useRef } from "react"; // useEffect para ejecutar una funcion cuando el componente se monta
import {
  PlusOutlined,
  EditOutlined,
  UserOutlined,
  IdcardOutlined,
  DeleteOutlined,
} from "@ant-design/icons"; // Importa los iconos de antd
import {
  notification,
  Space,
  Table,
  Tooltip,
  Button,
  Form,
  Input,
  InputNumber,
  Message,
  Select,
  DatePicker,
  Modal,
} from "antd"; // Importa el componente de notificaciones

export default function Home() {
  const [formEdit] = Form.useForm();
  const [formCreate] = Form.useForm();
  const dispatch = useDispatch();

  const [modalUpdate, setModalUpdate] = useState(false); // Estado del modal de actualizar
  const [modalInsertar, setmodalInsertar] = useState(false); // Estado del modal de insertar
  const { user, message, warning } = useSelector((state) => state.user);
  const [dataModal, setDataModal] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("")

  const mostrarModalEditar = (dato) => {
    formEdit.resetFields();
    setDataModal(dato);
    setModalUpdate(true);
  };

  const showModal = (id) => {
    setDeleteId(id)
    setIsModalOpen(true);
  };

  const cerrarModalEditar = () => {
    // --- cierra el modal actualizar ---
    setModalUpdate(false);
  };

  const openNotification = (type, message) => {
    notification[type]({
      message: `Notificación`,
      description: message,
      duration: 10,
      rtl: false,
      placement: "bottomRight",
    });
  };

  useEffect(() => {
    dispatch(readAllUser());
    if (message) {
      openNotification(warning ? "warning" : "success", message);
      dispatch(clearState());
    }
  }, [message]);

  useEffect(() => {
    formEdit.resetFields();
  }, [modalUpdate]);

  const handleOkEdit = () => {
    formEdit.validateFields().then((values) => {
      console.log(values);
      console.log(dataModal.id);
      values.id = dataModal.id;
      dispatch(editUser(values));
      setModalUpdate(false);
    });
  };

  const mostrarModalCrear = () => {
    formCreate.resetFields();

    setmodalInsertar(true);
  };

  const cerrarModalCrear = () => {
    setmodalInsertar(false);
  };

  // guardar edicón de un registro
  const handleOkCreate = () => {
    formCreate.validateFields().then((values) => {
      dispatch(createUser(values));
      setmodalInsertar(false);
    });
  };

  console.log(dataModal);

  useEffect(() => {
    dispatch(readAllUser());
  }, []);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      ellipsis: {
        showTitle: false,
      },
      render: (name) => (
        <Tooltip placement="topLeft" title={name}>
          {name}
        </Tooltip>
      ),
    },
    {
      title: "Identificación",
      dataIndex: "identification",
      key: "identification",

      ellipsis: {
        showTitle: false,
      },
      render: (identification) => (
        <Tooltip placement="topLeft" title={identification}>
          {identification}
        </Tooltip>
      ),
    },
    {
      title: "Fecha de nacimiento",
      dataIndex: "date",
      key: "date",

      ellipsis: {
        showTitle: false,
      },

      render: (date) => (
        <Tooltip placement="topLeft" title={moment(date).format("YYYY-MM-DD")}>
          <Space>{moment(date).format("YYYY-MM-DD")}</Space>
        </Tooltip>
      ),
    },
    {
      title: "Acción",
      key: "action",
      fixed: "right",
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="btn_editar"
            onClick={() => mostrarModalEditar(record)}
          >
            <EditOutlined className="icon_edit" />
          </Button>

          <Button
            className="btn_editar"
            onClick={()=>showModal(record.id)}
          >
            <DeleteOutlined className="icon_delete" />
          </Button>
        </Space>
      ),
    },
  ];


  const handleOkDelete = () => {
    console.log(deleteId)

    dispatch(deleteUser(deleteId))
    setIsModalOpen(false)
  }


  return (
    <>
      <Navbar />

      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div >
          <Button
            className="boton_crear"
            style={{ marginBottom: "20px" }}
            onClick={mostrarModalCrear}
          >
            <PlusOutlined />
            Nuevo
          </Button>
          {/* botón para crear nuevo registro */}
          <br />
          <br />
          {/* tabla donde se imprimen la data */}
          <div className="tabla_user">
            <Table
              columns={columns}
              dataSource={user}
              size="middle"
              scroll={{
                x: 500,
              }}
            />
            {/* fin de la tabla */}
          </div>
        </div>
        {/* modal para editar un registro */}
        <Modal
          className="modal_actualizar"
          title="Editar"
          onOk={handleOkEdit}
          onCancel={cerrarModalEditar}
          open={modalUpdate}
          okText="Guardar datos"
          cancelText="Cancelar"
        >
          <Form
            form={formEdit}
            layout="vertical"
            name="form_in_modal"
            initialValues={{
              date: moment(dataModal.date),
              identification: dataModal.identification,
              name: dataModal.name,
            }}
          >
            <Form.Item
              label="Nombre"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Ingrese el nombre",
                },
              ]}
              hasFeedback
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label="Fecha de nacimiento"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Ingrese la fecha de nacimiento",
                },
              ]}
              hasFeedback
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label="Identificación"
              name="identification"
              rules={[
                {
                  required: true,
                  message: "Ingrese su número de identificación",
                },
              ]}

              // hasFeedback
            >
              <InputNumber
                prefix={<IdcardOutlined />}
                style={{ width: "37%" }}
              />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          className="modal_insertar"
          title="Crear"
          onOk={handleOkCreate}
          onCancel={cerrarModalCrear}
          open={modalInsertar}
          okText="Guardar datos"
          cancelText="Cancelar"
        >
          <Form form={formCreate} layout="vertical" name="form_in_modal">
            <Form.Item
              label="Nombre"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Ingrese el nombre",
                },
              ]}
              hasFeedback
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label="Fecha de nacimiento"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Ingrese la fecha de nacimiento",
                },
              ]}
              hasFeedback
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label="Identificación"
              name="identification"
              rules={[
                {
                  required: true,
                  message: "Ingrese su número de identificación",
                },
              ]}

              // hasFeedback
            >
              <InputNumber
                prefix={<IdcardOutlined />}
                style={{ width: "37%" }}
              />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Eliminar"
          open={isModalOpen}
          onOk={handleOkDelete}
          onCancel={()=>  setIsModalOpen(false)}
        >
          Desea eleiminar este usuario?
        </Modal>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}
