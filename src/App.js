import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import httpClient from 'axios'
import {
    Button,ButtonGroup,
    Form,FormGroup,ControlLabel,
    FormControl,HelpBlock,
    Checkbox,Radio,Grid,Row,Col,
    Table,Modal
} from 'react-bootstrap';


class App extends Component {

    state = {
        fname: "",
        location: "",
        movies: [],
        gender: "",
        suggestion:"",
        records:[],
        show: false,

        selectedfname: "",
        selectedlocation: "",
        selectedmovies: [],
        selectedgender: "",
        selectedsuggestion: "",
        seledtedId: ""
    };

    componentDidMount(){

        this.refreshData();
    }



     refreshData=()=>{

         httpClient.get('http://localhost:3004/surveys')
             .then((response)=> {
                 var data =response.data;
                 this.setState({
                     records:data.reverse()
                 })

             }).catch((error)=> {

             });

     };

    onChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };


                    modalonChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };









    checkboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state;
            state[fieldName] = targetArray;
            this.setState(state);
        }
    };




 modalcheckboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state.selectedMovies;
            state[fieldName] = targetArray;
            this.setState(state.selectedMovies);
        }
    };







    saveSurvey = ()=> {

        var data = this.state;
         delete data.records;

        httpClient.post('http://localhost:3004/surveys',
         data)
            .then((response)=> {
                this.refreshData();
            }).catch((error)=> {

            });

    };

    deleteItem = (id)=>{

        return ()=>{

            httpClient.delete('http://localhost:3004/surveys/'+ id )
                .then((response)=> {

                    this.refreshData();
                }).catch((error)=> {

                });

        };
    };


editItem = (id) =>{
        return ()=> {
            
            httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    console.log('edit');
                    var data = response.data
                    console.log(response.data);
                    this.setState({
                        name: data.fname,
                        location: data.location
                    })
                }).catch((error)=>{
                    
                });
        };
    };



 openModal = (id)=>{

            return ()=>{
                this.setState({
                    show: true
                })

                 httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    var data = response.data
                    this.setState({
                        selectedfname: data.fname,
                        selectedlocation: data.location,
                        selectedmovies: data.movies,
                        selectedgender: data.gender,
                        selectedsuggestion: data.suggestion,
                        selectedId: data.id
                    })
                    console.log(this.state.selectedData.name);
                }).catch((error)=>{
                    
                });

            };
        };




