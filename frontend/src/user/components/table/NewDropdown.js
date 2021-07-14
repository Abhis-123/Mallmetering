import React from 'react'
import {
  InputGroup,
  FormInput,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "shards-react";

class NewDropdown extends React.Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
            key: false,
            value: "Daily"
    };
  }

  toggle(which) {
    const newState = { ...this.state };
    newState[which] = !this.state[which];
    this.setState(newState);
  }
  select(value){
    this.setState({ value: value });
  }
  render() {
  return (
    <div className="">

  <InputGroup style={{height:"35px"}}>
            <Dropdown style={{ 
              backgroundColor:"white"
            }}
              open={this.state.key}
              toggle={() => this.toggle("key")}
              addonType="prepend"
            >
              <DropdownToggle caret style={{height:"100%"}}></DropdownToggle>
              <DropdownMenu small>
                <DropdownItem >Daily</DropdownItem>
                <DropdownItem  >Weekly</DropdownItem>
                <DropdownItem  >Monthly</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {/* <input className="input"   value={this.state.value}/> */}
            <FormInput style={{maxWidth:"120px"}} value={this.state.value} onChange={()=> this.toggle("key")} onFocus={()=>this.toggle("key")}/>
        </InputGroup>
    </div>
  )
  }
}

export default NewDropdown
