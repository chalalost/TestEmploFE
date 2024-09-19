import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { createProduct, deleteProduct, getAllProduct, updateProduct, getDetailProduct } from './TestDataService';

interface Product {
    id: number;
    name: string;
    price: number;
}

const modalType = {
    CREATE: 1,
    UPDATE: 2
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedItem, setSelectedItem] = useState({ id: 0, name: '', price: 0 });
    const [idEdit, setIdEdit] = useState<number>(0);
    const [modalStatus, setModalStatus] = useState(modalType.CREATE);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await getAllProduct();
        if (typeof response !== 'string') {
            setProducts(response);
        }
    };

    const handleAddProduct = async () => {
        await createProduct(selectedItem);
        setShowModal(false);
        fetchProducts();
    };

    const handleUpdateProduct = async (id: number) => {
        const updatedProduct = { ...selectedItem, id };
        await updateProduct(id, updatedProduct);
        setShowModal(false);
        fetchProducts();
    };

    const handleGetDetail = async (id: number) => {
        var res = await getDetailProduct(id);
        if (typeof res !== 'string') {
            setSelectedItem(res)
        }
    }

    const handleSave = () => {
        if (modalStatus == modalType.CREATE) {
            handleAddProduct()
        }
        else {
            handleUpdateProduct(idEdit);
        }
    };

    const handleDelete = async (id: number) => {
        await deleteProduct(id);
        fetchProducts();
    };

    const onClickCreate = () => {
        setModalStatus(modalType.CREATE)
        setShowModal(true)
        setSelectedItem({ id: 0, name: '', price: 0 })
    }

    const onClickEdit = async (item: number) => {
        setModalStatus(modalType.UPDATE)
        setShowModal(true);
        setIdEdit(item);
        handleGetDetail(item)
    };

    return (
        <div className="container mt-5">
            <h1>Dashboard</h1>
            <Form className="mb-3">
                <Button className="mt-2" onClick={onClickCreate}>
                    Create Item
                </Button>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>
                                <Button variant="info" className="me-2" onClick={() => {
                                    onClickEdit(item.id)
                                }}>
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => {
                setShowModal(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedItem.name}
                                onChange={e => setSelectedItem({ ...selectedItem, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={selectedItem.price}
                                onChange={e => setSelectedItem({ ...selectedItem, price: parseFloat(e.target.value) })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Products;