import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import moment from 'moment';
import './index.css';
 
interface IStudent{
    id: number;
    nome: string;
    ra: string;
    data_nascimento: string;
    endereco: string;
    matriculado: boolean;
    created_at: Date;
    updated_at: Date;
}
 
const Students: React.FC = () => {
 
    const [students, setStudents] = useState<IStudent[]>([])
    const history = useHistory()
 
    useEffect(() => {
        loadStudents()
    }, [])
 
    async function loadStudents() {
        const response = await api.get('/students')
        console.log(response);
        setStudents(response.data)
    }
 
    function formatDate(date: Date){
        return moment(date).format('DD/MM/YYYY')
    }
 
    function newStudent(){
        history.push('/alunos_cadastro')
    }
 
    function editStudent(id: number){
        history.push(`/alunos_cadastro/${id}`)
    }

    function viewStudent(id: number){
        history.push(`/alunos/${id}`)
    }

    async function matriculadoStudent(id: number){
        await api.patch(`/students/${id}`)
        loadStudents()
    }

    async function deleteStudent(id: number){
        await api.delete(`/students/${id}`)
        loadStudents()
    }
 
    return (
        
        <div className="container">
            <br/>
            <div className="student-header">
                <h1>Página de Alunos</h1>
                <Button variant="dark" size="sm" onClick={newStudent}>Novo Aluno</Button>
            </div>

            <br/>
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>RA</th>
                    <th>Data de Nascimento</th>
                    <th>Endereço</th>
                    <th>Matriculado</th>
                    <th>Data de Atualização</th>
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map(student => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.nome}</td>
                                <td>{student.ra}</td>
                                <td>{student.data_nascimento}</td>
                                <td>{student.endereco}</td>
                                <td>{student.matriculado ? "Sim" : "Não" }</td>
                                <td>{formatDate(student.updated_at)}</td>
                                <td>
                                    <Button size="sm" disabled={(student.matriculado) === false} variant="primary" onClick={() => editStudent(student.id)}>Editar</Button>{' '}
                                    <Button size="sm" disabled={(student.matriculado) === false} variant="success" onClick={() => matriculadoStudent(student.id)}>Finalizar</Button>{' '}
                                    <Button size="sm" variant="warning" onClick={() => viewStudent(student.id)}>Visualizar</Button>{' '}
                                    <Button size="sm" variant="danger" onClick={() => deleteStudent(student.id)}>Remover</Button>{' '}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}
 
export default Students;