saveEdit = (id) =>{


        return () => {
            console.log(data);
            var data = {
                
        fname: this.state.selectedfname,
        location: this.state.selectedlocation,
        movies: this.state.selectedmovies,
        gender: this.state.selectedgender,
        suggestion: this.state.selectedsuggestion};
            delete data.records;

            httpClient.patch('http://localhost:3004/surveys/'+id,
            data)
                .then((response)=> {
                    this.refreshData();
                }).catch((error)=> {

                });

            this.setState({
                show: false,

        selectedfname: "",
        selectedlocation: "",
        selectedmovies: [],
        selectedgender: "",
        selectedsuggestion: ""
            });
        }
    };








    render() {

        var rows  = this.state.records.map((item,i)=>{

            return (
                <tr key={i}>
                     <td>
                     
                     <Button bsSize="medium" bsStyle="danger" onClick={this.deleteItem(item.id)}>remove</Button>
                     &nbsp;&nbsp;
                     <Button bsSize="medium" bsStyle="primary" onClick={this.openModal(item.id)}>Edit</Button>
                     </td>
                     <td>{item.id}</td>
                     <td className="textfieldarea">{item.fname}</td>
                     <td>{item.gender}</td>
                     <td>{item.location}</td>
                     <td>{item.movies.map((movie, mi)=> {
                             return <div key={mi}>
                                   <span className="label label-info">{movie}</span>
                                 </div>
                         })

                      }
                     </td>
                     
                     <td className="textfieldarea">{item.suggestion}</td>
                </tr>
            );
        });


let close = () => this.setState({ show: false })

        return (
            <div className="wrap">
                <div className="newer"> 
                <ControlLabel><center>Merry Christmas</center></ControlLabel>          
                </div>
                <div className="wraps">
                <div className="wraps2">
                    <Grid>
                        <Row>
                            <Col md={6}>
                                <Form>
                                    <FormGroup>
                                        <ControlLabel>What is your name?</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Your name here."
                                            value={this.state.fname}
                                            onChange={this.onChange('fname')}
                                            />
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Gender </ControlLabel>
                                        <Radio name="gender" value="M"
                                               onChange={this.onChange('gender')}>Male</Radio>
                                        <Radio name="gender" value="F"
                                               onChange={this.onChange('gender')}>Female</Radio>
                                    </FormGroup>
                                   
                                    <FormGroup>
                                        <ControlLabel>How old are you?</ControlLabel>
                                        <FormControl componentClass="select"
                                                     placeholder="Age"
                                                     value={this.state.location}
                                                     onChange={this.onChange('location')}
                                            >
                                            <option value="18 Below">18 Below</option>
                                            <option value="18 - 25">18 - 25</option>
                                            <option value="26 - 35">26 - 35</option>
                                            <option value="36 - 45">36 - 45</option>
                                            <option value="46 Above">46 Above</option>
                                            
                                        </FormControl>
                                    </FormGroup>

                                    <FormGroup>
                                     
									  <ControlLabel>Select your wish:</ControlLabel>
					
                            
									  <Table>
									  <tbody>
									    <tr>
										<td>
                                        <Checkbox value="Toys"
                                                  checked={this.state.movies.indexOf('Toys')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Toys
                                        </Checkbox>
										</td>
									    
										<td>
										<Checkbox value="Money"
                                                  checked={this.state.movies.indexOf('Money')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Money
                                        </Checkbox>
										</td>
										</tr>
										<tr>
										<td>
										<Checkbox value="House and Lot"
                                                  checked={this.state.movies.indexOf('House and Lot')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            House and Lot
                                        </Checkbox>
										</td>
										<td>	
										
										<Checkbox value="Boyfriend/Girlfriend"
                                                  checked={this.state.movies.indexOf('Boyfriend/Girlfriend')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Boyfriend/Girlfriend
                                        </Checkbox>
										</td>
										</tr>	
										<tr>
										<td>
										<Checkbox value="Car"
                                                  checked={this.state.movies.indexOf('Car')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Car
                                        </Checkbox>
										</td>
										<td>
										<Checkbox value="Love"
                                                  checked={this.state.movies.indexOf('Love')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Love
                                        </Checkbox>
										</td>
										</tr>
										</tbody>	
										
                                    
                                    </Table>
                                    
                                    </FormGroup>
                                    
                                    


                                    <FormGroup>
                                        <ControlLabel>Message for Santa Claus...</ControlLabel>
                                        <textarea
                                            type="textarea"
                                            placeholder="Dear Santa,"
                                            value={this.state.suggestion}
                                            onChange={this.onChange('suggestion')}
                                            cols="59"
                                            rows="6"
                                            />
                                    </FormGroup>
                                    <ButtonGroup>

                                        <Button  bsStyle="success" onClick={this.saveSurvey}>Send</Button>

                                    </ButtonGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>


 <div className="tabs1">
                                <Table condensed striped>
                                    <thead>
                                    <tr>
                                        <th><center>Action</center></th>
                                        <th><center>Kid No.</center></th>
                                        <th><center>Name</center></th>
                                        <th><center>Gender</center></th>
                                        <th><center>Age</center></th>
                                        <th><center>Wish</center></th>
                                        <th><center>Message to Santa</center></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rows}
                                    </tbody>
                                </Table>
                           
                           
                     
                           
                           </div>
                 <div className="modal-container" style={{height: 200}}>
                    <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">External Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                                    <FormGroup>
                                        <ControlLabel>What is your name?</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Your name here."
                                            value={this.state.selectedfname}
                                            onChange={this.modalonChange('selectedfname')}
                                            />
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Gender </ControlLabel>
                                        <Radio name="selectedgender" value="M" 
                                               onChange={this.modalonChange('selectedgender')}>Male</Radio>
                                        <Radio name="selectedgender" value="F"
                                               onChange={this.modalonChange('selectedgender')}>Female</Radio>
                                    </FormGroup>

                                   
                                    <FormGroup>
                                        <ControlLabel>How old are you?</ControlLabel>
                                        <FormControl componentClass="select"
                                                     placeholder="Age"
                                                     value={this.state.selectedlocation}
                                                     onChange={this.modalonChange('selectedlocation')}
                                            >
                                            <option value="18 Below">18 Below</option>
                                            <option value="18 - 25">18 - 25</option>
                                            <option value="26 - 35">26 - 35</option>
                                            <option value="36 - 45">36 - 45</option>
                                            <option value="46 Above">46 Above</option>
                                            
                                        </FormControl>
                                
                                    </FormGroup>
                                    
                                    <FormGroup>
									<HelpBlock>The type's of houses the user has selected</HelpBlock>
                                        <ControlLabel>Types selected</ControlLabel>
                                        <Table>
									  <tbody>
									    <tr>
										<td>
                                        <Checkbox value="Toys"
                                                  checked={this.state.selectedmovies.indexOf('Toys')>=0 ? true:false}
                                                  onChange={this.checkboxChange('selectedmovies')}>
                                            Toys
                                        </Checkbox>
										</td>
									    
										<td>
										<Checkbox value="Money"
                                                  checked={this.state.selectedmovies.indexOf('Money')>=0 ? true:false}
                                                  onChange={this.checkboxChange('selectedmovies')}>
                                            Money
                                        </Checkbox>
										</td>
										</tr>
										<tr>
										<td>
										<Checkbox value="House and Lot"
                                                  checked={this.state.selectedmovies.indexOf('House and Lot')>=0 ? true:false}
                                                  onChange={this.checkboxChange('selectedmovies')}>
                                            House and Lot
                                        </Checkbox>
										</td>
										<td>	
										
										<Checkbox value="Boyfriend/Girlfriend"
                                                  checked={this.state.selectedmovies.indexOf('Boyfriend/Girlfriend')>=0 ? true:false}
                                                  onChange={this.checkboxChange('selectedmovies')}>
                                            Boyfriend/Girlfriend
                                        </Checkbox>
										</td>
										</tr>	
										<tr>
										<td>
										<Checkbox value="Car"
                                                  checked={this.state.selectedmovies.indexOf('Car')>=0 ? true:false}
                                                  onChange={this.checkboxChange('selectedmovies')}>
                                            Car
                                        </Checkbox>
										</td>
										<td>
										<Checkbox value="Love"
                                                  checked={this.state.selectedmovies.indexOf('Love')>=0 ? true:false}
                                                  onChange={this.checkboxChange('selectedmovies')}>
                                            Love
                                        </Checkbox>
										</td>
										</tr>
										</tbody>	
										
                                    
                                    </Table>
                                
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <ControlLabel>Message for Santa</ControlLabel>
                                        <textarea
                                            type="textarea"
                                            placeholder="Dear Santa,"
                                            value={this.state.selectedsuggestion}
                                            onChange={this.onChange('selectedsuggestion')}
                                            cols="78"
                                            rows="6"
                                            />
                                    </FormGroup>
                                    <ButtonGroup>

                                        <Button bsStyle="primary" onClick={this.saveEdit(this.state.selectedId)}>Save Edited Data</Button>

                                    </ButtonGroup>



                                </Form>
                            </Modal.Body>
                        </Modal>

                            </div>
                     </div>
      );

    }
}
    


export default App;