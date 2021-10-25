import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
import './index.css';
import { useHistory, useParams } from 'react-router-dom';
 
interface IStudent{
    nome: string;
    ra: string;
    data_nascimento: string;
    endereco: string;
}
 
const Students: React.FC = () => {
    
    const history = useHistory()
    const { id } = useParams<{ id: string }>()
 
    const [model, setModel] = useState<IStudent>({
        nome: '',
        ra: '',
        data_nascimento:'',
        endereco:''
    })
 
    useEffect(() => {
        console.log(id)
        if (id !== undefined) {
            findStudent(id)
        }
    }, [id])
 
    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }
 
    async function onSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault()
 
        if (id !== undefined) {
            const response = await api.put(`/students/${id}`, model)
        }
        else{
            const response = await api.post('/students', model)
        }
        back()
    }
 
    function back(){
        history.goBack()
    }
 
    async function findStudent(id: string){
        const response = await api.get(`students/${id}`)
        console.log(response)
        setModel({
            nome: response.data.nome,
            ra: response.data.ra,
            data_nascimento: response.data.data_nascimento,
            endereco: response.data.endereco
        })
    }
 
    return (
        
        <div className="container">
            <br />
            <div className="student-header">
                <h1>Novo Aluno</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br />
            <div className="container">
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            name="nome"
                            value={model.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>
 
                    <Form.Group>
                        <Form.Label>RA</Form.Label>
                        <Form.Control
                            type="text"
                            name="ra"
                            value={model.ra}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Data Nascimento</Form.Label>
                        <Form.Control
                            type="text"
                            name="data_nascimento"
                            value={model.data_nascimento}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control
                            type="text"
                            name="endereco"
                            value={model.endereco}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>
 
                    <Button variant="dark" type="submit">
                        Salvar
                    </Button>
                </Form>
            </div>
        </div>
    );
}
 
export default Students;
