import React, { Fragment, Component } from 'react';
import StepCards from './StepCards'
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

import { FaTrashAlt } from 'react-icons/fa';

let step = 0

class Drinks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            showIngredient: false,
            showEquipment: false,
            drinks: [],
            isLoaded: false,
            steps: [],
            stepObjects: [],
            games: [],
            units: [],
            ingredients: [],
            equipment: [],
            userIngredients: [],
            userEquipment: [],
        };
    }

    componentDidMount() {
        let token = localStorage.getItem("accessToken");
        let id = this.props.id;
        fetch(`api/drink/viewUserDrinks`, {
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
            return response.json()
            .then(
                data => {
                    if(data !== null) {
                        this.setState({
                            drinks: data
                        })
                        // return data;
                    }
                    // return null;
                }
            )
        })
        .then(() => {
            fetch(`api/equipment/viewAllEquipment`, {
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
                                equipment: data
                            })
                        }
                    }
                )
            })
        })
        .then(() => {
            fetch(`api/equipment/viewAllIngredients`, {
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
                                ingredients: data
                            })
                        }
                    }
                )
            })
        })
        .then(() => {
            fetch(`api/actions/getActions`, {
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
                                games: data,
                            })
                        }
                    }
                )
            })
        })
        .then(() => {
            fetch(`api/equipment/viewUnits`, {
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
                                units: data,
                            })
                        }
                    }
                )
            })
        })
        .then(() => {
            fetch(`api/equipment/viewUserEquipment`, {
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
                                userEquipment: data
                            })
                            return data
                        }
                        return null
                    }
                )
            })
            .then(equipment => {
                if(equipment !== null && equipment.length) {
                    let processed = 0;
                    equipment.forEach((equipment) => {
                        equipment.showDelete = false;
                        processed++;
                        if(processed === equipment.length) {
                            this.callbackEquipment(equipment);
                        }
                    })
                }
            })
        })
        .then(() => {
            fetch(`api/equipment/viewUserIngredients`, {
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
                                userIngredients: data
                            })
                            return data
                        }
                        return null
                    }
                )
            })
            .then(ingredients => {
                if(ingredients !== null && ingredients.length) {
                    let processed = 0;
                    ingredients.forEach((ingredient) => {
                        ingredient.showDelete = false;
                        processed++;
                        if(processed === ingredients.length) {
                            this.callbackIngredients(ingredients);
                        }
                    })
                }
            })
        })
        .then(() => {
            this.setState({
                isLoaded: true,
            })
        })
    }

    callback = (drinks) => {
        this.setState({
            drinks: drinks,
        })
    }

    callbackEquipment = (equipment) => {
        this.setState({
            equipment: equipment,
        })
    }

    callbackIngredients = (ingredients) => {
        this.setState({
            ingredients: ingredients,
        })
    }

    updateView = () => {
        let token = localStorage.getItem("accessToken");
        let id = this.props.id;
        fetch(`api/drink/viewUserDrinks`, {
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
            return response.json()
            .then(
                data => {
                    if(data !== null) {
                        this.setState({
                            drinks: data
                        })
                        // return data;
                    }
                    // return null;
                }
            )
        })
        .then(() => {
            fetch(`api/equipment/viewAllEquipment`, {
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
                                equipment: data
                            })
                        }
                    }
                )
            })
        })
        .then(() => {
            fetch(`api/equipment/viewAllIngredients`, {
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
                                ingredients: data
                            })
                        }
                    }
                )
            })
        })
        .then(() => {
            fetch(`api/actions/getActions`, {
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
                                games: data,
                            })
                        }
                    }
                )
            })
        })
        .then(() => {
            fetch(`api/equipment/viewUnits`, {
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
                                units: data,
                            })
                        }
                    }
                )
            })
        })
        .then(() => {
            fetch(`api/equipment/viewUserEquipment`, {
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
                                userEquipment: data
                            })
                            return data
                        }
                        return null
                    }
                )
            })
            .then(equipment => {
                if(equipment !== null && equipment.length) {
                    let processed = 0;
                    equipment.forEach((equipment) => {
                        equipment.showDelete = false;
                        processed++;
                        if(processed === equipment.length) {
                            this.callbackEquipment(equipment);
                        }
                    })
                }
            })
        })
        .then(() => {
            fetch(`api/equipment/viewUserIngredients`, {
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
                                userIngredients: data
                            })
                            return data
                        }
                        return null
                    }
                )
            })
            .then(ingredients => {
                if(ingredients !== null && ingredients.length) {
                    let processed = 0;
                    ingredients.forEach((ingredient) => {
                        ingredient.showDelete = false;
                        processed++;
                        if(processed === ingredients.length) {
                            this.callbackIngredients(ingredients);
                        }
                    })
                }
            })
        })
        .then(() => {
            this.setState({
                isLoaded: true,
            })
        })
    }

    handleSubmit = (event) => {
        let token = localStorage.getItem("accessToken");
        let form = event.target;
        let file = form.elements.image.files[0];
        let stepcards = this.state.steps;

        let steps = []
        stepcards.forEach((el, index) => {
            if(form[`ingredient${index}`].options[form[`ingredient${index}`].selectedIndex].id == -1
                && form[`equipment${index}`].options[form[`equipment${index}`].selectedIndex].id == -1) {
                    steps.push({
                        step_number: index,
                        description: form[`stepDescription${index}`].value,
                        action: form[`action${index}`].options[form[`action${index}`].selectedIndex].text,
                        image_path: "",
                        equipmentSet: [],
                    })
            }
            else if(form[`ingredient${index}`].options[form[`ingredient${index}`].selectedIndex].id == -1
            && form[`equipment${index}`].options[form[`equipment${index}`].selectedIndex].id != -1) {
                steps.push({
                    step_number: index,
                    description: form[`stepDescription${index}`].value,
                    action: form[`action${index}`].options[form[`action${index}`].selectedIndex].text,
                    image_path: "",
                    equipmentSet: [
                        {
                            equipment: {
                                id: form[`ingredient${index}`].options[form[`ingredient${index}`].selectedIndex].id,
                                name: form[`ingredient${index}`].options[form[`ingredient${index}`].selectedIndex].text,
                                image_path: "",
                                type: "INGREDIENT",
                            },
                            quantity: form[`amount${index}`].value,
                            unit: form[`unit${index}`].options[form[`unit${index}`].selectedIndex].text
                        },
                    ],
                })
            }
            else if(form[`ingredient${index}`].options[form[`ingredient${index}`].selectedIndex].id != -1
            && form[`equipment${index}`].options[form[`equipment${index}`].selectedIndex].id == -1) {
                steps.push({
                    step_number: index,
                    description: form[`stepDescription${index}`].value,
                    action: form[`action${index}`].options[form[`action${index}`].selectedIndex].text,
                    image_path: "",
                    equipmentSet: [
                        {
                            equipment: {
                                id: form[`equipment${index}`].options[form[`equipment${index}`].selectedIndex].id,
                                name: form[`equipment${index}`].options[form[`equipment${index}`].selectedIndex].text,
                                image_path: "",
                                type: "EQUIPMENT",
                            },
                            quantity: form[`amount${index}`].value,
                            unit: form[`unit${index}`].options[form[`unit${index}`].selectedIndex].text
                        },
                    ],
                })
            }
            else {
                steps.push({
                    step_number: index,
                    description: form[`stepDescription${index}`].value,
                    action: form[`action${index}`].options[form[`action${index}`].selectedIndex].text,
                    image_path: "",
                    equipmentSet: [
                        {
                            equipment: {
                                id: form[`ingredient${index}`].options[form[`ingredient${index}`].selectedIndex].id,
                                name: form[`ingredient${index}`].options[form[`ingredient${index}`].selectedIndex].text,
                                image_path: "",
                                type: "INGREDIENT",
                            },
                            quantity: form[`amount${index}`].value,
                            unit: form[`unit${index}`].options[form[`unit${index}`].selectedIndex].text
                        },
                        {
                            equipment: {
                                id: form[`equipment${index}`].options[form[`equipment${index}`].selectedIndex].id,
                                name: form[`equipment${index}`].options[form[`equipment${index}`].selectedIndex].text,
                                image_path: "",
                                type: "EQUIPMENT",
                            },
                            quantity: form[`amount${index}`].value,
                            unit: form[`unit${index}`].options[form[`unit${index}`].selectedIndex].text
                        }
                    ],
                })
            }
        })

        const drink = {
            name: form.name.value,
            description: form.description.value,
            steps: steps,
        }

        const blob = new Blob([JSON.stringify(drink)], {
            type: 'application/json'
        });

        let data = new FormData();
        data.append('file', file);
        data.append('drink', blob);

        fetch('api/drink/addDrink', {
            method: 'POST',
            body: data,
            headers: {
                'Authorization': 'Bearer '+ token,
            }
        })
        .then(response => {
            console.log(response)
        })
        .then(() => {
            // this.setState({isLoaded: false});
            // this.handleClose();
            // this.updateView();
        })

        step = 0;

        event.preventDefault();
    }

    handleShow = () => {this.setState({show: true})}

    handleClose = () => {this.setState({show: false})}

    handleDeleteIngredientShow = (id) => {
        this.setState({
            userIngredients: this.state.userIngredients.map(el => (el.equipment.id === id ? {...el, showDelete: true} : el))
        });
    }

    handleDeleteIngredientClose = (id) => {
        this.setState({
            userIngredients: this.state.userIngredients.map(el => (el.equipment.id === id ? {...el, showDelete: false} : el))
        });
    }

    handleDeleteEquipmentShow = (id) => {
        this.setState({
            userEquipment: this.state.userEquipment.map(el => (el.equipment.id === id ? {...el, showDelete: true} : el))
        });
    }

    handleDeleteEquipmentClose = (id) => {
        this.setState({
            userEquipment: this.state.userEquipment.map(el => (el.equipment.id === id ? {...el, showDelete: false} : el))
        });
    }

    handleDeleteIngredient = (id) => {
        let token = localStorage.getItem("accessToken");
        fetch(`api/equipment/deleteEquipment?equipment_id=${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer '+ token,
            }
        })
        .then(response => {})
        .then(() => {
            this.setState({isLoaded: false});
            this.updateView();
            this.handleDeleteIngredientClose(id);
        })
    }

    handleDeleteEquipment = (id) => {
        let token = localStorage.getItem("accessToken");
        fetch(`api/equipment/deleteEquipment?equipment_id=${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer '+ token,
            }
        })
        .then(response => {})
        .then(() => {
            this.setState({isLoaded: false});
            this.updateView();
            this.handleDeleteEquipmentClose(id);
        })
    }

    handleSubmitIngredient = (event) => {
        let token = localStorage.getItem("accessToken");
        let form = event.target;
        let file = form.elements.image.files[0];
        let typeval;

        if(form.elements.type[0].checked === true) {
            typeval = true
        }
        else {
            typeval = false
        }

        const ingredient = {
            name: form.elements.name.value,
            description: "",
            isPublic: typeval,
            image_path: "",
            type: "INGREDIENT"
        };

        const blob = new Blob([JSON.stringify(ingredient)], {
            type: 'application/json'
        });

        let data = new FormData();
        data.append('file', file);
        data.append('equipment', blob);

        fetch('api/equipment/addEquipment', {
            method: 'POST',
            body: data,
            headers: {
                'Authorization': 'Bearer '+ token,
            }
        })
        .then(response => {})
        .then(() => {
            this.setState({isLoaded: false});
            this.updateView();
            this.handleCloseIngredient();
        })

        event.preventDefault();
    }

    handleShowIngredient = () => {this.setState({showIngredient: true})}

    handleCloseIngredient = () => {this.setState({showIngredient: false})}

    handleSubmitEquipment = (event) => {
        let token = localStorage.getItem("accessToken");
        let form = event.target;
        let file = form.elements.image.files[0];
        let typeval;

        if(form.elements.type[0].checked === true) {
            typeval = true
        }
        else {
            typeval = false
        }

        const ingredient = {
            name: form.elements.name.value,
            description: "",
            isPublic: typeval,
            image_path: "",
            type: "EQUIPMENT"
        };

        const blob = new Blob([JSON.stringify(ingredient)], {
            type: 'application/json'
        });

        let data = new FormData();
        data.append('file', file);
        data.append('equipment', blob);

        fetch('api/equipment/addEquipment', {
            method: 'POST',
            body: data,
            headers: {
                'Authorization': 'Bearer '+ token,
            }
        })
        .then(response => {})
        .then(() => {
            this.setState({isLoaded: false});
            this.updateView();
            this.handleCloseEquipment();
        })

        event.preventDefault();
    }

    handleShowEquipment = () => {this.setState({showEquipment: true})}

    handleCloseEquipment = () => {this.setState({showEquipment: false})}

    addStep = () => {
        this.setState({
            steps: [
                ...this.state.steps,
                <StepCards key={step} id={step++} ingredients={this.state.ingredients} equipment={this.state.equipment} games={this.state.games} add={this.addToStepObjects} units={this.state.units}/>
            ]
        });
    }

    deleteStep = () => {
        if(this.state.steps.length > 0) {
            let arr = [...this.state.steps];
            console.log(arr)
            arr.pop();
            console.log(arr)
            step--;
            this.setState({
                steps: arr,
            });
        }
    }

    addToStepObjects = (obj) => {
        console.log("lol")
    }

    handleChange = () => {}

    render() {
        let show = this.state.show;
        let showIngredient = this.state.showIngredient;
        let showEquipment = this.state.showEquipment;
        let empty = null;
        let ingredientsEmpty = null;
        let equipmentEmpty = null;
        let isLoaded = this.state.isLoaded;
        let drinksList = []
        let ingredientsList = []
        let equipmentList = []
        let drinks = this.state.drinks;
        let userIngredients = this.state.userIngredients;
        let userEquipment = this.state.userEquipment;
        let games = this.state.games

        console.log(this.state.drinks)

        if(drinks.length) {
            drinks.sort((a, b) => (a.drink.name > b.drink.name) ? 1 : -1);
            drinks.forEach(el =>
                drinksList.push(
                    <Col key={el.drink.id} sm={3}>
                        <Card className={style.card}>
                            <Image src={`data:image/png;base64,${el.file}`} fluid />
                            <div className={style.cardContentDiv}>
                                <h5>{el.drink.name[0].toUpperCase() + el.drink.name.slice(1)}</h5>
                            </div>
                            {/* <Button variant="dark" onClick={() => this.handleDeleteIngredientShow(el.equipment.id)}>
                                <div className={style.barButtonsDiv}>
                                    <FaTrashAlt/>
                                    <span className={style.buttonText}>Delete</span>
                                </div>
                            </Button> */}

                            {/* <Modal show={el.showDelete} onHide={() => this.handleDeleteIngredientClose(el.equipment.id)} centered dialogClassName={style.deleteModal}>
                                <Modal.Header className={style.deleteHeader}>
                                    <Modal.Title>Are you sure you want to delete {el.equipment.name}?</Modal.Title>
                                </Modal.Header>

                                <Modal.Body className={style.deleteModalButtons}>
                                    <Button variant="danger" className={style.deleteButton} onClick={() => this.handleDeleteIngredient(el.equipment.id)}>
                                        Delete
                                    </Button>
                                    <Button variant="primary" onClick={() => this.handleDeleteIngredientClose(el.equipment.id)} className={style.returnButton}>
                                        Return
                                    </Button>
                                </Modal.Body>
                            </Modal> */}
                        </Card>
                    </Col>
                )
            )
        }

        if(userIngredients.length) {
            userIngredients.sort((a, b) => (a.equipment.name > b.equipment.name) ? 1 : -1)
            userIngredients.forEach(el => 
                ingredientsList.push(
                    <Col key={el.equipment.id} sm={2}>
                        <Card className={style.card}>
                            <Image src={`data:image/png;base64,${el.file}`} fluid />
                            <div className={style.cardContentDiv}>
                                <h5>{el.equipment.name[0].toUpperCase() + el.equipment.name.slice(1)}</h5>
                            </div>
                            <Button variant="dark" onClick={() => this.handleDeleteIngredientShow(el.equipment.id)}>
                                <div className={style.barButtonsDiv}>
                                    <FaTrashAlt/>
                                    <span className={style.buttonText}>Delete</span>
                                </div>
                            </Button>

                            <Modal show={el.showDelete} onHide={() => this.handleDeleteIngredientClose(el.equipment.id)} centered dialogClassName={style.deleteModal}>
                                <Modal.Header className={style.deleteHeader}>
                                    <Modal.Title>Are you sure you want to delete {el.equipment.name}?</Modal.Title>
                                </Modal.Header>

                                <Modal.Body className={style.deleteModalButtons}>
                                    <Button variant="danger" className={style.deleteButton} onClick={() => this.handleDeleteIngredient(el.equipment.id)}>
                                        Delete
                                    </Button>
                                    <Button variant="primary" onClick={() => this.handleDeleteIngredientClose(el.equipment.id)} className={style.returnButton}>
                                        Return
                                    </Button>
                                </Modal.Body>
                            </Modal>
                        </Card>
                    </Col>
                )
            )
        }

        if(userEquipment.length) {
            userEquipment.sort((a, b) => (a.equipment.name > b.equipment.name) ? 1 : -1)
            userEquipment.forEach(el => 
                equipmentList.push(
                    <Col key={el.equipment.id} sm={2}>
                        <Card className={style.card}>
                        <Image src={`data:image/png;base64,${el.file}`} fluid />
                            <div className={style.cardContentDiv}>
                                <h5>{el.equipment.name[0].toUpperCase() + el.equipment.name.slice(1)}</h5>
                            </div>
                            <Button variant="dark" onClick={() => this.handleDeleteEquipmentShow(el.equipment.id)}>
                                <div className={style.barButtonsDiv}>
                                    <FaTrashAlt/>
                                    <span className={style.buttonText}>Delete</span>
                                </div>
                            </Button>

                            <Modal show={el.showDelete} onHide={() => this.handleDeleteEquipmentClose(el.equipment.id)} centered dialogClassName={style.deleteModal}>
                                <Modal.Header className={style.deleteHeader}>
                                    <Modal.Title>Are you sure you want to delete {el.equipment.name}?</Modal.Title>
                                </Modal.Header>

                                <Modal.Body className={style.deleteModalButtons}>
                                    <Button variant="danger" className={style.deleteButton} onClick={() => this.handleDeleteEquipment(el.equipment.id)}>
                                        Delete
                                    </Button>
                                    <Button variant="primary" onClick={() => this.handleDeleteEquipmentClose(el.equipment.id)} className={style.returnButton}>
                                        Return
                                    </Button>
                                </Modal.Body>
                            </Modal>
                        </Card>
                    </Col>
                )
            )
        }

        if(!drinksList.length) {
            empty = (
                <div className={style.emptyDiv}>
                    <Empty/>
                    <h5>No Data</h5>
                </div>
            )
        }

        if(!ingredientsList.length) {
            ingredientsEmpty = (
                <div className={style.emptyDiv}>
                    <Empty/>
                    <h5>No Data</h5>
                </div>
            )
        }

        if(!equipmentList.length) {
            equipmentEmpty = (
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
                                    <h4>Your Drinks</h4>
                                </div>
        
                                <div>
                                    <Button variant="primary" onClick={this.handleShow}>
                                        Add Drinks
                                    </Button>
        
                                    <Modal show={show} onHide={this.handleClose} centered dialogClassName={style.modal}>
                                        <Modal.Header>
                                            <Modal.Title>Add Drink</Modal.Title>
                                        </Modal.Header>
        
                                        <Modal.Body>
                                            <Form onSubmit={this.handleSubmit}>
                                                <Form.Group controlId="name">
                                                    <Form.Label>Name</Form.Label>
        
                                                    <Form.Control 
                                                        required
                                                        type="name" 
                                                        placeholder="Enter name" 
                                                    />
        
                                                </Form.Group>
        
                                                <Form.Group controlId="description">
                                                    <Form.Label>Description</Form.Label>
                                                    <Form.Control 
                                                        required
                                                        as="textarea"
                                                        placeholder="Enter description" 
                                                    />
                                                </Form.Group>
        
                                                <Form.Group controlId="image">
                                                    <Form.Label>Image</Form.Label>
                                                    <Form.Control 
                                                        required
                                                        type="file"
                                                    />
                                                </Form.Group>
    
                                                {this.state.steps}
    
                                                <Button onClick={this.addStep}>
                                                    Add Step
                                                </Button>

                                                <Button onClick={this.deleteStep}>
                                                    Delete Step
                                                </Button>
        
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={this.handleClose}>
                                                        Close
                                                    </Button>
        
                                                    <Button variant="primary" type="submit">
                                                        Add Drink
                                                    </Button>
                                                </Modal.Footer>
                                            </Form>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                                {empty}
                                <div className={style.drinksList}>
                                    {drinksList}
                                </div>
                            </div>
                        </Row>

                        <Row className={style.contentContainer}>
                            <div className={style.contentDiv}>
                                <div>
                                    <h4>Your Ingredients</h4>
                                </div>
        
                                <div>
                                    <Button variant="primary" onClick={this.handleShowIngredient}>
                                        Add Ingredient
                                    </Button>
        
                                    <Modal show={showIngredient} onHide={this.handleCloseIngredient} centered>
                                        <Modal.Header>
                                            <Modal.Title>Add Ingredient</Modal.Title>
                                        </Modal.Header>
        
                                        <Modal.Body>
                                            <Form onSubmit={this.handleSubmitIngredient}>
                                                <Form.Group controlId="name">
                                                    <Form.Label>Name</Form.Label>
        
                                                    <Form.Control 
                                                        required
                                                        type="name" 
                                                        placeholder="Enter name" 
                                                    />
        
                                                </Form.Group>
        
                                                <Form.Group controlId="image">
                                                    <Form.Label>Image</Form.Label>
                                                    <Form.Control 
                                                        required
                                                        type="file"
                                                    />
                                                </Form.Group>

                                                <Form.Group controlId="type">
                                                    <Form.Check id="true" type="radio" onChange={this.handleChange} name="type" label="Public" inline checked/>
                                                    <Form.Check id="false" type="radio" name="type" onChange={this.handleChange} label="Private" inline />
                                                </Form.Group>
        
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={this.handleCloseIngredient}>
                                                        Close
                                                    </Button>
        
                                                    <Button variant="primary" type="submit">
                                                        Add Ingredient
                                                    </Button>
                                                </Modal.Footer>
                                            </Form>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                                {ingredientsEmpty}
                                <Row className={style.ingredientsList}>
                                    {ingredientsList}
                                </Row>
                                
                            </div>
                        </Row>

                        <Row className={style.contentContainer}>
                            <div className={style.contentDiv}>
                                <div>
                                    <h4>Your Equipment</h4>
                                </div>
        
                                <div>
                                    <Button variant="primary" onClick={this.handleShowEquipment}>
                                        Add Equipment
                                    </Button>
        
                                    <Modal show={showEquipment} onHide={this.handleCloseEquipment} centered>
                                        <Modal.Header>
                                            <Modal.Title>Add Equipment</Modal.Title>
                                        </Modal.Header>
        
                                        <Modal.Body>
                                            <Form onSubmit={this.handleSubmitEquipment}>
                                                <Form.Group controlId="name">
                                                    <Form.Label>Name</Form.Label>
        
                                                    <Form.Control 
                                                        required
                                                        type="name" 
                                                        placeholder="Enter name" 
                                                    />
        
                                                </Form.Group>
        
                                                <Form.Group controlId="image">
                                                    <Form.Label>Image</Form.Label>
                                                    <Form.Control 
                                                        required
                                                        type="file"
                                                    />
                                                </Form.Group>

                                                <Form.Group controlId="type">
                                                    <Form.Check id="true" type="radio" onChange={this.handleChange} name="type" label="Public" inline checked/>
                                                    <Form.Check id="false" type="radio" name="type" onChange={this.handleChange} label="Private" inline />
                                                </Form.Group>
        
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={this.handleCloseEquipment}>
                                                        Close
                                                    </Button>
        
                                                    <Button variant="primary" type="submit">
                                                        Add Equipment
                                                    </Button>
                                                </Modal.Footer>
                                            </Form>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                                {equipmentEmpty}
                                <Row className={style.equipmentList}>
                                    {equipmentList}
                                </Row>
                            </div>
                        </Row>
                </Fragment>
            );
        }
    }
}

export default Drinks;
