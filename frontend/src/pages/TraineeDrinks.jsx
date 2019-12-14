import React, { Fragment, Component } from 'react';
import Empty from './Empty';
import Load from './Load';
import style from '../style/Drinks.module.css';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';

import { FaWineBottle } from 'react-icons/fa';

class Drinks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            bars: [],
            drinks: [],
            isLoaded: false
        };
    }

    componentDidMount() {
        let token = localStorage.getItem("accessToken");
        fetch(`api/cohort/getCohortForUser?user_id=${this.props.id}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if(response.status !== 200) {
                return null;
            }
            return response.json().then(
                data => {
                    if(data !== null) {
                        this.setState({
                            bars: data,
                        })
                        return data;
                    }
                    return null;
                }
            )
        })
        .then(bars => {
            if(bars !== null && bars.length) {
                let processed = 0;
                bars.forEach((bar) => {
                    fetch(`api/cohort/getDrinks?cohort_id=${bar.cohort.id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer '+ token,
                        }
                    })
                    .then(response => {
                        console.log(response);
                        if(response.status !== 200) {
                            return null;
                        }
                        return response.json().then(data => {
                            if(data !== null) {
                                data.bar = bar;
                                this.setState({
                                    drinks: [...this.state.drinks, data],
                                })
                                processed++;
                                if(processed === bars.length) {
                                    this.callback();
                                }
                            }
                            else {
                                this.setState({
                                    isLoaded: true
                                })
                            }
                        })
                    })
                    
                })
            }
            else {
                this.setState({
                    isLoaded: true,
                })
            }
        })
    }

    callback = () => {
        this.setState({
            isLoaded: true
        })
    }

    handleShow = () => {this.setState({show: true})}

    handleClose = () => {this.setState({show: false})}

    render() {
        let show = this.state.show;
        let empty = null;
        let drinksList = []
        let isLoaded = this.state.isLoaded
        let drinks = this.state.drinks;
        console.log(drinks)

        drinks.forEach((el) => {
            el.forEach((drink) => {
                drinksList.push(
                    <Col key={drink.drink.id} sm={3}>
                        <Card className={style.card}>
                            <Image src={`data:image/png;base64,${drink.file}`} fluid />
                            <div className={style.cardContentDiv}>
                                <h5>{drink.drink.name[0].toUpperCase() + drink.drink.name.slice(1)}</h5>
                                <p>{el.bar.cohort.name}</p>
                            </div>
    
                            <Button variant="dark" onClick={() => this.props.play(drink.drink.id, drink.drink)} className={style.editDrink}>
                                <div className={style.barButtonsDiv}>
                                    <FaWineBottle />
                                    <span className={style.buttonText}>Start</span>
                                </div>
                            </Button>
                        </Card>
                    </Col>
                )
            }) 
            
        })

        if(!drinksList.length) {
            empty = (
                <div className={style.emptyDiv}>
                    <Empty/>
                    <h5>No Data</h5>
                </div>
            )
        }

        if(!isLoaded) {
            return (
                <Fragment>
                    <Row className={style.titleContainer}>
                        <div className={style.titleDiv}>
                            <h3>Drinks</h3>
                        </div>
                    </Row>
                        <Load/>
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <Row className={style.titleContainer}>
                            <div className={style.titleDiv}>
                                <h3>Drinks</h3>
                            </div>
                        </Row>
        
                        <Row className={style.contentContainer}>
                            <div className={style.contentDiv}>
                                <div>
                                    <h4>Your Assigned Drinks</h4>
                                </div>
                                <Row>
                                    {drinksList}
                                </Row>
                                {empty}
                            </div>
                        </Row>
                </Fragment>
            );
        }
    }
}

export default Drinks;
