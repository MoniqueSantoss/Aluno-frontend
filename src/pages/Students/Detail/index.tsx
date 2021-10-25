import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom'
import './index.css';
import api from '../../../services/api';
import moment from 'moment';

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
 
const Detail: React.FC = () => {

    const history = useHistory()
    const { id } = useParams<{ id: string }>()
    const [student, setStudent] = useState<IStudent>()
 
    function back(){
        history.goBack()
    }
 
    async function findStudent(){
        const response = await api.get(`/students/${id}`)
        console.log(response)
        setStudent(response.data)
    }

  // Quando o param "id" mudar/receber um novo valor, o useEffect será executado chamando o findTask
   
  useEffect(() => {
        findStudent()
    }, [id])
 
    return (
        <div className="container">
            <br />
            <div className="student-header">
                <h1>Detalhes Sobre o Aluno</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br />
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{student?.nome}</Card.Title>
                    
                    <Card.Text>
                    <strong>RA: </strong>
                    {student?.ra}
                    <br/>
                    <strong>Data de Nascimento: </strong>
                    {student?.data_nascimento}
                    <br/>
                    <strong>Endereço: </strong>
                    {student?.endereco}
                    <br/>
                    <strong>Matriculado: </strong>
                    {student?.matriculado ? "Sim" : "Não"}
                    <br />
                    <strong>Data de Cadastro: </strong>
                    {moment(student?.created_at).format('DD/MM/YYYY')}
                    <br />
                    <strong>Data de Atualização: </strong>
                    {moment(student?.updated_at).format('DD/MM/YYYY')}
                    </Card.Text>
                </Card.Body>
            </Card>

        </div>
    );
}
 
export default Detail;